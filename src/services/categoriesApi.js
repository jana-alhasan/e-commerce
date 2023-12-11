import axios from "axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products/categories");
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
  }
  catch (error) {
    console.error('Error fetching categories from API:', error.message);
    throw error;
  }
};

export const fetchCategoryItemCounts = async (categories) => {
  try {
    const itemCountPromises = categories.map(async (category) => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        const data = response.data;
        if (
          data &&
          data?.length > 0 &&
          Array.isArray(data)
        ) {
          return data.length;
        }
        else {
          console.error("Invalid data format:", data);
          return [];
        }
      }
      catch (error) {
        console.error(`Error fetching item count for category ${category}:`, error);
        return 0;
      }
    });

    return Promise.all(itemCountPromises);
  } catch (error) {
    console.error("Error fetching category item counts:", error);
    throw error;
  }
};