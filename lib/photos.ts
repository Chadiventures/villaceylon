const root = "/images/placeholder"

export const photos = {
  heroVideo: "/videos/hero.mp4",
  hero2: `${root}/sunset.jpg`,
  rooms: {
    double: {
      bedroom: `${root}/rooms/double/bedroom.jpg`,
      balcony: `${root}/rooms/double/balcony.jpg`,
      bathroom: `${root}/rooms/double/bathroom.jpg`,
    },
    family: {
      room1: `${root}/rooms/family/family-room-1.jpg`,
      room2: `${root}/rooms/family/family-room-2.jpg`,
      bathroom: `${root}/rooms/family/family-bathroom.jpg`,
    },
  },
  property: {
    pool1: `${root}/property/pool-1.jpg`,
    pool2: `${root}/property/pool-2.jpg`,
    restaurant: `${root}/property/restaurant.jpg`,
    groundFloor: `${root}/property/ground-floor.jpg`,
  },
  activities: {
    surfing: `${root}/activities/surfing.jpg`,
    wave: `${root}/activities/wave.jpg`,
    stiltfishing: `${root}/activities/stiltfishing.jpg`,
  },
  ahangama: {
    beach: `${root}/ahangama/beach-ahangama.jpg`,
  },
  trips: {
    galleFort: `${root}/trips/galle-fort.jpg`,
  },
  lifestyle: {
    wakeUp: `${root}/lifestyle/wake-up.jpg`,
  },
}

export const roomPhotos = {
  double: [
    { src: photos.rooms.double.bedroom, alt: "Deluxe Double room with king bed and garden view at The Papaya Tree" },
    { src: photos.rooms.double.balcony, alt: "Private balcony of a Deluxe Double room at The Papaya Tree, Ahangama" },
    { src: photos.rooms.double.bathroom, alt: "Ensuite bathroom in a Deluxe Double room at The Papaya Tree" },
  ],
  family: [
    { src: photos.rooms.family.room1, alt: "Deluxe Four-Bed family room at The Papaya Tree, Ahangama" },
    { src: photos.rooms.family.room2, alt: "Deluxe Four-Bed room with space for a family at The Papaya Tree" },
    { src: photos.rooms.family.bathroom, alt: "Ensuite bathroom in the Deluxe Four-Bed room at The Papaya Tree" },
  ],
}
