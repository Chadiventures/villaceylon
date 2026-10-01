const fs = require("fs")
const path = require("path")

const lines = [
  "THE PAPAYA TREE",
  "The Ahangama Travel Guide",
  "",
  "Written by the family who live here. Keep this, whether you book with us or not.",
  "",
  "GOOD THINGS TO KNOW",
  "Ahangama is on Sri Lanka's south coast, about 2 to 2.5 hours from Colombo airport.",
  "A scooter or tuk-tuk covers most days. Cash and card both work in most places.",
  "",
  "SURF & FITNESS",
  "Kabalana is a 3 minute walk from the garden gate. Best season is Nov to April.",
  "Several yoga and fitness studios are a short ride away.",
  "",
  "EAT & DRINK",
  "Our own restaurant and rooftop bar are on site. Ceylon Sliders, Crust and",
  "Moochies are a short walk away. Weligama and Mirissa are 15 to 20 minutes by tuk-tuk.",
  "",
  "DAY TRIPS",
  "Galle Fort is 25 minutes away. Tea country and Yala safari are full day trips",
  "worth the early start. Ask us on WhatsApp for a trusted driver.",
  "",
  "GETTING HERE",
  "Private car from Colombo: 2 to 2.5 h, USD 55 to 75.",
  "Coastal train: 3 to 4 h, scenic, USD 2 to 8.",
  "",
  "Say hello: hello@thepapayatree.com / WhatsApp +94 78 716 3242",
  "thepapayatree.com",
]

function esc(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")
}

const fontSize = 13
const leading = 20
let y = 760
const contentParts = ["BT", `/F1 ${fontSize} Tf`, `${leading} TL`, `60 ${y} Td`]
lines.forEach((line, index) => {
  if (index === 0) {
    contentParts.push(`(${esc(line)}) Tj`)
  } else {
    contentParts.push("T*", `(${esc(line)}) Tj`)
  }
})
contentParts.push("ET")
const content = contentParts.join("\n")

const objects = []
objects.push("<< /Type /Catalog /Pages 2 0 R >>")
objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
objects.push("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>")
objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`)

let pdf = "%PDF-1.4\n"
const offsets = [0]
objects.forEach((obj, index) => {
  offsets.push(pdf.length)
  pdf += `${index + 1} 0 obj\n${obj}\nendobj\n`
})
const xrefOffset = pdf.length
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (let i = 1; i <= objects.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

const outPath = path.join(__dirname, "..", "public", "the-papaya-tree-ahangama-guide.pdf")
fs.writeFileSync(outPath, pdf, "latin1")
console.log("Wrote", outPath)
