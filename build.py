"""Build script for The Papaya Tree website.

Outputs:
  dist/            multi-page static site (deploy as-is on Coolify / any static host)
  preview.html     single-file preview (all pages as hash-routed sections)

All client-specific facts live in SITE below, so they are easy to swap.
"""
import html, json, os, re, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(ROOT, "dist")

SITE = {
    "name": "The Papaya Tree",
    "tagline": "Boutique stay · Ahangama, Sri Lanka",
    "email": "hello@thepapayatree.lk",          # TODO confirm with Christian
    "phone": "+94 77 123 4567",                  # TODO real number
    "whatsapp": "94771234567",                   # TODO digits only, no +
    "instagram": "https://www.instagram.com/",   # TODO real handle
    "address": "Ahangama, Southern Province, Sri Lanka",
    "maps": "https://www.google.com/maps/search/?api=1&query=Ahangama+Sri+Lanka",  # TODO exact pin
    "checkin": "2 pm",                           # TODO confirm
    "checkout": "11 am",                         # TODO confirm
    "free_cancel_days": 14,                      # TODO confirm
    "beds24_propid": "",                         # set to Beds24 property id to go live
    "currency": "USD",
}

# ---------------------------------------------------------------- rooms
ROOMS = [
    dict(slug="lotus", name="The Lotus Room", tag="Garden view", price=185, bed="King bed", guests=2,
         feats=["Garden terrace", "Open-air stone bathroom", "Air conditioning", "Wifi"],
         text="Warm sand-toned walls and hand-carved lotus details. The bathroom is open to the sky and built in raw stone, so mornings start with birdsong and a cool shower under the palms.",
         tone="a"),
    dict(slug="jade", name="The Jade Suite", tag="Courtyard bath", price=245, bed="King bed", guests=2,
         feats=["Freestanding stone tub", "Private courtyard", "Air conditioning", "Wifi"],
         text="A freestanding bathtub set in its own courtyard of fern and jasmine. Made for long afternoons after the beach, with shade all day.",
         tone="b"),
    dict(slug="mist", name="The Mist Loft", tag="Most requested", price=215, bed="Queen bed", guests=2,
         feats=["Rooftop terrace", "Herb garden", "Air conditioning", "Wifi"],
         text="Upstairs, above the garden, with a private terrace that looks across the palm line toward the ocean haze. The best seat in the house at sunset.",
         tone="c"),
    dict(slug="villa", name="The Ahangama Villa", tag="Signature villa", price=385, bed="King bed", guests=3,
         feats=["Separate living lounge", "Private terrace", "Air conditioning", "Wifi"],
         text="Our largest space: a bedroom, a separate lounge and a private terrace. Room to spread out for a longer stay, a few minutes from the surf at Kabalana.",
         tone="d"),
    dict(slug="palm", name="The Palm Room", tag="Ground floor", price=195, bed="King bed", guests=2,
         feats=["Garden view", "Rattan details", "Air conditioning", "Wifi"],
         text="Ground floor, under the coconut palms. Soft light, rattan and linen, and the scent of frangipani drifting in from the courtyard.",
         tone="a"),
    dict(slug="reef", name="The Reef Suite", tag="Surfers' pick", price=225, bed="Queen bed", guests=2,
         feats=["Board storage by the gate", "Outdoor rinse shower", "Terrace", "Air conditioning"],
         text="Set up for dawn sessions. Leave your board by the gate, rinse off in the outdoor shower and be back on your terrace with a coffee before the town wakes up.",
         tone="b"),
    dict(slug="pavilion", name="The Coastal Pavilion", tag="Long-stay favourite", price=265, bed="King bed", guests=2,
         feats=["Open-plan pavilion", "Wide lounging deck", "Work corner", "Air conditioning"],
         text="An open-plan pavilion with a wide deck and a proper work corner. Built for slow weeks on the south coast, whether you surf, write or do nothing at all.",
         tone="c"),
]

# ---------------------------------------------------------------- guide data
DISTANCES = [
    ("Kabalana Beach & The Rock", "5 min", "tuk-tuk"),
    ("Midigama surf breaks", "10 min", "tuk-tuk"),
    ("Koggala stilt fishermen", "10 min", "tuk-tuk"),
    ("Weligama Bay", "15 min", "tuk-tuk"),
    ("Handunugoda tea estate", "15 min", "tuk-tuk"),
    ("Dalawella (turtles)", "15 min", "tuk-tuk"),
    ("Unawatuna", "20 min", "car"),
    ("Galle Fort", "30 min", "car"),
    ("Mirissa harbour", "30 min", "car"),
    ("Hiriketiya", "1 h 15", "car"),
    ("Mattala airport (HRI)", "1 h 30", "car"),
    ("Udawalawe National Park", "2 h 30", "car"),
    ("Colombo airport (CMB)", "2 h 30 to 3 h", "car"),
    ("Yala National Park", "3 h", "car"),
]

MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
# 3 = best, 2 = good, 1 = quiet/rainy
SEASON = {
    "Surf on the south coast": [3,3,3,2,1,1,1,1,1,2,3,3],
    "Beach & sunshine":        [3,3,3,2,1,1,1,1,1,1,2,3],
    "Whales off Mirissa":      [3,3,3,3,1,1,1,1,1,1,2,3],
}

BREAKS = [
    ("Weligama Bay", "Beach break", "Beginner", "Soft, sandy-bottom waves and dozens of surf schools. The classic place to stand up for the first time. 15 min away."),
    ("Kabalana beach break", "Beach break", "Beginner to intermediate", "The sand-bottom inside at Kabalana suits early lessons on small days and gets punchy when the swell picks up. 5 min away."),
    ("The Rock, Kabalana", "Reef A-frame", "Intermediate to advanced", "Ahangama's signature wave: a peaky A-frame with a long left wall. Crowded at its best, worth watching first."),
    ("Marshmallows", "Reef", "Intermediate", "Mellow and forgiving, a longboarder's favourite on small to mid days."),
    ("Sticks", "Reef", "Intermediate", "A fun right-hander named after the stilt-fishing poles nearby. Best on mid tide."),
    ("Animals", "Reef", "Intermediate to advanced", "Steeper and faster with more push. Needs a good swell and respect for the reef."),
    ("Sion", "Reef", "Intermediate", "Quieter break at the Midigama end of town, with Devil's Rock as the backdrop."),
    ("Midigama: Lazy Left & Lazy Right", "Reef", "Intermediate", "Two easy-going reef peaks a few minutes east. A good step up once you've left the beach breaks."),
]

EAT = [
    ("Brunch & coffee", [
        ("Nuga House", "Israeli-style brunch plates and some of the best toast in town."),
        ("Wild", "Garden café with good coffee, plus the Ember & Ice sauna and ice baths next door."),
        ("Café Ceylon", "Relaxed café and garden. Twice a month on Saturdays it turns into a pop-up market."),
    ]),
    ("Lunch & dinner", [
        ("Trax", "Asian fusion set in old jungle ruins. Book ahead in high season."),
        ("Carries", "Beachfront Moroccan and Sri Lankan fusion with a cushioned lounge."),
        ("East Falafel", "Falafel, shakshuka and shawarma. Ask for the spicy sauce."),
        ("Hakuna Matata", "Beach shack classics: jackfruit burgers, wraps and fresh juices."),
    ]),
    ("Local rice & curry", [
        ("Baboo Café", "All-you-can-eat rice and curry with seven or more dishes, for a few hundred rupees."),
        ("Roadside hopper stalls", "Egg hoppers and kottu in the evening along the main road. Follow the queues."),
    ]),
    ("Sunset & nights out", [
        ("The Lighthouse", "Rooftop bar over Sion break and Devil's Rock. Sunset DJ sessions on Saturdays."),
        ("Lamana skatepark", "Thursday nights: DJs and live music around a skate bowl."),
        ("Ahangama Beach strip", "A short walk of small bars along the sand. Easy to hop between a few."),
        ("Paradise Cove, Midigama", "Beach club with daybeds and calm water for swimming. Book a bed by WhatsApp."),
    ]),
]

