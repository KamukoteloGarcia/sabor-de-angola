import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { logoGradientStops, logoPaths } from "@/components/brand/logo-paths";
import { site } from "@/config/site";

// Link preview image shown when the site is shared (WhatsApp, Facebook, LinkedIn, X…).
export const alt = `${site.name} — ${site.tagline}. ${site.slogan}`;
export const size = { width: 1200, height: 630 };
// JPEG keeps the file small (WhatsApp skips preview images that are too heavy).
export const contentType = "image/jpeg";

const asset = (path: string) => readFile(join(process.cwd(), "assets", path));

// Read at module level, so the image is generated once at build time and cached.
const [cormorant, greatVibes, jost, photo] = await Promise.all([
  asset("fonts/CormorantGaramond-SemiBold.ttf"),
  asset("fonts/GreatVibes-Regular.ttf"),
  asset("fonts/Jost-Medium.ttf"),
  asset("og/calulu.jpg"),
]);

const gold = "#deb36d";
const goldBright = "#f6d798";

// The emblem, drawn with the same shapes as the site logo.
function Emblem({ size: s }: { size: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="gold" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          {logoGradientStops.map((stop) => (
            <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#gold)" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="26.5" fill="none" stroke="url(#gold)" strokeWidth="0.6" strokeOpacity="0.55" />
      <path d={logoPaths.hornLeft} fill="url(#gold)" />
      <path d={logoPaths.hornRight} fill="url(#gold)" />
      <path d={logoPaths.diamond} fill="url(#gold)" />
      <path d={logoPaths.bowlRim} stroke="url(#gold)" strokeWidth="1.8" strokeLinecap="round" />
      <path d={logoPaths.bowl} fill="none" stroke="url(#gold)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default async function Image() {
  return new Response(await renderJpeg(), { headers: { "Content-Type": contentType } });
}

// Cached, so the image is rendered once at build time (the JPEG conversion would otherwise run per request).
async function renderJpeg() {
  "use cache";
  cacheLife("max");

  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const [firstLine, secondLine] = site.slogan.split(". ").map((line, i, all) => (i < all.length - 1 ? `${line}.` : line));

  const png = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "radial-gradient(circle at 78% 50%, #3a2716 0%, #17110d 58%)",
          color: "#fcf4e8",
          fontFamily: "Jost",
        }}
      >
        {/* Dish in a gold ring, bleeding off the right edge */}
        <div
          style={{
            position: "absolute",
            right: -70,
            top: 45,
            width: 540,
            height: 540,
            borderRadius: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(circle, rgba(246,215,152,0.35), rgba(23,17,13,0) 70%)",
          }}
        >
          <div
            style={{
              width: 470,
              height: 470,
              borderRadius: 9999,
              border: `3px solid ${gold}`,
              padding: 14,
              display: "flex",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* ImageResponse renders plain <img> only (next/image does not apply here). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoSrc} width={436} height={436} style={{ borderRadius: 9999, objectFit: "cover" }} alt="" />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Emblem size={78} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "Cormorant", fontSize: 38, letterSpacing: 5, textTransform: "uppercase", lineHeight: 1 }}>{site.name}</span>
              <span style={{ fontSize: 15, letterSpacing: 7, textTransform: "uppercase", color: gold, marginTop: 8 }}>{site.tagline}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "Cormorant", fontSize: 92, lineHeight: 1 }}>{firstLine}</span>
            <span style={{ fontFamily: "Cormorant", fontSize: 92, lineHeight: 1.05, color: goldBright }}>{secondLine}</span>
            <span style={{ fontFamily: "Great Vibes", fontSize: 54, color: gold, marginTop: 6 }}>feito para partilhar</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 21, color: "#d6c7b2" }}>
            <span style={{ width: 40, height: 2, background: gold }} />
            <span>
              {site.address.city} · Reservas {site.phone.label}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: cormorant, style: "normal", weight: 600 },
        { name: "Great Vibes", data: greatVibes, style: "normal", weight: 400 },
        { name: "Jost", data: jost, style: "normal", weight: 500 },
      ],
    },
  );

  const jpeg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Uint8Array(jpeg);
}
