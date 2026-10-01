// Single source of truth for the IMAGE SLOT TABLE used by:
//   - scripts/generate-placeholders.mjs (designed placeholder SVGs)
//   - scripts/check-images.mjs (build/launch gate)
//   - scripts/print-image-slots.mjs (docs/IMAGE-SLOTS.md)
// This MUST stay in sync with the slug/width/height list in lib/images.ts. If you add
// a slot there, add the matching row here too.
//
// icon is one of: pool, fork, cocktail, palm, wave (used by generate-placeholders.mjs)

export const slots = [
  { slug: "home-hero", imagesPath: "home.hero", width: 1600, height: 900, icon: "wave", description: "A person walking or running the shoreline at golden-hour sunset, or a surfer paddling out. Warm light, figures small so headline text stays readable." },
  { slug: "home-garden", imagesPath: "home.garden", width: 1200, height: 900, icon: "palm", description: "The tropical garden with papaya and palm trees." },
  { slug: "home-pool", imagesPath: "home.pool", width: 1200, height: 900, icon: "pool", description: "The pool ringed with palms and plumeria." },
  { slug: "home-rooftop", imagesPath: "home.rooftop", width: 1200, height: 900, icon: "cocktail", description: "The rooftop lounge and bar at golden hour." },
  { slug: "home-restaurant", imagesPath: "home.restaurant", width: 1200, height: 900, icon: "fork", description: "Breakfast table with tropical fruit and coffee." },
  { slug: "home-surf", imagesPath: "home.surf", width: 1200, height: 900, icon: "wave", description: "A surfer on a south coast Sri Lanka wave near Ahangama." },
  { slug: "rooms-double-1", imagesPath: "rooms.double[0]", width: 1200, height: 900, icon: "palm", description: "Deluxe Double room with king bed." },
  { slug: "rooms-double-2", imagesPath: "rooms.double[1]", width: 1200, height: 900, icon: "palm", description: "Private balcony of a Deluxe Double room over the garden and pool." },
  { slug: "rooms-double-3", imagesPath: "rooms.double[2]", width: 1200, height: 900, icon: "palm", description: "Ensuite bathroom in a Deluxe Double room." },
  { slug: "rooms-double-4", imagesPath: "rooms.double[3]", width: 1200, height: 900, icon: "palm", description: "Detail of a Deluxe Double room." },
  { slug: "rooms-double-5", imagesPath: "rooms.double[4]", width: 1200, height: 900, icon: "palm", description: "Detail of a Deluxe Double room." },
  { slug: "rooms-family-1", imagesPath: "rooms.family[0]", width: 1200, height: 900, icon: "palm", description: "Deluxe Four-Bed family room with king bed and bunk." },
  { slug: "rooms-family-2", imagesPath: "rooms.family[1]", width: 1200, height: 900, icon: "palm", description: "Private patio of the Deluxe Four-Bed family room." },
  { slug: "rooms-family-3", imagesPath: "rooms.family[2]", width: 1200, height: 900, icon: "palm", description: "Ensuite bathroom in the Deluxe Four-Bed room." },
  { slug: "rooms-family-4", imagesPath: "rooms.family[3]", width: 1200, height: 900, icon: "palm", description: "Detail of the Deluxe Four-Bed family room." },
  { slug: "rooms-family-5", imagesPath: "rooms.family[4]", width: 1200, height: 900, icon: "palm", description: "Detail of the Deluxe Four-Bed family room." },
  { slug: "house-pool", imagesPath: "house.pool", width: 1200, height: 900, icon: "pool", description: "The pool at The Papaya Tree, ringed with palms." },
  { slug: "house-rooftop", imagesPath: "house.rooftop", width: 1200, height: 900, icon: "cocktail", description: "The rooftop bar at The Papaya Tree." },
  { slug: "house-restaurant", imagesPath: "house.restaurant", width: 1200, height: 900, icon: "fork", description: "The restaurant set for breakfast." },
  { slug: "house-garden", imagesPath: "house.garden", width: 1200, height: 900, icon: "palm", description: "The garden at The Papaya Tree." },
  { slug: "house-entrance", imagesPath: "house.entrance", width: 1200, height: 900, icon: "palm", description: "The entrance to The Papaya Tree." },
  { slug: "guide-surf", imagesPath: "guide.surf", width: 1200, height: 900, icon: "wave", description: "A surf break on the south coast near Ahangama." },
  { slug: "guide-eat", imagesPath: "guide.eat", width: 1200, height: 900, icon: "fork", description: "A beachfront meal near Ahangama." },
  { slug: "guide-things", imagesPath: "guide.things", width: 1200, height: 900, icon: "palm", description: "Stilt fishermen near Koggala, or a yoga session near Ahangama." },
  { slug: "guide-day-trips", imagesPath: "guide.dayTrips", width: 1200, height: 900, icon: "palm", description: "Galle Fort ramparts, or tea hills inland from Ahangama." },
  { slug: "guide-getting-here", imagesPath: "guide.gettingHere", width: 1200, height: 900, icon: "palm", description: "A tuk-tuk, or the coastal train that passes Ahangama." },
  { slug: "guide-good-to-know", imagesPath: "guide.goodToKnow", width: 1200, height: 900, icon: "palm", description: "Everyday street life in Ahangama." },
  { slug: "day-dawn", imagesPath: "day.dawn", width: 1200, height: 900, icon: "palm", description: "Dawn light near The Papaya Tree." },
  { slug: "day-breakfast", imagesPath: "day.breakfast", width: 1200, height: 900, icon: "fork", description: "Breakfast at The Papaya Tree." },
  { slug: "day-pool", imagesPath: "day.pool", width: 1200, height: 900, icon: "pool", description: "Midday at the pool." },
  { slug: "day-afternoon", imagesPath: "day.afternoon", width: 1200, height: 900, icon: "palm", description: "An afternoon out from The Papaya Tree." },
  { slug: "day-sunset", imagesPath: "day.sunset", width: 1200, height: 900, icon: "cocktail", description: "Sunset from The Papaya Tree's rooftop." },
  { slug: "day-night", imagesPath: "day.night", width: 1200, height: 900, icon: "palm", description: "A quiet room at The Papaya Tree at night." },
]
