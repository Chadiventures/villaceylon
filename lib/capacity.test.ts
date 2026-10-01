import { test } from "node:test"
import assert from "node:assert/strict"
import { MAX_GUESTS, ROOM_TYPES, capacityHelperShort, guestCapacity, suggestRooms, suggestRoomsText } from "./capacity.ts"

test("MAX_GUESTS is the sum of units * maxGuests", () => {
  const expected = ROOM_TYPES.reduce((sum, room) => sum + room.units * room.maxGuests, 0)
  assert.equal(MAX_GUESTS, expected)
  assert.equal(MAX_GUESTS, 16)
})

test("suggestRooms is empty for 0, negative or over MAX_GUESTS", () => {
  assert.deepEqual(suggestRooms(0), [])
  assert.deepEqual(suggestRooms(-1), [])
  assert.deepEqual(suggestRooms(MAX_GUESTS + 1), [])
})

test("every suggestion actually fits the requested guest count", () => {
  for (let guests = 1; guests <= MAX_GUESTS; guests++) {
    const suggestions = suggestRooms(guests)
    assert.ok(suggestions.length >= 1, `expected at least one suggestion for ${guests} guests`)
    for (const suggestion of suggestions) {
      assert.ok(guestCapacity(suggestion.rooms) >= guests, `${suggestion.label} does not fit ${guests} guests`)
    }
  }
})

test("no suggestion ever exceeds unit limits", () => {
  const doubleUnits = ROOM_TYPES.find((r) => r.id === "double")!.units
  const familyUnits = ROOM_TYPES.find((r) => r.id === "family")!.units
  for (let guests = 1; guests <= MAX_GUESTS; guests++) {
    for (const suggestion of suggestRooms(guests)) {
      assert.ok((suggestion.rooms.double ?? 0) <= doubleUnits)
      assert.ok((suggestion.rooms.family ?? 0) <= familyUnits)
    }
  }
})

test("1 to 2 guests suggests a single Deluxe Double", () => {
  for (const guests of [1, 2]) {
    const suggestions = suggestRooms(guests)
    assert.equal(suggestions.length, 1)
    assert.equal(suggestions[0].label, "1 Deluxe Double")
  }
})

test("3 to 4 guests suggests a Four-Bed or two Doubles", () => {
  for (const guests of [3, 4]) {
    const suggestions = suggestRooms(guests)
    assert.equal(suggestions.length, 2)
    assert.equal(suggestions[0].label, "1 Deluxe Four-Bed")
    assert.equal(suggestions[1].label, "2 Deluxe Doubles")
  }
})

test("5 to 6 guests suggests a Double+Four-Bed or three Doubles", () => {
  for (const guests of [5, 6]) {
    const suggestions = suggestRooms(guests)
    assert.equal(suggestions.length, 2)
    assert.equal(suggestions[0].label, "1 Deluxe Double + 1 Deluxe Four-Bed")
    assert.equal(suggestions[1].label, "3 Deluxe Doubles")
  }
})

test("16 guests (the max) suggests every room at once", () => {
  const suggestions = suggestRooms(16)
  assert.equal(suggestions.length, 1)
  assert.equal(suggestions[0].label, "6 Deluxe Doubles + 1 Deluxe Four-Bed")
})

test("suggestRoomsText renders a muted helper sentence", () => {
  assert.equal(suggestRoomsText(2), "Suggested: 1 Deluxe Double.")
  assert.equal(suggestRoomsText(4), "Suggested: 1 Deluxe Four-Bed, or 2 Deluxe Doubles.")
  assert.equal(suggestRoomsText(17), "")
})

test("capacityHelperShort uses the short Four-Bed form", () => {
  assert.equal(capacityHelperShort(), "6 Deluxe Doubles (2 guests each) and 1 Four-Bed (4 guests).")
})
