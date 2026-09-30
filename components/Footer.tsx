import Link from "next/link"
import { InstagramIcon, MailIcon, WhatsAppIcon } from "./Icons"

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div>
          <Link className="logo" href="/" style={{ display: "inline-flex" }}>
            <span className="lw">THE PAPAYA TREE</span>
            <span className="ls">AHANGAMA · SRI LANKA</span>
          </Link>
          <p style={{ maxWidth: "34ch", marginTop: 16 }}>Seven rooms in a garden of papaya and palms, three minutes from the surf in Ahangama.</p>
          <p style={{ marginTop: 14, fontSize: ".9rem", opacity: 0.82 }}>Munidasa Mawatha, Ahangama 80650<br />Ahangama, Sri Lanka</p>
        </div>
        <div>
          <h4>Visit</h4>
          <Link href="/rooms">The rooms</Link>
          <Link href="/house">The house</Link>
          <Link href="/guide">Ahangama guide</Link>
          <Link href="/book">Book direct</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="https://wa.me/94787163242" target="_blank" rel="noopener" aria-label="WhatsApp +94 78 716 3242" style={{ display: "flex", alignItems: "center", gap: 10 }}><WhatsAppIcon />+94 78 716 3242</a>
          <a href="https://instagram.com/thepapayatree_ahangama" target="_blank" rel="noopener" aria-label="Instagram @thepapayatree_ahangama" style={{ display: "flex", alignItems: "center", gap: 10 }}><InstagramIcon />@thepapayatree_ahangama</a>
          <a href="mailto:hello@thepapayatree.com" aria-label="Email hello@thepapayatree.com" style={{ display: "flex", alignItems: "center", gap: 10 }}><MailIcon />hello@thepapayatree.com</a>
        </div>
      </div>
      <div className="wrap foot-base">
        <div>
          <p>© 2026 The Papaya Tree, Ahangama</p>
          <a href="https://shorelinetechstudio.se/" target="_blank" rel="noopener">Built and designed by Shoreline Tech Studio</a>
        </div>
      </div>
    </footer>
  )
}
