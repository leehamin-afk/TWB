export const productsQuery = `*[_type == "product"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  price,
  color,
  details,
  care,
  size,
  material,
  weight,
  image,
  gallery,
  "category": category->slug.current,
  "series": series->slug.current
}`;

/** 시리즈 일치 상품 + (같은 카테고리인데 시리즈 미지정인 상품) */
export const productsBySeriesQuery = `*[
  _type == "product" && (
    series->slug.current == $series ||
    (
      $category != null &&
      !defined(series) &&
      category->slug.current == $category
    )
  )
] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  price,
  color,
  details,
  care,
  size,
  material,
  weight,
  image,
  gallery,
  "category": category->slug.current,
  "series": series->slug.current
}`;

export const productsByCategoryQuery = `*[_type == "product" && category->slug.current == $category] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  price,
  color,
  details,
  care,
  size,
  material,
  weight,
  image,
  gallery,
  "category": category->slug.current,
  "series": series->slug.current
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  price,
  color,
  details,
  care,
  size,
  material,
  weight,
  image,
  gallery,
  "category": category->slug.current,
  "series": series->slug.current
}`;

export const categoriesQuery = `*[_type == "category"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  order
}`;

export const seriesByCategoryQuery = `*[_type == "series" && category->slug.current == $category] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  order
}`;
