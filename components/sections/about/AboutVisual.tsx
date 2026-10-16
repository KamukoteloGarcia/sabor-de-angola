import { UtensilsCrossed } from "lucide-react";
import { Float } from "@/components/scene/Float";
import { GoldDust } from "@/components/scene/GoldDust";
import { PhotoCard3d } from "@/components/scene/PhotoCard3d";
import { RotatingBadge } from "@/components/scene/RotatingBadge";
import { Stage } from "@/components/scene/Stage";
import { about } from "@/config/about";

// Layered photos floating in 3D, drawn on a fixed 560×600 canvas and scaled per breakpoint.
export function AboutVisual() {
  return (
    <div
      role="img"
      aria-label="O chef a cozinhar com chamas, uma família à mesa e o nosso serviço de sala"
      className="relative h-[386px] w-full sm:h-[540px] lg:h-[528px] xl:h-[600px]"
    >
      <div className="absolute left-1/2 top-0 h-[600px] w-[560px] origin-top -translate-x-1/2 scale-[0.64] sm:scale-90 lg:scale-[0.88] xl:scale-100">
        <Stage>
          <div
            aria-hidden="true"
            className="absolute left-[150px] top-[30px] h-[470px] w-[360px] border border-gold/40"
            style={{ transform: "translateZ(-70px) rotateY(-10deg)" }}
          />

          <Float x={170} y={60} slow>
            <PhotoCard3d src={about.photos.main} width={340} height={440} depth={14} style={{ transform: "rotateY(-10deg)" }} />
          </Float>

          <Float x={390} y={-10} z={40} delay={-3}>
            <PhotoCard3d src={about.photos.service} width={160} height={200} depth={10} style={{ transform: "rotateY(-18deg) rotateZ(4deg)" }} />
          </Float>

          <Float x={10} y={350} z={110} delay={-1.5}>
            <PhotoCard3d
              src={about.photos.table}
              width={270}
              height={210}
              depth={12}
              title="À mesa, em família"
              detail="Desde 1987"
              style={{ transform: "rotateY(14deg) rotateZ(-3deg)" }}
            />
          </Float>

          <Float x={30} y={60} z={150} delay={-4}>
            <RotatingBadge text="• Desde 2014 • Marginal de Luanda " size={128}>
              <UtensilsCrossed className="size-8" strokeWidth={1.4} />
            </RotatingBadge>
          </Float>

          <GoldDust />
        </Stage>
      </div>
    </div>
  );
}
