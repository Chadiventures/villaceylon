(function () {
  const cfg = window.PAPAYA || {};
  const rooms = window.PAPAYA_ROOMS || {};
  const preview = !!window.PAPAYA_PREVIEW;

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function todayISO() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString().slice(0, 10);
  }

  function parseISO(s) {
    if (!s) return null;
    const d = new Date(s + "T12:00:00");
    return Number.isNaN(d.getTime()) ? null : d;
  }

  function nightsBetween(a, b) {
    const inD = parseISO(a);
    const outD = parseISO(b);
    if (!inD || !outD) return 0;
    const ms = outD - inD;
    return ms > 0 ? Math.round(ms / 86400000) : 0;
  }

  function fmtRange(a, b) {
    if (!a || !b) return "Choose dates";
    const opts = { day: "numeric", month: "short", year: "numeric" };
    const inD = parseISO(a);
    const outD = parseISO(b);
    if (!inD || !outD) return "Choose dates";
    return inD.toLocaleDateString("en-GB", opts) + " – " + outD.toLocaleDateString("en-GB", opts);
  }

  function initHead() {
    const head = qs("[data-head]");
    const burger = qs("[data-burger]");
    const mnav = qs("#mnav");
    if (!head || !burger || !mnav) return;
    burger.addEventListener("click", () => {
      const open = mnav.hasAttribute("hidden");
      if (open) mnav.removeAttribute("hidden");
      else mnav.setAttribute("hidden", "");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    qsa("#mnav a").forEach((a) => {
      a.addEventListener("click", () => {
        mnav.setAttribute("hidden", "");
        burger.setAttribute("aria-expanded", "false");
      });
    });
    window.addEventListener("scroll", () => {
      head.classList.toggle("is-scrolled", window.scrollY > 8);
    }, { passive: true });
  }

  function wireDates(inEl, outEl) {
    if (!inEl || !outEl) return;
    const min = todayISO();
    inEl.min = min;
    outEl.min = min;
    inEl.addEventListener("change", () => {
      if (inEl.value) {
        const next = parseISO(inEl.value);
        next.setDate(next.getDate() + 1);
        outEl.min = next.toISOString().slice(0, 10);
        if (outEl.value && outEl.value <= inEl.value) outEl.value = "";
      }
    });
  }

  function initBookbar() {
    const form = qs("[data-bookbar]");
    if (!form) return;
    wireDates(qs("#bb-in", form), qs("#bb-out", form));
  }

  function initBookingForm() {
    const form = qs("[data-bookform]");
    if (!form) return;
    const params = new URLSearchParams(window.location.search);
    const roomSel = qs("#bf-room", form);
    const guestsSel = qs("#bf-guests", form);
    const inEl = qs("#bf-in", form);
    const outEl = qs("#bf-out", form);
    const err = qs("[data-err]", form);
    const summary = qs("[data-summary]");
    const done = qs("[data-done]");
    const wa = qs("[data-wa]");

    if (params.get("room") && roomSel) roomSel.value = params.get("room");
    if (params.get("in") && inEl) inEl.value = params.get("in");
    if (params.get("out") && outEl) outEl.value = params.get("out");
    if (params.get("guests") && guestsSel) guestsSel.value = params.get("guests");

    wireDates(inEl, outEl);

    function updateSummary() {
      const slug = roomSel && roomSel.value;
      const r = slug && rooms[slug];
      const n = nightsBetween(inEl.value, outEl.value);
      const price = r ? r.price : 215;
      const total = n > 0 ? n * price : 0;
      const sRoom = qs("[data-s-room]");
      const sDates = qs("[data-s-dates]");
      const sNights = qs("[data-s-nights]");
      const sTotal = qs("[data-s-total]");
      if (sRoom) sRoom.textContent = r ? r.name : "Any available room";
      if (sDates) sDates.textContent = fmtRange(inEl.value, outEl.value);
      if (sNights) sNights.textContent = String(n);
      if (sTotal) sTotal.textContent = total > 0 ? cfg.currency + " " + total : "–";
    }

    [roomSel, guestsSel, inEl, outEl].forEach((el) => {
      if (el) el.addEventListener("change", updateSummary);
    });
    updateSummary();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (err) err.hidden = true;
      const name = qs("#bf-name", form).value.trim();
      const email = qs("#bf-email", form).value.trim();
      const msg = qs("#bf-msg", form).value.trim();
      const n = nightsBetween(inEl.value, outEl.value);
      if (!inEl.value || !outEl.value || n < 1) {
        if (err) {
          err.textContent = "Please choose check-in and check-out dates (at least one night).";
          err.hidden = false;
        }
        return;
      }
      if (!name || !email) {
        if (err) {
          err.textContent = "Please enter your name and email.";
          err.hidden = false;
        }
        return;
      }
      const slug = roomSel.value;
      const rName = slug && rooms[slug] ? rooms[slug].name : "Any available room";
      const lines = [
        "Booking request – The Papaya Tree",
        "Room: " + rName,
        "Check-in: " + inEl.value,
        "Check-out: " + outEl.value,
        "Guests: " + guestsSel.value,
        "Name: " + name,
        "Email: " + email,
      ];
      if (msg) lines.push("Notes: " + msg);
      const text = encodeURIComponent(lines.join("\n"));
      const waUrl = "https://wa.me/" + (cfg.whatsapp || "") + "?text=" + text;
      if (cfg.beds24_propid) {
        window.location.href =
          "https://www.beds24.com/booking.php?propid=" +
          encodeURIComponent(cfg.beds24_propid) +
          "&roomid=" +
          encodeURIComponent(slug || "") +
          "&checkin=" +
          encodeURIComponent(inEl.value) +
          "&checkout=" +
          encodeURIComponent(outEl.value);
        return;
      }
      if (summary) summary.hidden = true;
      if (done) done.hidden = false;
      if (wa) wa.href = waUrl;
    });
  }

  function initPreview() {
    if (!preview) return;
    function show(slug) {
      const id = slug || "home";
      qsa(".pv-page").forEach((p) => {
        p.hidden = p.getAttribute("data-pv") !== id;
      });
      window.scrollTo(0, 0);
    }
    function route() {
      const hash = (window.location.hash || "#home").slice(1);
      show(hash.split("?")[0] || "home");
    }
    window.addEventListener("hashchange", route);
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href^='#']");
      if (!a) return;
      const h = a.getAttribute("href").slice(1);
      if (!h) return;
      e.preventDefault();
      window.location.hash = h;
    });
    route();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHead();
    initBookbar();
    initBookingForm();
    initPreview();
  });
})();
