import Image from "next/image";
import Link from "next/link";
import { image } from "@/lib/image";
import { Reveal } from "@/components/ui/Reveal";

const ugcPhotos = [
  { key: "lifestyle/life-06.jpg", alt: "Real women wearing Piura Swim at golden hour", offset: "" },
  { key: "lifestyle/life-13.jpg", alt: "Real women wearing Piura Swim at golden hour", offset: "ugc-offset-down" },
  { key: "lifestyle/life-42.jpg", alt: "Real women wearing Piura Swim at golden hour", offset: "" },
  { key: "lifestyle/life-52.jpg", alt: "Real women wearing Piura Swim at golden hour", offset: "ugc-offset-down" },
  { key: "lifestyle/life-56.jpg", alt: "Real women wearing Piura Swim at golden hour", offset: "" },
] as const;

export function RealWomen() {
  return (
    <section className="section real-women-section" aria-labelledby="real-women-title">
      <div className="container">
        <Reveal className="real-women-header">
          <p className="label text-ember">Worn by real women</p>
          <blockquote id="real-women-title" className="font-display real-women-quote">
            “I’ve never felt <em>this good</em> in a bikini.”
          </blockquote>
          <p className="label real-women-sublabel">The sentence we hear most</p>
        </Reveal>

        <div className="ugc-mosaic-grid">
          {ugcPhotos.map((photo, index) => {
            const asset = image(photo.key);
            return (
              <Reveal key={photo.key} delay={index * 80} className={photo.offset}>
                <div className="ugc-frame">
                  <Image
                    src={asset.src}
                    alt={photo.alt}
                    width={asset.width}
                    height={asset.height}
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="ugc-image"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="ugc-footer-note" delay={200}>
          <p>
            Golden hour, candid, never over-edited. Tag{" "}
            <Link
              href="https://www.instagram.com/piuraswim"
              target="_blank"
              rel="noopener noreferrer"
              className="ugc-instagram-link"
            >
              @piuraswim
            </Link>{" "}
            to be featured.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
