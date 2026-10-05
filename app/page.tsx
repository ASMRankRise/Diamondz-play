import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Mail, MapPin } from "lucide-react";
import logo from "../Logo.jpg";
import { siteContent } from "@/content/site";
import { SeesawScene } from "@/components/seesaw-scene";

function InstagramIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.32 4.55 17.87 6.11C19.42 7.66 20.28 9.73 20.27 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.57 14.36C16.32 14.23 15.11 13.64 14.88 13.56C14.65 13.47 14.49 13.43 14.32 13.68C14.16 13.93 13.69 14.49 13.55 14.65C13.41 14.81 13.26 14.83 13.01 14.71C12.76 14.58 11.96 14.32 11.01 13.48C10.27 12.82 9.77 12 9.63 11.75C9.48 11.51 9.61 11.37 9.74 11.25C9.85 11.14 9.99 10.96 10.11 10.82C10.24 10.68 10.28 10.58 10.36 10.41C10.44 10.25 10.4 10.1 10.34 9.98C10.28 9.86 9.79 8.65 9.58 8.16C9.38 7.68 9.18 7.74 9.02 7.73C8.88 7.73 8.71 7.73 8.54 7.73C8.38 7.73 8.11 7.79 7.88 8.04C7.66 8.29 7.02 8.89 7.02 10.11C7.02 11.33 7.91 12.51 8.03 12.67C8.16 12.84 9.78 15.34 12.27 16.41C12.86 16.67 13.32 16.82 13.68 16.94C14.27 17.13 14.82 17.1 15.25 17.04C15.73 16.97 16.73 16.43 16.94 15.85C17.15 15.27 17.15 14.78 17.09 14.68C17.02 14.58 16.86 14.49 16.57 14.36Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="page-header content-width">
        <a href="#main" className="brand-lockup" aria-label="Diamondz Play home">
          <Image src={logo} alt="Diamondz Play" priority sizes="80px" className="brand-logo" />
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-caption">A world of play.</span>
        </a>
        <a href="#contact" className="header-contact">
          <span>Let’s talk</span>
          <ArrowUpRight size={15} />
        </a>
      </header>

      <main id="main">
        <section className="hero content-width" aria-labelledby="hero-title">
          <div className="hero-atmosphere" aria-hidden="true">
            <div className="ambient-glow" />
          </div>

          <div className="hero-content">
            <div className="status-badge-container">
              <span className="status-pill">
                <span className="status-dot" />
                <span className="status-text">{siteContent.status}</span>
              </span>
            </div>

            <h1 id="hero-title">
              <span className="hero-title-top">{siteContent.headline.first}</span>
              <br />
              <span className="hero-title-sub">is </span>
              <span className="headline-accent">
                {siteContent.headline.second}
                <svg viewBox="0 0 420 22" fill="none" aria-hidden="true" className="accent-underline">
                  <path d="M5 15C99 1 270 1 414 12C315 21 168 21 70 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="hero-description">{siteContent.introduction}</p>

            <div className="hero-actions">
              <a href={siteContent.email.href} className="primary-link">
                <span>Get in touch</span>
                <ArrowUpRight size={16} className="btn-icon" />
              </a>
              <a href={siteContent.mapsHref} target="_blank" rel="noreferrer" className="secondary-link">
                <MapPin size={15} className="btn-icon-map" />
                <span>Find us on Maps</span>
                <ArrowUpRight size={14} className="btn-icon-arrow" />
              </a>
            </div>
          </div>

          <div className="play-stage">
            <span className="stage-orbit" aria-hidden="true" />
            <SeesawScene />
            <p className="stage-caption"><span />A little play, while you wait.<span /></p>
          </div>
          <div className="hero-bottom">
            <span>Thoughtfully made. Playfully imagined.</span>
            <a href="#contact" aria-label="Explore contact details"><ArrowDown size={16} /></a>
            <span>Coming soon</span>
          </div>
        </section>

        <section className="contact-section content-width" id="contact" aria-labelledby="contact-title">
          <div className="contact-intro">
            <div>
              <p className="eyebrow">In the meantime</p>
              <h2 id="contact-title">We’re still just a hello away.</h2>
            </div>
            <p className="contact-intro-desc">{siteContent.contactIntro}</p>
          </div>

          <div className="contact-cards-grid">
            {/* Card 1: Email */}
            <article className="contact-card">
              <div className="contact-card-header">
                <span className="contact-icon contact-icon-mail" aria-hidden="true">
                  <Mail size={19} strokeWidth={1.75} />
                </span>
                <span className="card-arrow-btn" aria-hidden="true">
                  <ArrowUpRight size={15} />
                </span>
              </div>
              <div className="contact-card-content">
                <h3>Write to us</h3>
                <p>For questions, ideas, partnerships, and new beginnings.</p>
              </div>
              <div className="contact-card-action">
                <a className="contact-action-pill" href={siteContent.email.href}>
                  <Mail size={14} className="action-pill-icon" />
                  <span className="action-pill-text">{siteContent.email.value}</span>
                  <ArrowUpRight size={14} className="action-pill-arrow" />
                </a>
              </div>
            </article>

            {/* Card 2: WhatsApp */}
            <article className="contact-card">
              <div className="contact-card-header">
                <span className="contact-icon contact-icon-wa" aria-hidden="true">
                  <WhatsAppIcon size={19} />
                </span>
                <span className="card-arrow-btn" aria-hidden="true">
                  <ArrowUpRight size={15} />
                </span>
              </div>
              <div className="contact-card-content">
                <h3>Start a conversation</h3>
                <p>Connect directly with our team on WhatsApp.</p>
              </div>
              <div className="contact-card-action">
                <div className="contact-phones-stack">
                  {siteContent.phones.map((phone) => (
                    <a
                      key={phone.display}
                      href={phone.href}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-action-pill wa-pill"
                    >
                      <WhatsAppIcon size={14} className="action-pill-icon" />
                      <span className="action-pill-text">{phone.display}</span>
                      <ArrowUpRight size={13} className="action-pill-arrow" />
                    </a>
                  ))}
                </div>
              </div>
            </article>

            {/* Card 3: Location */}
            <article className="contact-card">
              <div className="contact-card-header">
                <span className="contact-icon contact-icon-map" aria-hidden="true">
                  <MapPin size={19} strokeWidth={1.75} />
                </span>
                <span className="card-arrow-btn" aria-hidden="true">
                  <ArrowUpRight size={15} />
                </span>
              </div>
              <div className="contact-card-content">
                <h3>Come say hello</h3>
                <p>Find Diamondz Play and get directions on Google Maps.</p>
              </div>
              <div className="contact-card-action">
                <a
                  className="contact-action-pill map-pill"
                  href={siteContent.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin size={14} className="action-pill-icon" />
                  <span className="action-pill-text">Open Google Maps</span>
                  <ArrowUpRight size={14} className="action-pill-arrow" />
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-shell">
          {/* Top Tier: Pre-Footer Invitation Banner */}
          <div className="footer-lead-banner">
            <div className="footer-lead-text">

              <h3 className="footer-lead-headline">
                Where wonder begins. Where play comes alive.
              </h3>
              <p className="footer-lead-sub">
                Crafting memorable play experiences and imaginative spaces for kids and families.
              </p>
            </div>
            <div className="footer-lead-cta">
              <a href={siteContent.phones[0].href} target="_blank" rel="noreferrer" className="footer-primary-btn">
                <WhatsAppIcon size={16} />
                <span>Chat with our team</span>
                <ArrowUpRight size={14} className="btn-arrow" />
              </a>
              <span className="footer-quick-note">✦ Fast response on WhatsApp & Email</span>
            </div>
          </div>

          <div className="footer-divider-line" />

          {/* Main 3 Columns */}
          <div className="footer-main-grid">
            {/* Column 1: Brand Foundation */}
            <div className="footer-brand-col">
              <a href="#main" className="footer-brand-lockup" aria-label="Diamondz Play home">
                <div className="footer-logo-badge">
                  <Image src={logo} alt="Diamondz Play" sizes="76px" className="footer-logo" />
                </div>
                <div className="footer-brand-text">
                  <span className="footer-brand-name">
                    Diamondz<span> Play</span><span className="brand-period">.</span>
                  </span>
                  <p className="footer-brand-tagline">More joy. More connection. More play.</p>
                </div>
              </a>
              <p className="footer-brand-desc">
                A thoughtfully designed sanctuary of movement, curiosity, and joyful discovery for children and families.
              </p>

            </div>

            {/* Column 2: Direct Inquiries */}
            <div className="footer-nav-col">
              <p className="footer-col-title">Direct Inquiries</p>
              <ul className="footer-link-list">
                <li>
                  <a href={siteContent.email.href} className="footer-contact-link">
                    <span className="footer-link-icon-wrap"><Mail size={14} /></span>
                    <div className="footer-contact-text">
                      <span className="footer-contact-label">Email Us</span>
                      <span className="footer-contact-val">{siteContent.email.value}</span>
                    </div>
                    <ArrowUpRight size={13} className="footer-item-arrow" />
                  </a>
                </li>
                <li>
                  <a href={siteContent.mapsHref} target="_blank" rel="noreferrer" className="footer-contact-link">
                    <span className="footer-link-icon-wrap"><MapPin size={14} /></span>
                    <div className="footer-contact-text">
                      <span className="footer-contact-label">Location</span>
                      <span className="footer-contact-val">Find us on Google Maps</span>
                    </div>
                    <ArrowUpRight size={13} className="footer-item-arrow" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Community & Social */}
            <div className="footer-social-col">
              <p className="footer-col-title">Follow What’s Next</p>
              <p className="footer-social-desc">
                Follow our official accounts for sneak peeks, opening announcements, and ticket releases.
              </p>
              <div className="footer-social-cards">
                <a
                  href={siteContent.instagram.href}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-card ig-card"
                >
                  <div className="social-card-left">
                    <span className="social-card-icon-wrap"><InstagramIcon size={16} /></span>
                    <div className="social-card-info">
                      <span className="social-card-platform">Instagram</span>
                      <span className="social-card-handle">{siteContent.instagram.value}</span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="social-card-arrow" />
                </a>

                <a
                  href={siteContent.facebook.href}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-card fb-card"
                >
                  <div className="social-card-left">
                    <span className="social-card-icon-wrap"><FacebookIcon size={16} /></span>
                    <div className="social-card-info">
                      <span className="social-card-platform">Facebook</span>
                      <span className="social-card-handle">{siteContent.facebook.value}</span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="social-card-arrow" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Back to Top */}
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p>© {new Date().getFullYear()} {siteContent.company}. All rights reserved.</p>
              <span className="footer-dot-sep">•</span>
              <p className="footer-made-note">Thoughtfully designed for children & families</p>
            </div>
            <div className="footer-bottom-actions">
              <a href="#main" className="back-to-top-link" aria-label="Back to top">
                <span>Back to top</span>
                <ArrowUp size={13} className="back-arrow" />
              </a>
              <a href={siteContent.email.href} className="footer-cta-link">
                <span>Let’s make room for play</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
