import axios from "axios";

const PRODUCTS_API = "https://dummyjson.com/products";

export const normalizeProduct = (product = {}) => {
  const rawRating =
    typeof product.rating === "object" ? product.rating?.rate : product.rating;
  const rawCount =
    typeof product.rating === "object"
      ? product.rating?.count
      : Array.isArray(product.reviews)
      ? product.reviews.length
      : 0;

  return {
    id: product.id,
    title: product.title || "",
    price: Number(product.price) || 0,
    category: product.category || "",
    description: product.description || "",
    image: product.thumbnail || product.image || product.images?.[0] || "",
    rating: {
      rate: Number(rawRating) || 0,
      count: Number(rawCount) || 0,
    },
  };
};

export const normalizeProducts = (products) =>
  Array.isArray(products) ? products.map(normalizeProduct) : [];

const buildListParams = ({ currentPage = 1, productsPerPage = 5, sortBy }) => ({
  limit: Math.max(Number(currentPage) * Number(productsPerPage), Number(productsPerPage)),
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
