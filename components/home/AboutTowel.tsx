import Image from "next/image";
import { homeContent } from "@/data/home";

/**
 * 파란 TWB 수건 이미지 위에 철학 문구를 올린 블록입니다.
 * Figma: Noto Sans KR Regular 20px / 줄간격 170% / 흰색 글자
 */
export default function AboutTowel() {
  const { aboutTowel } = homeContent;

  return (
    <div className="relative w-[559px] max-w-[40vw] aspect-[1024/486] overflow-hidden bg-transparent">
      <Image
        src={aboutTowel.src}
        alt={aboutTowel.alt}
        fill
        sizes="559px"
        className="pointer-events-none object-contain"
        priority
        draggable={false}
      />

      <p className="pointer-events-none absolute inset-x-[8%] inset-y-[12%] z-10 overflow-hidden font-ko text-body-lg font-normal leading-body-lg text-on-accent">
        {aboutTowel.text}
      </p>
    </div>
  );
}
