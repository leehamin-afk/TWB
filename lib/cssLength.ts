/**
 * CSS 길이(예: "20pt")를 화면 픽셀로 바꿉니다.
 * 드래그 초기 위치 계산에 사용합니다.
 */
export function cssLengthToPx(value: string): number {
  if (typeof document === "undefined") return 0;

  const el = document.createElement("div");
  el.style.position = "absolute";
  el.style.visibility = "hidden";
  el.style.pointerEvents = "none";
  el.style.width = value;
  document.body.appendChild(el);
  const px = el.getBoundingClientRect().width;
  document.body.removeChild(el);
  return px;
}

/** globals.css 토큰 값을 읽어 px로 반환 */
export function tokenToPx(tokenName: string): number {
  if (typeof document === "undefined") return 0;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(tokenName)
    .trim();
  return raw ? cssLengthToPx(raw) : 0;
}
