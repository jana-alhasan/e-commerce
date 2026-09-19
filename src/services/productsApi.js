import axios from 'axios';


export const fetchProductsByCategory = async (category, currentPage, productsPerPage, sortBy) => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`,
      {
        params: {
          limit: productsPerPage * currentPage,
          sort: sortBy,
        },
      }
    );
    const data = response.data;
    if (
      data &&
      data?.length > 0 &&
      Array.isArray(data)
    ) {
      return data;
    } else {
      console.error("Invalid data format:", data);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};




