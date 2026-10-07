import axios from "axios";

const PRODUCTS_API = "https://dummyjson.com/products";

const normalizeReview = (review = {}) => ({
  rating: Number(review.rating) || 0,
  comment: review.comment || "",
  reviewerName: review.reviewerName || "Anonymous reviewer",
});

export const normalizeProduct = (product = {}) => {
  const rawRating =
    typeof product.rating === "object" ? product.rating?.rate : product.rating;
  const rawCount =
    typeof product.rating === "object"
      ? product.rating?.count
      : Array.isArray(product.reviews)
      ? product.reviews.length
      : 0;
  const images = Array.isArray(product.images)
    ? product.images.filter(Boolean)
    : [];
  const primaryImage =
    product.thumbnail || product.image || images[0] || "";

  return {
    id: product.id,
    title: product.title || "",
    price: Number(product.price) || 0,
    category: product.category || "",
    description: product.description || "",
    image: primaryImage,
    images: images.length > 0 ? images : primaryImage ? [primaryImage] : [],
    brand: product.brand || "",
    sku: product.sku || "",
    stock: Number.isFinite(Number(product.stock)) ? Number(product.stock) : null,
    availabilityStatus: product.availabilityStatus || "",
    shippingInformation: product.shippingInformation || "",
    returnPolicy: product.returnPolicy || "",
    warrantyInformation: product.warrantyInformation || "",
    minimumOrderQuantity: Number(product.minimumOrderQuantity) || 1,
    reviews: Array.isArray(product.reviews)
      ? product.reviews.map(normalizeReview)
      : [],
    rating: {
      rate: Number(rawRating) || 0,
      count: Number(rawCount) || 0,
    },
  };
};

export const normalizeProducts = (products) =>
  Array.isArray(products) ? products.map(normalizeProduct) : [];

const buildListParams = ({ currentPage = 1, productsPerPage = 5, sortBy }) => ({
  limit: Math.max(
    Number(currentPage) * Number(productsPerPage),
    Number(productsPerPage)
  ),
  ...(sortBy ? { sortBy: "id", order: sortBy } : {}),
});

export const fetchProducts = async ({
  currentPage = 1,
  productsPerPage = 5,
  sortBy,
} = {}) => {
  const response = await axios.get(PRODUCTS_API, {
    params: buildListParams({ currentPage, productsPerPage, sortBy }),
  });

  return normalizeProducts(response.data?.products);
};

export const fetchProductsByCategory = async (
  category,
  currentPage = 1,
  productsPerPage = 5,
  sortBy
) => {
  if (!category) {
    return [];
  }

  const response = await axios.get(
    `${PRODUCTS_API}/category/${encodeURIComponent(category)}`,
    {
      params: buildListParams({ currentPage, productsPerPage, sortBy }),
    }
  );

  return normalizeProducts(response.data?.products);
};