DO = [
    ("Watch sunset at Kabalana", "Beach", "Golden sand, wooden sunbeds, a king coconut and surfers in silhouette. The best sunset spot in town, and free."),
    ("Swim with green turtles", "Wildlife", "At Dalawella, large green turtles feed on seagrass in a natural rock pool. Go early, rent a mask on the beach, and watch without feeding or touching."),
    ("See the stilt fishermen", "Culture", "Between Koggala and Ahangama, fishermen still perch on poles in the surf. Early morning light is best. Expect to tip if you photograph them."),
    ("Climb Devil's Rock", "Adventure", "An overgrown rock island off Sion with views up and down the coast. Only at low tide and only for confident swimmers."),
    ("Sauna and ice bath", "Wellness", "Ember & Ice at Wild: a pine sauna with jungle views and ice pools in the rice paddies. Perfect after a morning surf."),
    ("Yoga by the paddies", "Wellness", "Morning and sunset classes run all over town, many in open-air shalas. Ask us for this week's schedule."),
    ("River cruise at dusk", "Nature", "Small wooden boats drift up the jungle river at sunset while the sky fills with fruit bats. Monitor lizards, kingfishers and eagles on the way."),
    ("Koggala Lake by boat", "Nature", "Mangroves, a cinnamon island and a Buddhist temple on the water. Around two hours, easiest in the morning."),
    ("Browse the boutiques", "Shopping", "Handloom sarongs, local ceramics, jewellery and island-made skincare. Ahangama is full of small concept stores."),
    ("Learn to cook Sri Lankan", "Food", "Half-day classes with local families: market run, coconut scraping and a spread of curries you eat together."),
    ("Walk the rice paddies", "Nature", "Two kilometres inland the coast road disappears. Early morning walks with peacocks, egrets and water buffalo."),
    ("Ayurvedic massage", "Wellness", "Traditional oil treatments in town or at the house. We know the good therapists."),
]

TRIPS = [
    ("Galle Fort", "30 min", "Half day", "A 17th-century fort town with ramparts, a lighthouse, galleries and cafés inside UNESCO-listed walls. Walk the walls at sunset.", "Combine with Dalawella turtles on the way back."),
    ("Unawatuna & Jungle Beach", "20 min", "Half day", "A sheltered bay for swimming and snorkelling, the white Japanese Peace Pagoda on Rumassala hill and a short walk down to Jungle Beach.", "Dive shops here run reef and wreck dives for all levels."),
    ("Handunugoda Tea Estate", "15 min", "2 hours", "A working estate close to the coast, known for its hand-rolled white tea. Free tours and tastings.", "Morning visits are cooler and quieter."),
    ("Whale watching, Mirissa", "30 min", "Morning", "Blue whales, sperm whales and spinner dolphins off the south coast. Boats leave around dawn.", "Season is roughly November to April. Pick an operator that keeps its distance."),
    ("Udawalawe safari", "2 h 30", "Full day", "Sri Lanka's elephant park: herds with calves nearly guaranteed, plus crocodiles, buffalo and birdlife.", "Leave at 4 am for the morning drive. We book the jeep and driver."),
    ("Yala safari", "3 h", "Full day or overnight", "The country's most famous park and your best chance of seeing a leopard. Busier than Udawalawe.", "Stay one night nearby to do sunrise and sunset drives."),
    ("Hiriketiya", "1 h 15", "Day", "A horseshoe bay with a surf break on one side and calm swimming on the other. Great cafés on the hill above.", "Go on a weekday to avoid crowds."),
    ("Coastal train", "From Ahangama station", "Half day", "The coast line runs along the ocean between Matara and Colombo. Ride a few stops for the views with open doors and windows.", "Buy a second-class ticket at the station, no booking needed."),
]

FAQ = [
    ("Booking & payment", [
        ("How do I book?", "Choose your dates on the booking page. You get live availability for all seven rooms and pay securely online by card. Booking direct is always our best rate."),
        ("Which cards do you accept?", "Visa, Mastercard and American Express through PayHere, Sri Lanka's secure payment gateway. You'll see the total in {currency} before you pay."),
        ("Is my room confirmed straight away?", "Yes. Once payment goes through you get a confirmation email with everything you need for arrival."),
        ("Are you also on Airbnb and Booking.com?", "Yes, and our calendar is synced across all of them so a room can never be double booked. Booking here directly is simplest and cheapest."),
    ]),
    ("Cancellation", [
        ("What is your cancellation policy?", "Free cancellation up to {free_cancel_days} days before arrival. After that the first night is charged. Ask us if plans change, we'll always try to help with new dates."),
        ("What if my flight is cancelled?", "Send us a message as soon as you know. We move your dates free of charge whenever the room is available."),
    ]),
    ("Your stay", [
        ("What time is check-in and check-out?", "Check-in from {checkin}, check-out by {checkout}. If your flight lands early or leaves late, tell us and we'll do our best. You can always leave bags with us."),
        ("Do you serve meals?", "No, and that's on purpose. Ahangama has one of the best café scenes in Sri Lanka within a short walk or tuk-tuk ride. We'll give you our own shortlist."),
        ("Is there wifi and air conditioning?", "Every room has air conditioning and wifi. The Coastal Pavilion has a proper work corner for longer stays."),
        ("Can I bring my surfboard?", "Of course. There's board storage by the gate and outdoor rinse showers. We can arrange board rental and lessons too."),
        ("Is it suitable for children?", "Our rooms suit couples and small families. Most rooms take two guests, the Ahangama Villa takes three. Ask us about a cot."),
    ]),
    ("Getting here", [
        ("Can you arrange an airport transfer?", "Yes. A private air-conditioned car and driver from Colombo (CMB) or Mattala (HRI). Tell us your flight number when you book."),
        ("How do I get around Ahangama?", "Tuk-tuks are everywhere and cheap. Many guests rent a scooter. We can arrange both, plus a driver for day trips."),
    ]),
]

# ---------------------------------------------------------------- helpers
e = html.escape

def fmt(s):
    return s.format(**SITE)

def logo_svg(cls="mark"):
    # Original mark: a halved papaya with seeds, drawn as simple shapes
    return f'''<svg class="{cls}" viewBox="0 0 40 48" aria-hidden="true"><path d="M20 3c9 0 16 10 16 22 0 11-7 20-16 20S4 36 4 25C4 13 11 3 20 3z" fill="var(--papaya)"/><path d="M20 12c5 0 9 6 9 13s-4 12-9 12-9-5-9-12 4-13 9-13z" fill="var(--papaya-flesh)"/><g fill="var(--seed)"><circle cx="17" cy="20" r="1.9"/><circle cx="23" cy="20" r="1.9"/><circle cx="20" cy="24.5" r="1.9"/><circle cx="16.5" cy="28.5" r="1.9"/><circle cx="23.5" cy="28.5" r="1.9"/><circle cx="20" cy="32" r="1.9"/></g><path d="M20 3c1-2 4-3 7-2-1 3-4 4-7 2z" fill="var(--leaf)"/></svg>'''

