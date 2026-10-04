import { defineField, defineType } from "sanity";

/**
 * 상품 스키마 — Sanity Studio > Product
 */
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "이름",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "주소(slug)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "가격 (KRW)",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "color",
      title: "컬러",
      type: "string",
    }),
    defineField({
      name: "details",
      title: "상세 설명",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "care",
      title: "케어 안내",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "size",
      title: "사이즈",
      type: "string",
    }),
    defineField({
      name: "material",
      title: "소재",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "대표 이미지 (목록용)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "상세 갤러리 이미지",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "category",
      title: "카테고리",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "series",
      title: "시리즈",
      type: "reference",
      to: [{ type: "series" }],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "color",
      media: "image",
    },
  },
});
