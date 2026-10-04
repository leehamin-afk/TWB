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
 * 루프 영상 + 김서림 레이어입니다.
 * wipeAt()으로 특정 좌표의 김을 지워 영상이 선명히 보이게 합니다.
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

      // 김서린 유리: 밝은 막 + 약한 그라데이션
      const wash = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      wash.addColorStop(0, "rgba(255, 255, 255, 0.78)");
      wash.addColorStop(0.45, "rgba(245, 248, 255, 0.7)");
      wash.addColorStop(1, "rgba(255, 255, 255, 0.82)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // 습기 질감(노이즈)
      const dots = Math.floor((rect.width * rect.height) / 1400);
      for (let i = 0; i < dots; i += 1) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const r = Math.random() * 2.2 + 0.3;
        const a = 0.08 + Math.random() * 0.22;
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
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
        radius * 0.15,
        localX,
        localY,
        radius,
      );
      gradient.addColorStop(0, "rgba(0,0,0,0.95)");
      gradient.addColorStop(0.55, "rgba(0,0,0,0.55)");
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
            className="absolute inset-0 h-full w-full object-cover object-[center_65%]"
            src={homeContent.video.src}
            poster={homeContent.video.poster}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setHasVideo(false)}
          />
        ) : (
          // 영상이 아직 없을 때 임시 배경
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={homeContent.video.poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_65%]"
          />
        )}

        {/*
          김서림은 캔버스 한 장으로만 그립니다.
          이 레이어가 지워져야 아래 영상이 선명하게 보여야 합니다.
        */}
        <canvas ref={canvasRef} className="fog-canvas absolute inset-0 z-[1]" />
      </div>
    );
  },
);

export default FogBackground;