def photo(label, tone="a", ratio="4/3", img=None, cls=""):
    style = f"aspect-ratio:{ratio};"
    if img:
        style += f"--img:url('{img}');"
    return f'<div class="ph ph-{tone} {cls}" style="{style}" role="img" aria-label="{e(label)}"><span class="ph-tag">Photo · {e(label)}</span></div>'

# ---------------------------------------------------------------- chrome
NAV = [
    ("rooms", "Rooms"),
    ("house", "The House"),
    ("ahangama", "Ahangama", [
        ("ahangama", "Area guide"),
        ("surf", "Surf"),
        ("things-to-do", "Things to do"),
        ("eat-drink", "Eat & drink"),
        ("day-trips", "Day trips"),
    ]),
    ("getting-here", "Getting here"),
    ("faq", "FAQ"),
]

def href(slug, anchor=None):
    base = "index.html" if slug == "home" else f"{slug}.html"
    return base + (f"#{anchor}" if anchor else "")

def header(active):
    items = []
    for item in NAV:
        slug, label = item[0], item[1]
        cur = ' aria-current="page"' if slug == active or (len(item) > 2 and active in [s for s, _ in item[2]]) else ""
        if len(item) > 2:
            sub = "".join(f'<a href="{href(s)}">{e(l)}</a>' for s, l in item[2])
            items.append(f'<div class="nav-drop"><a href="{href(slug)}"{cur}>{e(label)}</a><div class="drop">{sub}</div></div>')
        else:
            items.append(f'<a href="{href(slug)}"{cur}>{e(label)}</a>')
    mob = []
    for item in NAV:
        mob.append(f'<a href="{href(item[0])}">{e(item[1])}</a>')
        if len(item) > 2:
            mob += [f'<a class="sub" href="{href(s)}">{e(l)}</a>' for s, l in item[2][1:]]
    return f'''<header class="site-head" data-head>
  <div class="head-in">
    <a class="logo" href="{href('home')}" aria-label="The Papaya Tree, home">{logo_svg()}<span class="wm"><span class="wm-the">the</span> papaya tree</span></a>
    <nav class="nav" aria-label="Main">{''.join(items)}</nav>
    <a class="btn btn-papaya head-cta" href="{href('booking')}">Book now</a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="mnav" data-burger><span></span><span></span><span class="sr">Menu</span></button>
  </div>
  <nav class="mnav" id="mnav" hidden aria-label="Mobile">{''.join(mob)}<a class="btn btn-papaya" href="{href('booking')}">Book now</a></nav>
</header>'''

def footer():
    return f'''<footer class="site-foot">
  <div class="foot-in">
    <div class="foot-brand">
      <a class="logo logo-lg" href="{href('home')}">{logo_svg()}<span class="wm"><span class="wm-the">the</span> papaya tree</span></a>
      <p>Seven rooms in a garden of papaya and palms.<br>A short walk from the surf in Ahangama, on Sri Lanka's south coast.</p>
    </div>
    <div class="foot-col"><h4>Stay</h4><a href="{href('rooms')}">Rooms & suites</a><a href="{href('house')}">The House</a><a href="{href('booking')}">Book direct</a><a href="{href('faq')}">FAQ & policies</a></div>
    <div class="foot-col"><h4>Ahangama</h4><a href="{href('ahangama')}">Area guide</a><a href="{href('surf')}">Surf guide</a><a href="{href('things-to-do')}">Things to do</a><a href="{href('eat-drink')}">Eat & drink</a><a href="{href('day-trips')}">Day trips</a><a href="{href('getting-here')}">Getting here</a></div>
    <div class="foot-col"><h4>Contact</h4><span class="sel">{e(SITE['email'])}</span><span class="sel">{e(SITE['phone'])}</span><a href="https://wa.me/{SITE['whatsapp']}" target="_blank" rel="noopener">WhatsApp</a><a href="{SITE['instagram']}" target="_blank" rel="noopener">Instagram</a><span>{e(SITE['address'])}</span></div>
  </div>
  <div class="foot-base"><span>© 2026 The Papaya Tree, Ahangama</span><span class="mono">5.97° N · 80.37° E</span></div>
</footer>
<a class="wa-float" href="https://wa.me/{SITE['whatsapp']}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg><span>Ask us anything</span></a>'''

def page_head(title, desc):
    return f'''<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(title)}</title><meta name="description" content="{e(desc)}">
<meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..900,0..100,0..1&family=Instrument+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap">'''

def sec_head(eyebrow, title, lead=None, cls=""):
    l = f'<p class="lead">{lead}</p>' if lead else ""
    return f'<div class="sec-head {cls}"><p class="eyebrow">{e(eyebrow)}</p><h2>{title}</h2>{l}</div>'

def page_hero(eyebrow, title, lead, tone="c", label="Ahangama coast"):
    return f'''<section class="phero">
  <div class="phero-text"><p class="eyebrow">{e(eyebrow)}</p><h1>{title}</h1><p class="lead">{lead}</p></div>
  {photo(label, tone, "5/4", cls="phero-img")}
</section>'''

def cta_band(title="Only seven rooms. Dates go fast in surf season.", sub="November to April fills first. Book direct for the best rate and free cancellation up to {free_cancel_days} days before arrival."):
    return f'''<section class="cta-band"><div class="cta-in"><h2>{title}</h2><p>{fmt(sub)}</p><div class="cta-row"><a class="btn btn-papaya" href="{href('booking')}">Check availability</a><a class="btn btn-ghost-light" href="https://wa.me/{SITE['whatsapp']}" target="_blank" rel="noopener">Message us on WhatsApp</a></div></div></section>'''

def book_bar():
    return f'''<form class="bookbar" data-bookbar action="{href('booking')}" method="get">
  <label><span>Check-in</span><input type="date" name="in" id="bb-in" required></label>
  <label><span>Check-out</span><input type="date" name="out" id="bb-out" required></label>
  <label><span>Guests</span><select name="guests" id="bb-guests"><option>1</option><option selected>2</option><option>3</option></select></label>
  <button class="btn btn-papaya" type="submit">See availability</button>
</form>'''

# ---------------------------------------------------------------- map
MAP_POINTS = [  # x, y, label, kind
    (60, 118, "Galle Fort", "town"),
    (118, 150, "Unawatuna", "town"),
    (160, 164, "Dalawella", "spot"),
    (215, 178, "Koggala", "town"),
    (262, 188, "Kabalana", "spot"),
    (300, 192, "The Papaya Tree", "home"),
    (345, 196, "Sion", "spot"),
    (380, 196, "Midigama", "spot"),
    (430, 188, "Weligama", "town"),
    (492, 196, "Mirissa", "town"),
]

