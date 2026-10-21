// תפריט בנייד
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

// סינון בגלריה
const filters = document.querySelectorAll(".filter");
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.filter;
    document.querySelectorAll(".gallery figure").forEach((fig) => {
      fig.classList.toggle("hidden", cat !== "all" && fig.dataset.cat !== cat);
    });
  });
});

// טופס צור קשר: שולח את הפנייה בוואטסאפ
const form = document.querySelector("#contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const what = d.getAll("what").join(", ");
    const text =
      `שלום אנג'ל, אשמח לקבל הצעת מחיר.\n` +
      `שם: ${d.get("name")}\n` +
      `תפקיד: ${d.get("role")}\n` +
      `מוסד: ${d.get("org")}\n` +
      `עיר: ${d.get("city")}\n` +
      `טלפון: ${d.get("phone")}\n` +
      `מייל: ${d.get("email")}\n` +
      `מה לעצב: ${what}\n` +
      `הערות: ${d.get("message")}`;
    window.open(`https://wa.me/972509435123?text=${encodeURIComponent(text)}`, "_blank");
  });
}

// שנה בתחתית
document.querySelectorAll(".year").forEach((el) => (el.textContent = new Date().getFullYear()));

// הגדלת תמונות בלחיצה
const shots = [...document.querySelectorAll(".pic img")].filter((img) => !img.closest("a"));
if (shots.length) {
  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.hidden = true;
  box.innerHTML =
    '<button class="lb-close" aria-label="סגירה">&times;</button>' +
    '<button class="lb-prev" aria-label="התמונה הקודמת">&#8250;</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button class="lb-next" aria-label="התמונה הבאה">&#8249;</button>';
  document.body.appendChild(box);
  const big = box.querySelector("img");
  const cap = box.querySelector("figcaption");
  let list = [], cur = 0;

  const show = (i) => {
    cur = (i + list.length) % list.length;
    big.src = list[cur].src;
    big.alt = list[cur].alt;
    cap.textContent = list[cur].alt;
  };
  const open = (img) => {
    list = shots.filter((s) => !s.closest(".hidden"));
    show(list.indexOf(img));
    box.hidden = false;
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    box.hidden = true;
    document.body.style.overflow = "";
  };

  shots.forEach((img) => {
    img.tabIndex = 0;
    img.addEventListener("click", () => open(img));
    img.addEventListener("keydown", (e) => { if (e.key === "Enter") open(img); });
  });
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", () => show(cur - 1));
  box.querySelector(".lb-next").addEventListener("click", () => show(cur + 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(cur - 1);
    if (e.key === "ArrowLeft") show(cur + 1);
  });
  let x0 = null;
  box.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(dx > 0 ? cur + 1 : cur - 1);
    x0 = null;
  });
}
