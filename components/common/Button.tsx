import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

/**
 * 여러 페이지에서 재사용할 버튼입니다.
 * 지금은 기본 형태만 준비해 두었고, Figma 스타일은 이후 작업에서 맞춥니다.
 */
export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
}