def coast_map():
    pts = []
    for x, y, lab, kind in MAP_POINTS:
        above = kind != "home" and x in (60, 160, 215, 380, 492)
        ty = y - 14 if above or kind == "home" else y + 22
        if kind == "home":
            pts.append(f'<g class="m-home"><circle cx="{x}" cy="{y}" r="9"/><circle cx="{x}" cy="{y}" r="3.5" class="m-home-dot"/><text x="{x}" y="{y-22}" text-anchor="middle">{lab}</text></g>')
        else:
            pts.append(f'<g class="m-pt m-{kind}"><circle cx="{x}" cy="{y}" r="4"/><text x="{x}" y="{ty}" text-anchor="middle">{lab}</text></g>')
    return f'''<figure class="coastmap"><svg viewBox="0 0 560 280" role="img" aria-label="Schematic map of the south coast from Galle to Mirissa, with The Papaya Tree in Ahangama">
  <path class="m-land" d="M0 0H560V206C520 196 500 204 470 196C440 186 410 200 380 200C340 200 320 194 290 196C250 198 230 184 200 180C160 174 140 162 110 152C80 140 60 124 30 112L0 104Z"/>
  <path class="m-coast" d="M0 104L30 112C60 124 80 140 110 152C140 162 160 174 200 180C230 184 250 198 290 196C320 194 340 200 380 200C410 200 440 186 470 196C500 204 520 196 560 206"/>
  <path class="m-road" d="M20 96C60 112 90 132 120 142C150 152 175 164 205 168C240 172 260 182 295 182C335 182 360 186 400 184C430 182 460 176 520 186"/>
  <text x="20" y="40" class="m-lbl">Southern Province</text>
  <text x="280" y="258" class="m-lbl m-sea" text-anchor="middle">Indian Ocean</text>
  {''.join(pts)}
</svg><figcaption>Schematic, not to scale. Galle Fort is about 30 minutes west, Mirissa about 30 minutes east.</figcaption></figure>'''

def season_table():
    head = "".join(f"<th scope='col'>{m}</th>" for m in MONTHS)
    rows = []
    for name, vals in SEASON.items():
        cells = "".join(f'<td><span class="sn sn-{v}" title="{["","Quiet or rainy","Good","Best"][v]}"></span></td>' for v in vals)
        rows.append(f"<tr><th scope='row'>{name}</th>{cells}</tr>")
    return f'''<div class="season-wrap"><table class="season"><thead><tr><th></th>{head}</tr></thead><tbody>{''.join(rows)}</tbody></table>
<div class="season-key"><span><i class="sn sn-3"></i>Best</span><span><i class="sn sn-2"></i>Good</span><span><i class="sn sn-1"></i>Quiet, more rain</span></div></div>'''

def dist_table(limit=None):
    rows = DISTANCES[:limit] if limit else DISTANCES
    r = "".join(f'<tr><th scope="row">{e(n)}</th><td class="mono">{e(t)}</td><td class="muted">{e(m)}</td></tr>' for n, t, m in rows)
    return f'<div class="tbl-wrap"><table class="dist"><thead><tr><th scope="col">From The Papaya Tree to</th><th scope="col">Time</th><th scope="col">By</th></tr></thead><tbody>{r}</tbody></table></div>'

def room_card(r, big=False):
    feats = "".join(f"<li>{e(f)}</li>" for f in r["feats"][:3])
    return f'''<article class="room-card">
  <a href="{href('rooms', r['slug'])}" class="room-img-link">{photo(r['name'], r['tone'], '4/5', img=f"img/rooms/{r['slug']}.jpg")}</a>
  <div class="room-meta"><span class="chip">{e(r['tag'])}</span><span class="mono price">from ${r['price']}<small> / night</small></span></div>
  <h3><a href="{href('rooms', r['slug'])}">{e(r['name'])}</a></h3>
  <ul class="feats">{feats}</ul>
</article>'''

# ---------------------------------------------------------------- pages
def p_home():
    feat = "".join(room_card(r) for r in [ROOMS[2], ROOMS[1], ROOMS[3]])
    guides = [
        ("surf", "Surf", "Eight breaks within fifteen minutes, from first-lesson beach waves to The Rock.", "d"),
        ("things-to-do", "Things to do", "Turtles, stilt fishermen, sauna and ice baths, river cruises at dusk.", "b"),
        ("eat-drink", "Eat & drink", "Our shortlist of brunch spots, rice and curry, and sunset bars.", "a"),
        ("day-trips", "Day trips", "Galle Fort, tea estates, whales off Mirissa and elephant safaris.", "c"),
    ]
    g = "".join(f'<a class="guide-card" href="{href(s)}">{photo(t, tone, "3/2")}<div><h3>{t}</h3><p>{d}</p><span class="arrow">Read the guide</span></div></a>' for s, t, d, tone in guides)
    return f'''
<section class="hero">
  <div class="hero-media ph ph-hero" aria-hidden="true"><video autoplay muted loop playsinline preload="metadata" src="hero.mp4"></video></div>
  <div class="hero-in">
    <p class="eyebrow eyebrow-light">Ahangama · Sri Lanka's south coast</p>
    <h1>Seven rooms under<br>the <em>papaya trees</em>.</h1>
    <p class="hero-lead">A small boutique house in a tropical garden, a few minutes from the surf at Kabalana and the cafés of Ahangama.</p>
    {book_bar()}
  </div>
</section>

<section class="facts">
  <div><span class="big">7</span><span>rooms and suites,<br>each one different</span></div>
  <div><span class="big">5<small>min</small></span><span>by tuk-tuk to the surf<br>at Kabalana Beach</span></div>
  <div><span class="big">30<small>min</small></span><span>to the ramparts<br>of Galle Fort</span></div>
  <div><span class="big">Nov<small>–Apr</small></span><span>surf season on<br>the south coast</span></div>
</section>

<section class="sec">
  {sec_head("Stay", "Rooms with a garden of their own", "Linen, teak and raw stone. Every room has its own terrace, courtyard or deck, air conditioning and fast wifi.")}
  <div class="room-grid">{feat}</div>
  <p class="center"><a class="btn btn-line" href="{href('rooms')}">See all seven rooms</a></p>
</section>

<section class="sec split">
  <div class="split-text">
    <p class="eyebrow">The House</p>
    <h2>No restaurant, no reception desk, no rush.</h2>
    <p>The Papaya Tree is a house, not a resort. We don't cook on site because Ahangama already has some of the best food on the island within a short walk. Instead you get a host who knows the town, a garden to come home to and a shortlist of where to go.</p>
    <ul class="ticks"><li>Board storage and outdoor rinse showers</li><li>Airport transfers and day-trip drivers on request</li><li>Local surf instructors, yoga and massage arranged for you</li><li>Direct booking with secure card payment</li></ul>
    <a class="btn btn-line" href="{href('house')}">About the house</a>
  </div>
  {photo("The garden and papaya trees", "a", "4/5", img="img/garden.jpg")}
</section>

<section class="sec sec-green">
  {sec_head("The Ahangama guide", "Everything we'd tell a friend", "We live here. This is the guide we wish we'd had: where to surf, what to eat, what's worth the drive, and when to come.", cls="light")}
  <div class="guide-grid">{g}</div>
</section>

<section class="sec">
  <div class="split split-map">
    <div class="split-text">
      <p class="eyebrow">Where we are</p>
      <h2>Between Galle and Mirissa, on the quiet stretch of coast.</h2>
      <p>Ahangama is a long, low-key surf village strung along the coast road. Behind the beach are rice paddies, palm gardens and small lanes. That's where you'll find us.</p>
      {dist_table(6)}
      <p><a class="link" href="{href('getting-here')}">Getting here from the airport →</a></p>
    </div>
    {coast_map()}
  </div>
</section>

<section class="sec sec-sand">
  {sec_head("When to come", "The south coast, month by month", "Surf season and dry weather run from November to April. May to October brings the southwest monsoon: greener, quieter and cheaper, with showers most days.")}
  {season_table()}
</section>
{cta_band()}
'''

