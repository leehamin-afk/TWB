import { defineField, defineType } from "sanity";

/**
 * 서브 카테고리 / 시리즈 (Stripe Series, Beach Towel 등)
 */
export const series = defineType({
  name: "series",
  title: "Series",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "이름",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "주소(slug)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "상위 카테고리",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "order",
      title: "정렬 순서",
      type: "number",
      initialValue: 0,
    }),
  ],
});
