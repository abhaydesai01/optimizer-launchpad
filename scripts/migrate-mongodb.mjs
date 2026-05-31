import { MongoClient } from "mongodb";

function parseDbName(uri) {
  try {
    const url = new URL(uri);
    const name = url.pathname.replace(/^\//, "").trim();
    return name || null;
  } catch {
    return null;
  }
}

function withDbName(uri, dbName) {
  const url = new URL(uri);
  const current = url.pathname.replace(/^\//, "").trim();
  if (!current) {
    url.pathname = `/${dbName}`;
  }
  return url.toString();
}

async function migrate() {
  const oldUri = process.env.OLD_MONGODB_URI;
  const newUriBase = process.env.NEW_MONGODB_URI;
  const explicitDbName = process.env.MONGO_DB_NAME;
  const overwrite = (process.env.OVERWRITE_TARGET || "true").toLowerCase() !== "false";

  if (!oldUri || !newUriBase) {
    throw new Error("OLD_MONGODB_URI and NEW_MONGODB_URI are required");
  }

  const sourceDbName = explicitDbName || parseDbName(oldUri);
  if (!sourceDbName) {
    throw new Error("Could not determine source DB name. Provide MONGO_DB_NAME.");
  }

  const newUri = withDbName(newUriBase, sourceDbName);

  const oldClient = new MongoClient(oldUri);
  const newClient = new MongoClient(newUri);

  await oldClient.connect();
  await newClient.connect();

  const sourceDb = oldClient.db(sourceDbName);
  const targetDb = newClient.db(sourceDbName);

  const collections = await sourceDb.listCollections({}, { nameOnly: true }).toArray();

  const summary = [];
  for (const { name } of collections) {
    const source = sourceDb.collection(name);
    const target = targetDb.collection(name);

    const targetExists = Boolean(await targetDb.listCollections({ name }).next());
    if (targetExists && overwrite) {
      await target.drop();
    }

    const docs = await source.find({}).toArray();
    if (docs.length > 0) {
      await target.insertMany(docs, { ordered: false });
    }

    const indexes = await source.indexes();
    for (const index of indexes) {
      if (index.name === "_id_") continue;
      const { key, name: indexName, v, ns, ...options } = index;
      await target.createIndex(key, {
        name: indexName,
        ...options,
      });
    }

    summary.push({ collection: name, count: docs.length, indexes: indexes.length });
  }

  console.log(
    JSON.stringify(
      {
        sourceDb: sourceDbName,
        targetDb: sourceDbName,
        migratedCollections: summary.length,
        details: summary,
      },
      null,
      2,
    ),
  );

  await oldClient.close();
  await newClient.close();
}

migrate().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