def p_rooms():
    out = []
    for i, r in enumerate(ROOMS):
        feats = "".join(f"<li>{e(f)}</li>" for f in r["feats"])
        out.append(f'''<article class="room-row" id="{r['slug']}">
  <div class="room-photos">{photo(r['name'], r['tone'], '4/3', img=f"img/rooms/{r['slug']}.jpg")}<div class="room-thumbs">{photo('Bathroom', 'b', '1/1')}{photo('Terrace', 'c', '1/1')}</div></div>
  <div class="room-info">
    <span class="chip">{e(r['tag'])}</span>
    <h2>{e(r['name'])}</h2>
    <p class="specs mono">{e(r['bed'])} · up to {r['guests']} guests</p>
    <p>{e(r['text'])}</p>
    <ul class="ticks">{feats}</ul>
    <div class="room-foot"><span class="mono price-lg">from ${r['price']}<small> / night</small></span><a class="btn btn-papaya" href="{href('booking')}?room={r['slug']}" data-room="{r['slug']}">Book this room</a></div>
  </div>
</article>''')
    return page_hero("Rooms & suites", "Seven rooms, <em>each one different</em>", "All rooms have air conditioning, wifi, fresh linen, rain showers and a private outdoor space. Rates are per room per night, for two guests.", "a", "Room interior") + \
        f'<section class="sec"><div class="room-list">{"".join(out)}</div></section>' + \
        f'''<section class="sec sec-sand"><div class="incl">
  <h2>In every room</h2>
  <ul class="incl-grid"><li><b>Air conditioning</b><span>and ceiling fans</span></li><li><b>Fast wifi</b><span>throughout the house</span></li><li><b>Rain shower</b><span>with local natural toiletries</span></li><li><b>Private outdoor space</b><span>terrace, courtyard or deck</span></li><li><b>Filtered water</b><span>refill station, no plastic bottles</span></li><li><b>Daily housekeeping</b><span>and fresh towels for the beach</span></li></ul>
</div></section>''' + cta_band()

def p_house():
    return page_hero("The House", "A house in a garden, <em>not a resort</em>", "Seven rooms around a tropical garden of papaya, banana and coconut palms. Built for slow mornings, surf, and evenings out in Ahangama.", "a", "The house from the garden") + f'''
<section class="sec split">
  <div class="split-text">
    <p class="eyebrow">Our idea</p>
    <h2>Small on purpose.</h2>
    <p>With only seven rooms the house stays quiet, and we get to know everyone who stays. There's no restaurant and no buffet. You wake up, walk to a café that locals love, surf, sleep in the afternoon heat and head out again at sunset.</p>
    <p>What we do offer is everything that makes that rhythm easy: somewhere safe for your board, a rinse shower by the gate, a driver when you want to go further, and honest advice on where to go.</p>
  </div>
  {photo("Terrace in the afternoon", "c", "4/5")}
</section>
<section class="sec sec-sand">
  {sec_head("Services", "What we can arrange for you", "Just ask when you book or send us a message on WhatsApp during your stay.")}
  <div class="svc-grid">
    <div><h3>Airport transfers</h3><p>Private air-conditioned car from Colombo (CMB) or Mattala (HRI), with a driver who meets you at arrivals.</p></div>
    <div><h3>Surf lessons & boards</h3><p>Trusted local instructors for every level, and board rental delivered to the gate.</p></div>
    <div><h3>Drivers & tuk-tuks</h3><p>Day drivers for Galle, safaris and tea country, and tuk-tuk drivers we know by name.</p></div>
    <div><h3>Scooter rental</h3><p>Helmets included. Ask us about the local rules and a licence before you ride.</p></div>
    <div><h3>Massage & yoga</h3><p>Ayurvedic massage in town or in your room, and a weekly list of the best yoga classes.</p></div>
    <div><h3>Tours & tickets</h3><p>Safari jeeps, whale-watching boats and cooking classes booked with operators we trust.</p></div>
  </div>
</section>
<section class="sec">
  {sec_head("Gentle on the place", "How we try to look after Ahangama", None)}
  <div class="svc-grid three">
    <div><h3>No plastic bottles</h3><p>Filtered water refill stations for every room.</p></div>
    <div><h3>Local first</h3><p>Local builders, craftspeople, drivers and instructors, and cafés run by people from the village.</p></div>
    <div><h3>A living garden</h3><p>Papaya, banana and native plants, kept without pesticides. Expect birds, squirrels and the odd monitor lizard.</p></div>
  </div>
</section>
''' + cta_band()

def p_ahangama():
    return page_hero("Area guide", "Ahangama, <em>the way locals see it</em>", "A laid-back surf village on Sri Lanka's south coast, about five kilometres long, between Galle and Weligama. Reef breaks, palm-lined beaches, rice paddies behind the coast road and one of the best café scenes on the island.", "d", "Kabalana Beach at sunset") + f'''
<section class="sec">
  <div class="guide-index">
    <a href="{href('surf')}"><span class="mono">Surf</span><b>Eight breaks within 15 minutes</b></a>
    <a href="{href('things-to-do')}"><span class="mono">Do</span><b>Twelve things we love</b></a>
    <a href="{href('eat-drink')}"><span class="mono">Eat</span><b>Our café and dinner shortlist</b></a>
    <a href="{href('day-trips')}"><span class="mono">Go</span><b>Eight day trips worth the drive</b></a>
    <a href="{href('getting-here')}"><span class="mono">Arrive</span><b>Airports, transfers, trains</b></a>
  </div>
</section>
<section class="sec split split-map">
  <div class="split-text">
    <p class="eyebrow">The lay of the land</p>
    <h2>Four parts of one village</h2>
    <dl class="areas">
      <dt>Kabalana</dt><dd>The wide golden beach at the western end, with The Rock surf break, beach bars and the best sunsets.</dd>
      <dt>Ahangama town</dt><dd>The centre along the coast road: cafés, shops, the station, and the small beach bar strip.</dd>
      <dt>Sion</dt><dd>The quiet eastern end facing Devil's Rock, with a rooftop bar and a mellow reef break.</dd>
      <dt>Inland</dt><dd>Rice paddies, palm gardens and jungle lanes, two minutes from the coast and a world away from the traffic.</dd>
    </dl>
  </div>
  {coast_map()}
</section>
<section class="sec sec-sand">
  {sec_head("When to come", "Seasons on the south coast", "Ahangama is a year-round place, but the rhythm changes with the monsoon.")}
  {season_table()}
  <div class="svc-grid three season-notes">
    <div><h3>November to April</h3><p>Dry, sunny and calm mornings. Peak surf season with clean waves on the reefs. December to March is the busiest time of year, so book early.</p></div>
    <div><h3>May to September</h3><p>The southwest monsoon brings showers, bigger and messier seas and far fewer people. Green, quiet and good value. Not the time for beginner surf.</p></div>
    <div><h3>October</h3><p>The in-between month. Mixed weather, the first swells of the season and the town starting to wake up again.</p></div>
  </div>
</section>
<section class="sec">
  {sec_head("Distances", "How far is everything?", "Travel times by tuk-tuk or car from our gate. Traffic on the coast road can add time in the evening.")}
  {dist_table()}
</section>
<section class="sec sec-green">
  {sec_head("Good to know", "Practical Ahangama", None, cls="light")}
  <div class="svc-grid light">
    <div><h3>Money</h3><p>Sri Lankan rupees (LKR). ATMs in town and cards in most cafés, but carry cash for tuk-tuks and small shops.</p></div>
    <div><h3>Tuk-tuks</h3><p>Agree the price before you get in, or use the PickMe app for fixed fares. We can call a driver we know.</p></div>
    <div><h3>Sim cards</h3><p>Dialog and Mobitel tourist SIMs are cheap and fast. Buy one at the airport or in town.</p></div>
    <div><h3>Dress</h3><p>Beachwear on the beach. Cover shoulders and knees at temples, and take shoes off before you enter.</p></div>
    <div><h3>Ocean safety</h3><p>Many breaks are over shallow reef. Ask locally about currents, wear reef shoes at low tide and never swim alone at dusk.</p></div>
    <div><h3>Sun & bugs</h3><p>Strong sun all year and mosquitoes at dusk. Reef-safe sunscreen and repellent are easy to buy in town.</p></div>
  </div>
</section>
''' + cta_band()

