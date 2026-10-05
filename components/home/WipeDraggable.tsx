"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type WipeDraggableProps = {
  children: ReactNode | ((ctx: { isDragging: boolean }) => ReactNode);
  className?: string;
  /** 부모(relative) 기준 초기 위치 */
  initial: { left: number; bottom: number };
  wipeRadius: number;
  onWipe: (x: number, y: number, radius: number) => void;
  ariaLabel: string;
};

type Pos =
  | { left: number; bottom: number; top?: undefined }
  | { left: number; top: number; bottom?: undefined };

/**
 * 부모 박스 안에서 드래그하며 김서림을 지우는 도구입니다.
 */
export default function WipeDraggable({
  children,
  className = "",
  initial,
  wipeRadius,
  onWipe,
  ariaLabel,
}: WipeDraggableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const grab = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState<Pos>({
    left: initial.left,
    bottom: initial.bottom,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPos({ left: initial.left, bottom: initial.bottom });
    setReady(true);
  }, [initial.bottom, initial.left]);

  const wipeFromElement = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    onWipe(rect.left + rect.width / 2, rect.top + rect.height / 2, wipeRadius);
  }, [onWipe, wipeRadius]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const parent = ref.current?.offsetParent as HTMLElement | null;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const elRect = event.currentTarget.getBoundingClientRect();

    dragging.current = true;
    setIsDragging(true);
    grab.current = {
      x: event.clientX - elRect.left,
      y: event.clientY - elRect.top,
    };

    setPos({
      left: elRect.left - parentRect.left,
      top: elRect.top - parentRect.top,
    });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const parent = ref.current?.offsetParent as HTMLElement | null;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const left = event.clientX - parentRect.left - grab.current.x;
    const top = event.clientY - parentRect.top - grab.current.y;

    setPos({ left, top });
    onWipe(event.clientX, event.clientY, wipeRadius);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);

    const parent = ref.current?.offsetParent as HTMLElement | null;
    const el = event.currentTarget;
    if (parent && pos.top !== undefined) {
      const bottom = parent.clientHeight - pos.top - el.offsetHeight;
      setPos({ left: pos.left, bottom: Math.max(0, bottom) });
    }

    el.releasePointerCapture(event.pointerId);
    wipeFromElement();
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      className={`wipe-tool absolute z-30 ${isDragging ? "is-dragging" : ""} ${className}`.trim()}
      style={{
        left: pos.left,
        ...(pos.bottom !== undefined
          ? { bottom: pos.bottom, top: "auto" }
          : { top: pos.top, bottom: "auto" }),
        visibility: ready ? "visible" : "hidden",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {typeof children === "function" ? children({ isDragging }) : children}
    </div>
  );
}
