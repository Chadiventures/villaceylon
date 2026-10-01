import assert from "node:assert/strict"
import { test } from "node:test"
import {
  FAQ_CATEGORIES,
  FAQ_TITLE,
  FAQ_UNPUBLISHED,
  faqAnswerPlain,
  faqGroups,
  faqItems,
  faqPageLd,
  wordCount,
} from "./faq.ts"

test("six grouped FAQ sections", () => {
  assert.equal(FAQ_CATEGORIES.length, 6)
  assert.equal(faqGroups.length, 6)
  assert.deepEqual(
    faqGroups.map((group) => group.title),
    [
      "Booking and policies",
      "Rooms and facilities",
      "Food and drink",
      "Getting here",
      "Surf and the area",
      "Practical tips",
    ],
  )
  for (const group of faqGroups) {
    assert.ok(group.items.length > 0, `${group.title} has no questions`)
  }
})

test("FAQPage JSON-LD matches visible text and is never empty", () => {
  const data = faqPageLd(faqItems)
  assert.equal(data["@context"], "https://schema.org")
  assert.equal(data["@type"], "FAQPage")
  assert.equal(data.mainEntity.length, faqItems.length)
  assert.ok(data.mainEntity.length > 0)
  for (const [index, item] of faqItems.entries()) {
    const entity = data.mainEntity[index]
    assert.equal(entity["@type"], "Question")
    assert.equal(entity.name, item.question)
    assert.equal(entity.acceptedAnswer["@type"], "Answer")
    assert.equal(entity.acceptedAnswer.text, item.answer)
    assert.equal(entity.acceptedAnswer.text, faqAnswerPlain(item.answer))
    assert.ok(entity.acceptedAnswer.text.length > 0)
    assert.ok(item.question.length > 0)
    assert.ok(item.id.length > 0)
  }
})

test("answers are 30 to 70 words, answer-first, no em dashes", () => {
  for (const item of faqItems) {
    const words = wordCount(item.answer)
    assert.ok(words >= 30 && words <= 70, `${item.id} has ${words} words`)
    assert.ok(!item.answer.includes("\u2014") && !item.question.includes("\u2014"), `${item.id} has an em dash`)
    assert.ok(!item.answer.includes("<") && !item.answer.includes(">"), `${item.id} answer is not plain text`)
  }
})

test("unpublished TODOs stay off the page and out of JSON-LD", () => {
  const published = JSON.stringify(faqItems)
  const ld = JSON.stringify(faqPageLd(faqItems))
  for (const skipped of FAQ_UNPUBLISHED) {
    assert.equal(published.includes(skipped), false, `published FAQ contains "${skipped}"`)
    assert.equal(ld.includes(skipped), false, `JSON-LD contains "${skipped}"`)
  }
})

test("document title is the requested FAQ string", () => {
  assert.equal(FAQ_TITLE, "FAQ: Staying at The Papaya Tree, Ahangama | Boutique Hotel Sri Lanka")
})