def p_surf():
    rows = "".join(f'<tr><th scope="row">{e(n)}</th><td>{e(t)}</td><td><span class="lvl lvl-{"b" if l.startswith("Beginner") else ("a" if "advanced" in l else "i")}">{e(l)}</span></td><td>{e(d)}</td></tr>' for n, t, l, d in BREAKS)
    return page_hero("Surf guide", "Surf Ahangama, <em>from first wave to The Rock</em>", "The south coast's best stretch of reef and beach breaks sits on our doorstep. Here's where to go for your level, and how we can help.", "d", "Surfer at Kabalana") + f'''
<section class="sec">
  {sec_head("The breaks", "Eight spots within fifteen minutes", "Conditions change with tide and swell. Ask us or your instructor where it's working today.")}
  <div class="tbl-wrap"><table class="breaks"><thead><tr><th scope="col">Break</th><th scope="col">Type</th><th scope="col">Level</th><th scope="col">What to expect</th></tr></thead><tbody>{rows}</tbody></table></div>
</section>
<section class="sec sec-sand">
  <div class="svc-grid three">
    <div><h3>Learning to surf</h3><p>Start at Weligama or the beach break at Kabalana on a small day. Book two or three lessons in a row, it's the fastest way to stand up. We'll connect you with a trusted local instructor.</p></div>
    <div><h3>Boards & gear</h3><p>Rental shops line the coast road and rent by the day or week. Soft-tops for beginners, a good range of hard boards for everyone else. Reef shoes help at low tide.</p></div>
    <div><h3>At the house</h3><p>Board storage by the gate, an outdoor rinse shower and a place to hang your wetsuit. The Reef Suite is set up for early sessions.</p></div>
  </div>
</section>
<section class="sec">
  {sec_head("Surf season", "When the waves are good", "The south coast works best from November to April, when the northeast monsoon brings offshore winds and clean swell. From May to October the southwest monsoon hits the south coast directly: bigger, choppy and best left to experienced surfers.")}
  {season_table()}
</section>
<section class="sec sec-green">
  {sec_head("Surf etiquette", "Respect the lineup", None, cls="light")}
  <div class="svc-grid light">
    <div><h3>One surfer per wave</h3><p>The surfer closest to the peak has priority. Don't drop in.</p></div>
    <div><h3>Know your level</h3><p>The Rock and Animals are not learner spots. Watch a few sets before paddling out.</p></div>
    <div><h3>Mind the reef</h3><p>Fall flat, never dive head-first, and treat cuts right away. Coral cuts get infected fast in the tropics.</p></div>
  </div>
</section>
''' + cta_band("Surf season fills first.", "Most of our surf guests stay a week or more. Book direct for the best rate and free cancellation up to {free_cancel_days} days before arrival.")

def p_do():
    cards = "".join(f'<article class="do-card">{photo(t, "abcd"[i % 4], "3/2")}<span class="chip">{e(c)}</span><h3>{e(t)}</h3><p>{e(d)}</p></article>' for i, (t, c, d) in enumerate(DO))
    return page_hero("Things to do", "More than surf: <em>twelve things we love</em>", "Turtles and tea, sunsets and saunas. Our favourite ways to spend a day in and around Ahangama, whether you surf or not.", "b", "Stilt fishermen at dawn") + f'''
<section class="sec"><div class="do-grid">{cards}</div></section>
<section class="sec sec-sand">
  {sec_head("A perfect slow day", "How our guests like to spend a day", None)}
  <ol class="day">
    <li><span class="mono">06:00</span><div><b>Dawn surf or beach walk</b><p>The best waves and the softest light, before the heat.</p></div></li>
    <li><span class="mono">09:00</span><div><b>Long brunch</b><p>Smoothie bowls, hoppers or eggs at one of the cafés on our list.</p></div></li>
    <li><span class="mono">12:00</span><div><b>Garden and siesta</b><p>The midday sun is strong. Back to your terrace, a book and a nap.</p></div></li>
    <li><span class="mono">15:30</span><div><b>Explore</b><p>Turtles at Dalawella, a massage, a boutique crawl or the sauna at Wild.</p></div></li>
    <li><span class="mono">17:45</span><div><b>Sunset at Kabalana</b><p>King coconut in hand, surfers in silhouette.</p></div></li>
    <li><span class="mono">19:30</span><div><b>Dinner in town</b><p>Rice and curry at a local spot or dinner in the jungle at Trax.</p></div></li>
  </ol>
</section>
''' + cta_band()

def p_eat():
    blocks = []
    for cat, items in EAT:
        li = "".join(f'<li><b>{e(n)}</b><span>{e(d)}</span></li>' for n, d in items)
        blocks.append(f'<div class="eat-block"><h3>{e(cat)}</h3><ul class="eat-list">{li}</ul></div>')
    return page_hero("Eat & drink", "Where we eat, <em>and where we send you</em>", "We don't run a restaurant, on purpose. Ahangama has one of the best food scenes in Sri Lanka, and most of it is a short walk or tuk-tuk ride from the house.", "a", "Brunch in Ahangama") + f'''
<section class="sec"><div class="eat-grid">{''.join(blocks)}</div>
<p class="note">Places open, close and change often here. Ask us for this week's list when you arrive, we keep it up to date.</p></section>
<section class="sec sec-sand">
  {sec_head("Try at least once", "Sri Lankan food to look for", None)}
  <div class="svc-grid">
    <div><h3>Rice & curry</h3><p>The everyday lunch: rice with five to ten small curries, dhal, sambol and papadum.</p></div>
    <div><h3>Hoppers</h3><p>Bowl-shaped rice-flour pancakes, crispy at the edge. Order an egg hopper with lunu miris.</p></div>
    <div><h3>Kottu</h3><p>Chopped roti stir-fried on a griddle with vegetables, egg or chicken. You'll hear it before you see it.</p></div>
    <div><h3>Pol sambol</h3><p>Fresh coconut, chilli, lime and onion. On everything.</p></div>
    <div><h3>King coconut</h3><p>The orange coconut sold at every roadside stall. The best thing after a surf.</p></div>
    <div><h3>Fresh papaya</h3><p>Of course. Sweetest in the morning with a squeeze of lime.</p></div>
  </div>
</section>
''' + cta_band()

