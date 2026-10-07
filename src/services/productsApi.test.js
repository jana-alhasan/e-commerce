import { normalizeProduct, normalizeProducts } from "./productsApi";

describe("product API normalization", () => {
  test("maps DummyJSON product fields to the app product shape", () => {
    expect(
      normalizeProduct({
        id: 7,
        title: "Sample product",
        price: 19.5,
        category: "beauty",
        description: "Sample description",
        thumbnail: "https://example.com/thumb.jpg",
        rating: 4.6,
        reviews: [{}, {}, {}],
      })
    ).toEqual({
      id: 7,
      title: "Sample product",
      price: 19.5,
      category: "beauty",
      description: "Sample description",
      image: "https://example.com/thumb.jpg",
      rating: {
        rate: 4.6,
        count: 3,
      },
    });
  });

  test("keeps compatibility with the original product rating shape", () => {
    expect(
      normalizeProduct({
        id: 1,
        image: "https://example.com/original.jpg",
        rating: { rate: 3.8, count: 12 },
      })
    ).toMatchObject({
      id: 1,
      image: "https://example.com/original.jpg",
      rating: { rate: 3.8, count: 12 },
    });
  });

  test("returns an empty list for invalid product collections", () => {
    expect(normalizeProducts(null)).toEqual([]);
    expect(normalizeProducts({ products: [] })).toEqual([]);
  });
});
