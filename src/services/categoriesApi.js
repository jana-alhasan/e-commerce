import axios from "axios";

const PRODUCTS_API = "https://dummyjson.com/products";

export const fetchCategories = async () => {
  const response = await axios.get(`${PRODUCTS_API}/category-list`);
  return Array.isArray(response.data) ? response.data : [];
};

export const fetchCategoryItemCounts = async (categories) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return [];
  }

  const response = await axios.get(PRODUCTS_API, {
    params: {
      limit: 0,
      select: "category",
    },
  });

  const products = Array.isArray(response.data?.products)
    ? response.data.products
    : [];
  const countsByCategory = products.reduce((counts, product) => {
    const category = product?.category;
    if (category) {
      counts[category] = (counts[category] || 0) + 1;
    }
    return counts;
  }, {});

  return categories.map((category) => countsByCategory[category] || 0);
};
