"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { homeContent } from "@/data/home";

type AboutTowelProps = {
  /** 드래그 중이면 튕김 모션 중지 */
  isDragging?: boolean;
};

/**
 * 파란 TWB 수건 + 철학 문구
 * - 3초마다 / 호버 시 상하 5px 두 번 튕김
 * - 드래그 중에는 모션 없음
 * - 배경 투명 유지
 */
export default function AboutTowel({ isDragging = false }: AboutTowelProps) {
  const { aboutTowel } = homeContent;
  const bounceRef = useRef<HTMLDivElement>(null);

  const triggerBounce = useCallback(() => {
    if (isDragging) return;
    const el = bounceRef.current;
    if (!el) return;
    el.classList.remove("is-bouncing");
    // 리플로우 후 애니메이션 재시작
    void el.offsetWidth;
    el.classList.add("is-bouncing");
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      bounceRef.current?.classList.remove("is-bouncing");
      return;
    }
    const id = window.setInterval(triggerBounce, 3000);
    return () => window.clearInterval(id);
  }, [isDragging, triggerBounce]);

  return (
    <div
      ref={bounceRef}
      className="about-towel-bounce relative h-full w-full bg-transparent"
      onMouseEnter={triggerBounce}
      onAnimationEnd={(event) => {
        if (event.target === bounceRef.current) {
          bounceRef.current?.classList.remove("is-bouncing");
        }
      }}
    >
      <div className="relative h-full w-full overflow-hidden bg-transparent">
        <Image
          src={aboutTowel.src}
          alt={aboutTowel.alt}
          fill
          sizes="559px"
          className="pointer-events-none bg-transparent object-contain"
          priority
          draggable={false}
          unoptimized
        />

        <p className="about-towel-text pointer-events-none absolute inset-x-[8%] inset-y-[12%] z-10 overflow-hidden font-ko text-body-lg font-normal leading-body-lg text-on-accent">
          {aboutTowel.text}
        </p>
      </div>
    </div>
  );
}
