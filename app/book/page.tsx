import { BookingForm } from "../../components/BookingForm"
import { Cta } from "../../components/Cta"
import { InstagramIcon, MailIcon, WhatsAppIcon } from "../../components/Icons"
import { PageHeader } from "../../components/PageHeader"
import { PolicyCard } from "../../components/PolicyCard"
import { Section } from "../../components/Section"

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book direct"
        title={<>Book your <em>stay</em></>}
        lead={<>Seven rooms around the garden and pool, from $65 a night for a double. Book direct for the best rate and free cancellation up to five days before you arrive.</>}
      />
      <Section>
        <div className="book-grid">
          <BookingForm />
          <div>
            <PolicyCard />
            <div className="policy" style={{ marginTop: 20 }}>
              <h3>Find us</h3>
              <p style={{ color: "var(--ink-2)", lineHeight: 1.85 }}>The Papaya Tree<br />Munidasa Mawatha, Ahangama 80650<br />Ahangama, Sri Lanka</p>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="https://wa.me/94787163242" target="_blank" rel="noopener" aria-label="WhatsApp +94 78 716 3242" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--forest)", fontWeight: 600, textDecoration: "none" }}><WhatsAppIcon />+94 78 716 3242</a>
                <a href="mailto:hello@thepapayatree.com" aria-label="Email hello@thepapayatree.com" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--forest)", fontWeight: 600, textDecoration: "none" }}><MailIcon />hello@thepapayatree.com</a>
                <a href="https://instagram.com/thepapayatree_ahangama" target="_blank" rel="noopener" aria-label="Instagram @thepapayatree_ahangama" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--forest)", fontWeight: 600, textDecoration: "none" }}><InstagramIcon />@thepapayatree_ahangama</a>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Cta />
    </>
  )
}