def p_trips():
    cards = "".join(f'''<article class="trip">
  {photo(t, "abcd"[i % 4], "4/3")}
  <div class="trip-body"><div class="trip-meta mono"><span>{e(dist)}</span><span>{e(dur)}</span></div><h3>{e(t)}</h3><p>{e(d)}</p><p class="tip"><b>Tip:</b> {e(tip)}</p></div>
</article>''' for i, (t, dist, dur, d, tip) in enumerate(TRIPS))
    return page_hero("Day trips", "Worth the drive: <em>day trips from Ahangama</em>", "Ahangama sits in the middle of the south coast, so forts, tea estates, whales and elephants are all within a day. We arrange drivers and tickets with people we trust.", "c", "Galle Fort ramparts") + f'''
<section class="sec"><div class="trip-grid">{cards}</div></section>
<section class="sec sec-sand split">
  <div class="split-text">
    <p class="eyebrow">Planning help</p>
    <h2>Tell us what you'd like to see.</h2>
    <p>Send us your dates and interests and we'll suggest a plan, book a driver and sort safari jeeps or boat tickets. You pay the driver or operator directly, we just make sure it's someone good.</p>
    <a class="btn btn-papaya" href="https://wa.me/{SITE['whatsapp']}" target="_blank" rel="noopener">Plan a trip on WhatsApp</a>
  </div>
  {coast_map()}
</section>
''' + cta_band()

def p_getting():
    return page_hero("Getting here", "Getting to <em>The Papaya Tree</em>", "Most guests fly into Colombo and arrive by private car along the Southern Expressway in about two and a half to three hours.", "c", "Coast road") + f'''
<section class="sec">
  <div class="svc-grid">
    <div><h3>Colombo airport (CMB)</h3><p>Bandaranaike International, the main international airport. 2 h 30 to 3 h by car via the Southern Expressway. We arrange a private air-conditioned car with a driver waiting at arrivals.</p></div>
    <div><h3>Mattala airport (HRI)</h3><p>A smaller airport east of us with few international routes. About 1 h 30 by car if your flight lands here.</p></div>
    <div><h3>By train</h3><p>The coastal line from Colombo Fort stops at Ahangama station. Slow, cheap and beautiful along the ocean. Grab a tuk-tuk from the station to our gate.</p></div>
    <div><h3>By bus</h3><p>Expressway buses run from Colombo to Galle and Matara. Change to a local coast-road bus or a tuk-tuk for the last stretch.</p></div>
    <div><h3>Around town</h3><p>Tuk-tuks for short hops, scooters for independence, a driver for day trips. We can arrange all three.</p></div>
    <div><h3>Finding us</h3><p>We send you a map pin and directions with your booking confirmation. Drivers know us by name.</p></div>
  </div>
</section>
<section class="sec sec-sand">
  {sec_head("Distances", "Travel times from our gate", None)}
  {dist_table()}
</section>
<section class="sec split split-map">
  <div class="split-text">
    <p class="eyebrow">Address</p>
    <h2>The Papaya Tree</h2>
    <p class="addr">{e(SITE['address'])}</p>
    <p><a class="btn btn-line" href="{SITE['maps']}" target="_blank" rel="noopener">Open in Google Maps</a></p>
    <p class="muted">Email <span class="sel">{e(SITE['email'])}</span><br>Phone & WhatsApp <span class="sel">{e(SITE['phone'])}</span></p>
  </div>
  {coast_map()}
</section>
''' + cta_band()

def p_faq():
    blocks = []
    for cat, qs in FAQ:
        items = "".join(f'<details><summary>{e(q)}</summary><p>{e(fmt(a))}</p></details>' for q, a in qs)
        blocks.append(f'<div class="faq-block"><h2>{e(cat)}</h2>{items}</div>')
    return page_hero("FAQ & policies", "Questions, <em>answered</em>", "Booking, payment, cancellation and everything about your stay. Can't find it here? Message us on WhatsApp, we reply fast.", "b", "Garden path") + \
        f'<section class="sec"><div class="faq">{"".join(blocks)}</div></section>' + cta_band()

def p_booking():
    opts = "".join(f'<option value="{r["slug"]}" data-price="{r["price"]}">{e(r["name"])}, from ${r["price"]}</option>' for r in ROOMS)
    return f'''
<section class="phero phero-book">
  <div class="phero-text"><p class="eyebrow">Book direct</p><h1>Book your stay</h1><p class="lead">Direct bookings get our best rate. Pay securely by card through PayHere, with free cancellation up to {SITE['free_cancel_days']} days before arrival.</p></div>
</section>
<section class="sec book-sec">
  <form class="book-form" data-bookform novalidate>
    <div class="bf-row">
      <label for="bf-room">Room<select id="bf-room" name="room"><option value="">Any available room</option>{opts}</select></label>
      <label for="bf-guests">Guests<select id="bf-guests" name="guests"><option>1</option><option selected>2</option><option>3</option></select></label>
    </div>
    <div class="bf-row">
      <label for="bf-in">Check-in<input type="date" id="bf-in" name="in" required></label>
      <label for="bf-out">Check-out<input type="date" id="bf-out" name="out" required></label>
    </div>
    <div class="bf-row">
      <label for="bf-name">Your name<input type="text" id="bf-name" name="name" autocomplete="name" required></label>
      <label for="bf-email">Email<input type="email" id="bf-email" name="email" autocomplete="email" required></label>
    </div>
    <label for="bf-msg">Anything we should know? <span class="muted">(optional)</span><textarea id="bf-msg" name="msg" rows="3" placeholder="Arrival time, airport transfer, surf lessons..."></textarea></label>
    <p class="bf-err" data-err hidden></p>
    <button class="btn btn-papaya btn-wide" type="submit">Check availability</button>
    <p class="muted small">Secure card payment through PayHere · Calendar synced with Airbnb and Booking.com</p>
  </form>
  <aside class="book-side">
    <div class="summary" data-summary>
      <h3>Your stay</h3>
      <dl><dt>Room</dt><dd data-s-room>Any available room</dd><dt>Dates</dt><dd data-s-dates>Choose dates</dd><dt>Nights</dt><dd data-s-nights class="mono">0</dd><dt>Estimate</dt><dd data-s-total class="mono">–</dd></dl>
      <p class="muted small">Final price and availability are confirmed in the next step.</p>
    </div>
    <div class="book-done" data-done hidden>
      <h3>Almost there</h3>
      <p>Online payment is being connected. Send us your request and we'll confirm availability and send a secure payment link.</p>
      <a class="btn btn-papaya btn-wide" data-wa target="_blank" rel="noopener" href="#">Send on WhatsApp</a>
      <p class="muted small">Or email us at <span class="sel">{e(SITE['email'])}</span></p>
    </div>
    <ul class="ticks small-ticks"><li>Best rate when you book direct</li><li>Free cancellation up to {SITE['free_cancel_days']} days before</li><li>Check-in from {SITE['checkin']}, check-out by {SITE['checkout']}</li><li>Airport transfers on request</li></ul>
  </aside>
</section>'''

