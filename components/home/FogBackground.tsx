"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { homeContent } from "@/data/home";

export type FogBackgroundHandle = {
  wipeAt: (x: number, y: number, radius: number) => void;
};

type FogBackgroundProps = {
  className?: string;
};

/**
 * 루프 영상(원본) + 김서림 캔버스
 * wipeAt()으로 포그만 지워 영상이 선명히 보입니다.
 */
const FogBackground = forwardRef<FogBackgroundHandle, FogBackgroundProps>(
  function FogBackground({ className = "" }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasVideo, setHasVideo] = useState(true);

    const paintFog = useCallback(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, rect.width, rect.height);

      // 1) 균일 김서림 막 (상단 그라데이션 페이드 없음 — 꽉 채움)
      ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // 2) 옅은 서리 얼룩 (큰 블롭)
      const blotches = Math.floor((rect.width * rect.height) / 18000);
      for (let i = 0; i < blotches; i += 1) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const r = 40 + Math.random() * 120;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, "rgba(255, 255, 255, 0.55)");
        g.addColorStop(0.55, "rgba(240, 245, 255, 0.22)");
        g.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3) 미세 습기 입자
      const mist = Math.floor((rect.width * rect.height) / 700);
      for (let i = 0; i < mist; i += 1) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const r = Math.random() * 2.4 + 0.3;
        const a = 0.15 + Math.random() * 0.35;
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4) 물방울 질감 (작은 하이라이트)
      const drops = Math.floor((rect.width * rect.height) / 12000);
      for (let i = 0; i < drops; i += 1) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const r = 1.2 + Math.random() * 3.5;
        const drop = ctx.createRadialGradient(
          x - r * 0.25,
          y - r * 0.3,
          0,
          x,
          y,
          r,
        );
        drop.addColorStop(0, "rgba(255, 255, 255, 0.85)");
        drop.addColorStop(0.45, "rgba(220, 230, 240, 0.35)");
        drop.addColorStop(1, "rgba(200, 210, 220, 0)");
        ctx.fillStyle = drop;
        ctx.beginPath();
        ctx.ellipse(x, y, r * 0.75, r, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5) 전체 한 번 더 덮어 농도 강화 (균일)
      ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
      ctx.fillRect(0, 0, rect.width, rect.height);
    }, []);

    const wipeAt = useCallback((x: number, y: number, radius: number) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const localX = x - rect.left;
      const localY = y - rect.top;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "destination-out";

      const gradient = ctx.createRadialGradient(
        localX,
        localY,
        radius * 0.12,
        localX,
        localY,
        radius,
      );
      gradient.addColorStop(0, "rgba(0,0,0,0.96)");
      gradient.addColorStop(0.5, "rgba(0,0,0,0.5)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(localX, localY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    }, []);

    useImperativeHandle(ref, () => ({ wipeAt }), [wipeAt]);

    useEffect(() => {
      paintFog();
      const onResize = () => paintFog();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, [paintFog]);

    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`.trim()}
      >
        {hasVideo ? (
          <video
            className="fog-video absolute inset-0 h-full w-full object-cover object-[center_65%]"
            src={homeContent.video.src}
            poster={homeContent.video.poster}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setHasVideo(false)}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={homeContent.video.poster}
            alt=""
            className="fog-video absolute inset-0 h-full w-full object-cover object-[center_65%]"
          />
        )}

        <canvas ref={canvasRef} className="fog-canvas absolute inset-0 z-[1]" />
      </div>
    );
  },
);

export default FogBackground;
