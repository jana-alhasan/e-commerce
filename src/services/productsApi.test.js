import { normalizeProduct, normalizeProducts } from "./productsApi";

describe("product API normalization", () => {
  test("maps DummyJSON product fields to the app product shape", () => {
    const product = normalizeProduct({
      id: 7,
      title: "Sample product",
      price: 19.5,
      category: "beauty",
      description: "Sample description",
      thumbnail: "https://example.com/thumb.jpg",
      images: ["https://example.com/one.jpg", "https://example.com/two.jpg"],
      rating: 4.6,
      reviews: [
        { rating: 5, comment: "Great", reviewerName: "Reviewer" },
        {},
        {},
      ],
      brand: "Sample brand",
      sku: "SKU-7",
      stock: 8,
      availabilityStatus: "In Stock",
      shippingInformation: "Ships in 3 days",
      returnPolicy: "30 days return policy",
      warrantyInformation: "1 year warranty",
    });

    expect(product).toMatchObject({
      id: 7,
      title: "Sample product",
      price: 19.5,
      category: "beauty",
      description: "Sample description",
      image: "https://example.com/thumb.jpg",
      images: ["https://example.com/one.jpg", "https://example.com/two.jpg"],
      brand: "Sample brand",
      sku: "SKU-7",
      stock: 8,
      availabilityStatus: "In Stock",
      shippingInformation: "Ships in 3 days",
      returnPolicy: "30 days return policy",
      warrantyInformation: "1 year warranty",
      rating: {
        rate: 4.6,
        count: 3,
      },
    });
    expect(product.reviews[0]).toEqual({
      rating: 5,
      comment: "Great",
      reviewerName: "Reviewer",
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
      images: ["https://example.com/original.jpg"],
      rating: { rate: 3.8, count: 12 },
    });
  });

  test("returns an empty list for invalid product collections", () => {
    expect(normalizeProducts(null)).toEqual([]);
    expect(normalizeProducts({ products: [] })).toEqual([]);
  });
});