PAGES = [
    ("home", "The Papaya Tree · Boutique stay in Ahangama, Sri Lanka", "Seven-room boutique house in a tropical garden in Ahangama, minutes from the surf at Kabalana. Book direct for the best rate.", p_home),
    ("rooms", "Rooms & suites · The Papaya Tree, Ahangama", "Seven rooms and suites, each with a private terrace, courtyard or deck, air conditioning and wifi.", p_rooms),
    ("house", "The House · The Papaya Tree, Ahangama", "A small boutique house in a garden of papaya and palms. Transfers, surf lessons, drivers and massage arranged for you.", p_house),
    ("ahangama", "Ahangama area guide · The Papaya Tree", "Everything about Ahangama: areas, seasons, distances and practical tips from locals.", p_ahangama),
    ("surf", "Surf guide Ahangama · The Papaya Tree", "The surf breaks of Ahangama, Midigama and Weligama by level, plus lessons, boards and the surf season.", p_surf),
    ("things-to-do", "Things to do in Ahangama · The Papaya Tree", "Turtles, stilt fishermen, Devil's Rock, sauna and ice baths, river cruises and more in Ahangama.", p_do),
    ("eat-drink", "Where to eat in Ahangama · The Papaya Tree", "Our shortlist of cafés, restaurants, local rice and curry and sunset bars in Ahangama.", p_eat),
    ("day-trips", "Day trips from Ahangama · The Papaya Tree", "Galle Fort, tea estates, whale watching, Udawalawe and Yala safaris from Ahangama.", p_trips),
    ("getting-here", "Getting here · The Papaya Tree, Ahangama", "How to get to Ahangama from Colombo and Mattala airports, by car, train or bus.", p_getting),
    ("faq", "FAQ & policies · The Papaya Tree", "Booking, payment, cancellation, check-in and practical questions answered.", p_faq),
    ("booking", "Book direct · The Papaya Tree, Ahangama", "Book your room at The Papaya Tree directly for the best rate.", p_booking),
]

def schema():
    return {
        "@context": "https://schema.org", "@type": "Hotel", "name": SITE["name"],
        "description": "Seven-room boutique house in a tropical garden in Ahangama, Sri Lanka.",
        "address": {"@type": "PostalAddress", "addressLocality": "Ahangama", "addressRegion": "Southern Province", "addressCountry": "LK"},
        "email": SITE["email"], "telephone": SITE["phone"], "numberOfRooms": 7,
        "checkinTime": SITE["checkin"], "checkoutTime": SITE["checkout"],
        "amenityFeature": [{"@type": "LocationFeatureSpecification", "name": n, "value": True} for n in ["Air conditioning", "Free wifi", "Surfboard storage", "Airport transfer"]],
    }

# ---------------------------------------------------------------- build
def build():
    css = open(os.path.join(ROOT, "styles.css")).read()
    js = open(os.path.join(ROOT, "main.js")).read()
    cfg = f"window.PAPAYA={json.dumps({k: SITE[k] for k in ['whatsapp','email','beds24_propid','currency']})};"
    rooms_js = f"window.PAPAYA_ROOMS={json.dumps({r['slug']: {'name': r['name'], 'price': r['price']} for r in ROOMS})};"

    if os.path.exists(DIST):
        shutil.rmtree(DIST)
    os.makedirs(DIST)
    shutil.copy(os.path.join(ROOT, "styles.css"), DIST)
    with open(os.path.join(DIST, "main.js"), "w") as f:
        f.write(cfg + "\n" + rooms_js + "\n" + js)
    for d in ["img/rooms"]:
        os.makedirs(os.path.join(DIST, d), exist_ok=True)
    with open(os.path.join(DIST, "img", "README.txt"), "w") as f:
        f.write("Drop real photos here. Filenames used by the site:\n  garden.jpg\n" + "".join(f"  rooms/{r['slug']}.jpg\n" for r in ROOMS) + "Also place hero.mp4 in the site root.\n")

    def copy_asset(src, dest):
        s = os.path.join(ROOT, src)
        d = os.path.join(DIST, dest)
        if os.path.isfile(s):
            os.makedirs(os.path.dirname(d) or DIST, exist_ok=True)
            shutil.copy2(s, d)

    for src, dest in [
        ("hero.mp4", "hero.mp4"),
        ("beach1.jpg", "img/garden.jpg"),
        ("rum1.jpg", "img/rooms/lotus.jpg"),
        ("rum 2.jpg", "img/rooms/jade.jpg"),
        ("rum 3.jpg", "img/rooms/mist.jpg"),
        ("rum 4.jpg", "img/rooms/villa.jpg"),
        ("rum1.jpg", "img/rooms/palm.jpg"),
        ("rum 2.jpg", "img/rooms/reef.jpg"),
        ("rum 3.jpg", "img/rooms/pavilion.jpg"),
    ]:
        copy_asset(src, dest)

    sections = []
    for slug, title, desc, fn in PAGES:
        body = fn()
        ld = f'<script type="application/ld+json">{json.dumps(schema())}</script>' if slug == "home" else ""
        doc = f'''<!doctype html>
<html lang="en"><head>{page_head(title, desc)}
<link rel="stylesheet" href="styles.css">{ld}</head>
<body data-page="{slug}">
{header(slug)}
<main>{body}</main>
{footer()}
<script src="main.js" defer></script>
</body></html>'''
        with open(os.path.join(DIST, href(slug)), "w") as f:
            f.write(doc)
        sections.append((slug, header(slug) + f"<main>{body}</main>"))

    # sitemap + robots
    base = "https://thepapayatree.lk/"
    with open(os.path.join(DIST, "sitemap.xml"), "w") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "".join(f"<url><loc>{base}{'' if s=='home' else href(s)}</loc></url>" for s, *_ in PAGES) + "</urlset>")
    with open(os.path.join(DIST, "robots.txt"), "w") as f:
        f.write(f"User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: {base}sitemap.xml\n")

    # ---- single-file preview (hash routed)
    def rewrite(h):
        h = re.sub(r'href="index\.html(?:#[\w-]+)?"', 'href="#home"', h)
        h = re.sub(r'href="([\w-]+)\.html(?:\?room=[\w-]+)?(?:#[\w-]+)?"', r'href="#\1"', h)
        h = h.replace('action="booking.html"', 'action="#booking"')
        h = h.replace('src="hero.mp4"', '')
        return h
    secs = "".join(f'<div class="pv-page" data-pv="{s}"{"" if s=="home" else " hidden"}>{rewrite(b)}</div>' for s, b in sections)
    pv_head = f'''<title>The Papaya Tree</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..900,0..100,0..1&family=Instrument+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap">
<style>{css}</style>'''
    with open(os.path.join(ROOT, "preview.html"), "w") as f:
        f.write(pv_head + "\n<div class=\"pv-root\">" + secs + rewrite(footer()) + "</div>\n<script>" + cfg + rooms_js + "window.PAPAYA_PREVIEW=true;\n" + js + "</script>")
    print("built", len(PAGES), "pages")

if __name__ == "__main__":
    build()
