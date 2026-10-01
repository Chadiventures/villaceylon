# Image slots

Every image on the site comes from a single typed manifest: `lib/images.ts`. Drop a
file at the exact path below and rebuild. The placeholder for that slot is replaced
automatically, no code changes needed.

- All photo slots expect a `.jpg` file at the path shown.
- The hero video (not listed below) expects `/public/video/hero.mp4` and, optionally,
  `/public/video/hero.webm` (10 to 15 seconds, 1080p max, under 3MB each, no audio).
  While neither exists, the hero shows the poster placeholder instead, with no broken
  video box.
- Run `node scripts/check-images.mjs` any time to see which slots are still
  placeholders. Run `LAUNCH_CHECK=1 node scripts/check-images.mjs` before a real
  launch to make missing photos fail the command.

| Slot | File path | Recommended size | Aspect ratio | What the photo must show |
| --- | --- | --- | --- | --- |
| `IMAGES.home.hero` | `/public/images/home-hero.jpg` | 1600×900px | 16:9 | A person walking or running the shoreline at golden-hour sunset, or a surfer paddling out. Warm light, figures small so headline text stays readable. |
| `IMAGES.home.garden` | `/public/images/home-garden.jpg` | 1200×900px | 4:3 | The tropical garden with papaya and palm trees. |
| `IMAGES.home.pool` | `/public/images/home-pool.jpg` | 1200×900px | 4:3 | The pool ringed with palms and plumeria. |
| `IMAGES.home.rooftop` | `/public/images/home-rooftop.jpg` | 1200×900px | 4:3 | The rooftop lounge and bar at golden hour. |
| `IMAGES.home.restaurant` | `/public/images/home-restaurant.jpg` | 1200×900px | 4:3 | Breakfast table with tropical fruit and coffee. |
| `IMAGES.home.surf` | `/public/images/home-surf.jpg` | 1200×900px | 4:3 | A surfer on a south coast Sri Lanka wave near Ahangama. |
| `IMAGES.rooms.double[0]` | `/public/images/rooms-double-1.jpg` | 1200×900px | 4:3 | Deluxe Double room with king bed. |
| `IMAGES.rooms.double[1]` | `/public/images/rooms-double-2.jpg` | 1200×900px | 4:3 | Private balcony of a Deluxe Double room over the garden and pool. |
| `IMAGES.rooms.double[2]` | `/public/images/rooms-double-3.jpg` | 1200×900px | 4:3 | Ensuite bathroom in a Deluxe Double room. |
| `IMAGES.rooms.double[3]` | `/public/images/rooms-double-4.jpg` | 1200×900px | 4:3 | Detail of a Deluxe Double room. |
| `IMAGES.rooms.double[4]` | `/public/images/rooms-double-5.jpg` | 1200×900px | 4:3 | Detail of a Deluxe Double room. |
| `IMAGES.rooms.family[0]` | `/public/images/rooms-family-1.jpg` | 1200×900px | 4:3 | Deluxe Four-Bed family room with king bed and bunk. |
| `IMAGES.rooms.family[1]` | `/public/images/rooms-family-2.jpg` | 1200×900px | 4:3 | Private patio of the Deluxe Four-Bed family room. |
| `IMAGES.rooms.family[2]` | `/public/images/rooms-family-3.jpg` | 1200×900px | 4:3 | Ensuite bathroom in the Deluxe Four-Bed room. |
| `IMAGES.rooms.family[3]` | `/public/images/rooms-family-4.jpg` | 1200×900px | 4:3 | Detail of the Deluxe Four-Bed family room. |
| `IMAGES.rooms.family[4]` | `/public/images/rooms-family-5.jpg` | 1200×900px | 4:3 | Detail of the Deluxe Four-Bed family room. |
| `IMAGES.house.pool` | `/public/images/house-pool.jpg` | 1200×900px | 4:3 | The pool at The Papaya Tree, ringed with palms. |
| `IMAGES.house.rooftop` | `/public/images/house-rooftop.jpg` | 1200×900px | 4:3 | The rooftop bar at The Papaya Tree. |
| `IMAGES.house.restaurant` | `/public/images/house-restaurant.jpg` | 1200×900px | 4:3 | The restaurant set for breakfast. |
| `IMAGES.house.garden` | `/public/images/house-garden.jpg` | 1200×900px | 4:3 | The garden at The Papaya Tree. |
| `IMAGES.house.entrance` | `/public/images/house-entrance.jpg` | 1200×900px | 4:3 | The entrance to The Papaya Tree. |
| `IMAGES.guide.surf` | `/public/images/guide-surf.jpg` | 1200×900px | 4:3 | A surf break on the south coast near Ahangama. |
| `IMAGES.guide.eat` | `/public/images/guide-eat.jpg` | 1200×900px | 4:3 | A beachfront meal near Ahangama. |
| `IMAGES.guide.things` | `/public/images/guide-things.jpg` | 1200×900px | 4:3 | Stilt fishermen near Koggala, or a yoga session near Ahangama. |
| `IMAGES.guide.dayTrips` | `/public/images/guide-day-trips.jpg` | 1200×900px | 4:3 | Galle Fort ramparts, or tea hills inland from Ahangama. |
| `IMAGES.guide.gettingHere` | `/public/images/guide-getting-here.jpg` | 1200×900px | 4:3 | A tuk-tuk, or the coastal train that passes Ahangama. |
| `IMAGES.guide.goodToKnow` | `/public/images/guide-good-to-know.jpg` | 1200×900px | 4:3 | Everyday street life in Ahangama. |
| `IMAGES.day.dawn` | `/public/images/day-dawn.jpg` | 1200×900px | 4:3 | Dawn light near The Papaya Tree. |
| `IMAGES.day.breakfast` | `/public/images/day-breakfast.jpg` | 1200×900px | 4:3 | Breakfast at The Papaya Tree. |
| `IMAGES.day.pool` | `/public/images/day-pool.jpg` | 1200×900px | 4:3 | Midday at the pool. |
| `IMAGES.day.afternoon` | `/public/images/day-afternoon.jpg` | 1200×900px | 4:3 | An afternoon out from The Papaya Tree. |
| `IMAGES.day.sunset` | `/public/images/day-sunset.jpg` | 1200×900px | 4:3 | Sunset from The Papaya Tree's rooftop. |
| `IMAGES.day.night` | `/public/images/day-night.jpg` | 1200×900px | 4:3 | A quiet room at The Papaya Tree at night. |
