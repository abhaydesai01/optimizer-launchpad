// The site navigation: dropdown panels on desktop (hover, click or keyboard), a full-screen menu on phones.
export function initNav() {
  const items = [...document.querySelectorAll(".mnav__item")];
  const btns = [...document.querySelectorAll(".mnav__btn")];
  const close = (except) => btns.forEach((b) => { if (b !== except) { b.setAttribute("aria-expanded", "false"); b.parentElement.classList.remove("is-open"); } });
  btns.forEach((b) => {
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = b.getAttribute("aria-expanded") !== "true";
      close(b);
      b.setAttribute("aria-expanded", String(open));
      b.parentElement.classList.toggle("is-open", open);
    });
  });
  // hover opens on devices with a real pointer; a short delay stops panels flickering as the mouse passes
  if (matchMedia("(hover: hover)").matches) {
    items.forEach((it) => {
      const b = it.querySelector(".mnav__btn");
      if (!b) return;
      let t = 0;
      it.addEventListener("pointerenter", () => { clearTimeout(t); t = setTimeout(() => { close(b); b.setAttribute("aria-expanded", "true"); it.classList.add("is-open"); }, 60); });
      it.addEventListener("pointerleave", () => { clearTimeout(t); t = setTimeout(() => { b.setAttribute("aria-expanded", "false"); it.classList.remove("is-open"); }, 160); });
    });
  }
  document.addEventListener("click", (e) => { if (!e.target.closest(".mnav__item")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { close(); setMenu(false); } });

  // phone menu
  const burger = document.querySelector(".nav__burger"), menu = document.getElementById("mmenu");
  const setMenu = (open) => {
    if (!burger || !menu) return;
    menu.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.documentElement.classList.toggle("is-menu", open);
  };
  if (burger && menu) {
    burger.addEventListener("click", () => setMenu(menu.hidden));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  }
  // phones: footer groups fold; long short-answers show their first lines and open on a tap
  if (matchMedia("(max-width: 760px)").matches) {
    document.querySelectorAll(".foot__grid--v11 > nav").forEach((n) => {
      const h = n.querySelector("h3"); if (!h) return;
      h.setAttribute("role", "button"); h.tabIndex = 0; h.setAttribute("aria-expanded", "false");
      const t = () => { const o = n.classList.toggle("is-open"); h.setAttribute("aria-expanded", String(o)); };
      h.addEventListener("click", t); h.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); t(); } });
    });
    document.querySelectorAll(".pg-answer").forEach((a) => {
      const p = a.querySelector("p"); if (!p) return;
      a.classList.add("is-clamp");
      if (p.scrollHeight <= p.clientHeight + 4) { a.classList.remove("is-clamp"); return; }
      const b = document.createElement("button"); b.type = "button"; b.className = "pg-answer__more"; b.textContent = "Read the full answer"; b.setAttribute("aria-expanded", "false");
      b.addEventListener("click", () => { const o = a.classList.toggle("is-clamp"); b.textContent = o ? "Read the full answer" : "Show less"; b.setAttribute("aria-expanded", String(!o)); });
      a.appendChild(b);
    });
  }
  // the phone dock: menu + the one action, shown once the reader is past the first screen
  const dock = document.getElementById("dock");
  if (dock && menu) {
    const dm = dock.querySelector(".dock__menu");
    dm.addEventListener("click", () => { setMenu(menu.hidden); dm.setAttribute("aria-expanded", String(!menu.hidden)); });
    const show = () => dock.classList.toggle("on", scrollY > innerHeight * 0.6 && !document.documentElement.classList.contains("is-intro"));
    addEventListener("scroll", show, { passive: true }); show();
  }
}
