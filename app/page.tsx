// Server Component — no "use client" needed, all animations are pure CSS

const LINKS = [
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@glassthanaphon",
    href: "https://www.tiktok.com/@glassthanaphon",
    sweepDelay: "0s",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@glassthanaphon",
    href: "https://www.instagram.com/glassthanaphon",
    sweepDelay: "1.8s",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@glassthanaphon",
    href: "https://www.youtube.com/@glassthanaphon",
    sweepDelay: "3.6s",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
];

const SOCIAL_ICONS = [
  {
    id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@glassthanaphon",
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="rgba(255,255,255,0.75)"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>,
  },
  {
    id: "instagram", label: "Instagram", href: "https://www.instagram.com/glassthanaphon",
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="rgba(255,255,255,0.75)"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>,
  },
  {
    id: "youtube", label: "YouTube", href: "https://www.youtube.com/@glassthanaphon",
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="rgba(255,255,255,0.75)"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>,
  },
  {
    id: "facebook", label: "Facebook", href: "https://www.facebook.com/glassthanaphon",
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="rgba(255,255,255,0.75)"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
];

// Chevron SVG shared by all link buttons
const Chevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="rgba(255,255,255,0.25)" strokeWidth="2.5"
       strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default function Home() {
  return (
    <main className="relative min-h-dvh flex items-center justify-center px-5 py-14">

      {/* ── Animated mesh background ── */}
      <div className="fixed inset-0 bg-[#03091a] overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      {/* ── Page content ── */}
      <div className="relative w-full max-w-[390px] mx-auto flex flex-col gap-4" style={{ zIndex: 1 }}>

        {/* ════ PROFILE ════ */}
        <section className="fade-up text-center flex flex-col items-center gap-4" style={{ animationDelay: "0.08s" }}>

          {/* Avatar */}
          <div className="relative">
            <div className="avatar-wrap glass p-[3px] rounded-full">
              {/*
                Replace this src with your actual photo.
                Tip: upload a 400×400px square photo to /public/photo.jpg
                then change src to "/photo.jpg"
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ui-avatars.com/api/?name=G&background=312e81&color=c7d2fe&size=400&bold=true&font-size=0.55&length=1"
                alt="Glass Thanaphon Susiwa"
                width={112} height={112}
                className="rounded-full object-cover block"
                style={{ width: 112, height: 112 }}
              />
            </div>
            {/* Verified badge */}
            <div
              className="badge-pulse glass absolute flex items-center justify-center"
              style={{ bottom: -2, right: -2, width: 26, height: 26, borderRadius: 9999 }}
              title="Verified"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                   stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          {/* Name + role */}
          <div>
            <h1
              className="text-[22px] font-bold text-white tracking-tight leading-tight"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
            >
              Glass Thanaphon Susiwa
            </h1>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase mt-1"
               style={{ color: "rgba(255,255,255,0.4)" }}>
              Content Creator
            </p>
          </div>

          {/* Stat chips */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {["อายุ 34", "173 cm", "84 kg"].map((chip) => (
              <span key={chip} className="glass px-3 py-1 rounded-full text-[11px] font-medium"
                    style={{ color: "rgba(255,255,255,0.65)" }}>
                {chip}
              </span>
            ))}
          </div>
        </section>

        {/* ════ PRIMARY LINKS ════ */}
        <section className="fade-up flex flex-col gap-3" style={{ animationDelay: "0.2s" }}>
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank" rel="noopener noreferrer"
              className="link-btn btn-sweep glass rounded-2xl flex items-center gap-4"
              style={{
                padding: "14px 20px",
                // @ts-expect-error CSS custom property
                "--sweep-delay": link.sweepDelay,
              }}
              aria-label={`${link.label} ${link.handle}`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                   style={{ background: "rgba(255,255,255,0.09)" }}>
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold leading-tight" style={{ fontSize: 15 }}>
                  {link.label}
                </div>
                <div className="text-xs font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {link.handle}
                </div>
              </div>
              <Chevron />
            </a>
          ))}
        </section>

        {/* ════ SOCIAL ICON ROW ════ */}
        <section className="fade-up reflect-wrap" style={{ animationDelay: "0.35s" }}>
          <div className="glass rounded-2xl px-5 py-4">
            <p className="text-center font-semibold tracking-[0.25em] uppercase mb-3.5"
               style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>
              Connect
            </p>
            <div className="flex items-center justify-center gap-3">
              {SOCIAL_ICONS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  className="icon-btn glass flex items-center justify-center"
                  style={{ width: 48, height: 48, borderRadius: 14 }}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ════ FOOTER ════ */}
        <footer className="fade-up text-center pt-1 pb-2" style={{ animationDelay: "0.45s" }}>
          <p className="text-[10px] font-medium tracking-widest select-none"
             style={{ color: "rgba(255,255,255,0.18)" }}>
            © 2026 Glass Thanaphon Susiwa
          </p>
        </footer>

      </div>
    </main>
  );
}
