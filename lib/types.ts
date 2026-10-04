/**
 * 사이트에서 쓰는 데이터 모양(타입)
 * 로컬 data/ 와 Sanity 결과를 같은 형태로 맞춥니다.
 */

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  color?: string;
  care?: string;
  image: string;
  gallery?: string[];
  size?: string;
  material?: string;
  category?: string;
  series?: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type CategoryItem = NavItem & {
  id: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  subItems?: NavItem[];
};
