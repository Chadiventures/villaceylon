window.PAPAYA={"whatsapp": "94771234567", "email": "hello@thepapayatree.lk", "beds24_propid": "", "currency": "USD"};
window.PAPAYA_ROOMS={"lotus": {"name": "The Lotus Room", "price": 185}, "jade": {"name": "The Jade Suite", "price": 245}, "mist": {"name": "The Mist Loft", "price": 215}, "villa": {"name": "The Ahangama Villa", "price": 385}, "palm": {"name": "The Palm Room", "price": 195}, "reef": {"name": "The Reef Suite", "price": 225}, "pavilion": {"name": "The Coastal Pavilion", "price": 265}};
(function () {
  var P = window.PAPAYA || {}, ROOMS = window.PAPAYA_ROOMS || {}, PREVIEW = !!window.PAPAYA_PREVIEW;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var pendingRoom = null;

  function iso(d) { return d.toISOString().slice(0, 10); }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function nights(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }

  // mobile menus (one per page in preview, so bind all)
  $$("[data-burger]").forEach(function (b) {
    b.addEventListener("click", function () {
      var nav = b.closest("[data-head]").querySelector(".mnav");
      var open = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", String(!open));
      nav.hidden = open;
    });
  });

  // date defaults
  function initDates(inEl, outEl) {
    if (!inEl || !outEl) return;
    var t = new Date();
    inEl.min = iso(t);
    if (!inEl.value) inEl.value = iso(addDays(t, 30));
    if (!outEl.value) outEl.value = iso(addDays(new Date(inEl.value), 5));
    outEl.min = iso(addDays(new Date(inEl.value), 1));
    inEl.addEventListener("change", function () {
      outEl.min = iso(addDays(new Date(inEl.value), 1));
      if (outEl.value <= inEl.value) outEl.value = iso(addDays(new Date(inEl.value), 5));
      outEl.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  // hero booking bar
  $$("[data-bookbar]").forEach(function (f) {
    initDates($("input[name=in]", f), $("input[name=out]", f));
    f.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var q = { in: f.in.value, out: f.out.value, guests: f.guests.value };
      if (PREVIEW) { fillBooking(q); go("booking"); return; }
      location.href = "booking.html?" + new URLSearchParams(q).toString();
    });
  });

  // booking form
  var form = $("[data-bookform]");
  function fillBooking(q) {
    if (!form) return;
    if (q.room) form.room.value = q.room;
    if (q.in) form.in.value = q.in;
    if (q.out) form.out.value = q.out;
    if (q.guests) form.guests.value = q.guests;
    update();
  }
  function update() {
    if (!form) return;
    var r = ROOMS[form.room.value];
    var n = form.in.value && form.out.value ? nights(form.in.value, form.out.value) : 0;
    $("[data-s-room]").textContent = r ? r.name : "Any available room";
    $("[data-s-dates]").textContent = n > 0 ? form.in.value + " to " + form.out.value : "Choose dates";
    $("[data-s-nights]").textContent = n > 0 ? n : 0;
    $("[data-s-total]").textContent = r && n > 0 ? "$" + (r.price * n).toLocaleString("en-US") : "–";
  }
  if (form) {
    initDates(form.in, form.out);
    var qs = new URLSearchParams(location.search);
    fillBooking({ room: qs.get("room"), in: qs.get("in"), out: qs.get("out"), guests: qs.get("guests") });
    form.addEventListener("change", update);
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var err = $("[data-err]", form);
      var bad = !form.in.value || !form.out.value ? "Choose your check-in and check-out dates." :
        nights(form.in.value, form.out.value) < 1 ? "Check-out must be after check-in." :
        !form.name.value.trim() ? "Add your name so we know who's coming." :
        !/^\S+@\S+\.\S+$/.test(form.email.value) ? "Add a valid email address for your confirmation." : "";
      err.hidden = !bad; err.textContent = bad;
      if (bad) return;
      if (P.beds24_propid) {
        var u = "https://beds24.com/booking2.php?" + new URLSearchParams({
          propid: P.beds24_propid, checkin: form.in.value, numnight: nights(form.in.value, form.out.value), numadult: form.guests.value
        }).toString();
        location.href = u; return;
      }
      var r = ROOMS[form.room.value];
      var msg = "Hi! Booking request for The Papaya Tree\n" +
        "Room: " + (r ? r.name : "Any available room") + "\nDates: " + form.in.value + " to " + form.out.value +
        " (" + nights(form.in.value, form.out.value) + " nights)\nGuests: " + form.guests.value +
        "\nName: " + form.name.value + "\nEmail: " + form.email.value + (form.msg.value ? "\nNote: " + form.msg.value : "");
      var wa = $("[data-wa]");
      wa.href = "https://wa.me/" + P.whatsapp + "?text=" + encodeURIComponent(msg);
      $("[data-done]").hidden = false;
      $("[data-done]").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // remember room clicked (used by preview routing)
  $$("[data-room]").forEach(function (a) {
    a.addEventListener("click", function () { pendingRoom = a.getAttribute("data-room"); if (PREVIEW) fillBooking({ room: pendingRoom }); });
  });

  // preview: hash router over page sections
  function go(slug) {
    if (!PREVIEW) return;
    var pages = $$("[data-pv]"), found = false;
    pages.forEach(function (p) { var on = p.getAttribute("data-pv") === slug; p.hidden = !on; if (on) found = true; });
    if (!found) { pages.forEach(function (p) { p.hidden = p.getAttribute("data-pv") !== "home"; }); }
    $$("[data-burger]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); b.closest("[data-head]").querySelector(".mnav").hidden = true; });
    if (location.hash !== "#" + slug) history.replaceState(null, "", "#" + slug);
    window.scrollTo(0, 0);
  }
  if (PREVIEW) {
    window.addEventListener("hashchange", function () { go(location.hash.slice(1) || "home"); });
    if (location.hash) go(location.hash.slice(1));
  }
})();
