declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let scriptLoader: Promise<void> | null = null;

function loadRecaptchaScript(siteKey: string) {
  if (!scriptLoader) {
    scriptLoader = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="https://www.google.com/recaptcha/api.js?render=${siteKey}"]`,
      );

      if (existing && window.grecaptcha) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load reCAPTCHA script"));
      document.head.appendChild(script);
    });
  }

  return scriptLoader;
}

export async function getRecaptchaToken(action: string) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    // Allow local/dev usage without captcha keys.
    return "";
  }

  await loadRecaptchaScript(siteKey);

  return new Promise<string>((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error("reCAPTCHA is unavailable."));
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        ?.execute(siteKey, { action })
        .then((token) => {
          if (!token) {
            reject(new Error("Could not generate reCAPTCHA token."));
            return;
          }
          resolve(token);
        })
        .catch(() => reject(new Error("Could not generate reCAPTCHA token.")));
    });
  });
}
