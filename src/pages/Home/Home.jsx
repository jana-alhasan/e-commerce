import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Typography, Pagination, List, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  fetchProductsByCategory,
  fetchAllProducts,
} from "../../services/productsApi";
import {
  fetchCategories,
  fetchCategoryItemCounts,
} from "../../services/categoriesApi";
import { validationSchema } from "../../utils/validation/validationSchema";
import { setProducts, setProductLoading } from "../../redux/productSlice";
import Title from "../../components/home/Title";
import Sort from "../../components/home/filters/sort/Sort";
import Categories from "../../components/home/filters/categories/Categories";
import Brands from "../../components/home/filters/brands/Brands";
import Rating from "../../components/home/filters/rating/RatingFilter";
import Price from "../../components/home/filters/price/Price";
import ProductCard from "../../components/home/productCard/ProductCard";
import AppliedFilters from "../../components/home/AppliedFilters/AppliedFilters";
import ProductCardSkeleton from "../../components/skeleton/ProductCardSkeleton";
import CategoriesSkeleton from "../../components/skeleton/CategoriesSkeleton";

function HomePage() {
  const [isGridview, setGridView] = useState(false);
  const products = useSelector((state) => state.products.products);
  const productLoading = useSelector((state) => state.products.productLoading);
  const [dataLength, setDataLength] = useState(1);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryCount, setCategoryCount] = useState([0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [appliedPriceRange, setAppliedPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const productsPerPage = 5;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const dispatch = useDispatch();

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleReset = () => {
    setAppliedPriceRange(null);
    reset({
      minPrice: 0,
      maxPrice: 0,
    });
    setSelectedRating(null);
    setSelectedCategories([]);
    setSortBy(null);
  };

  const isAnyFilterApplied =
    selectedCategories.length > 0 ||
    sortBy ||
    appliedPriceRange?.minPrice > 0 ||
    appliedPriceRange?.maxPrice > 0 ||
    selectedRating;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductLoading(true);
        const totalProducts = await fetchAllProducts(
          currentPage,
          productsPerPage
        );
        dispatch(setProducts(totalProducts));
        dispatch(setProductLoading(false));
        setDataLength(totalProducts.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setProductLoading(false);
      }
    };

    fetchData();
  }, [currentPage, productsPerPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductLoading(true);
        const totalProducts = await fetchAllProducts();
        dispatch(setProductLoading(false));
        setDataLength(totalProducts.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setProductLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategoriesLoading(true);
        const response = await fetchCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchCategoryItemCounts(categories)
      .then((itemCounts) => {
        setCategoryCount(itemCounts);
      })
      .catch((error) => {
        console.error("Error fetching category item counts:", error);
      });
  }, [categories]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleRatingChange = (newRating) => {
    setSelectedRating(newRating);
  };

  const handleSortCancel = () => {
    setSortBy(null);
  };

  const applyFilters = async (formData) => {
  
    try {
      const { minPrice, maxPrice } = formData;
      console.log("Form Data:", formData);

      let filteredProducts;

      if (selectedCategories.length > 0) {
        const promises = selectedCategories.map(async (category) => {
          try {
            return await fetchProductsByCategory(
              category,
              currentPage,
              productsPerPage,
              sortBy
            );
          } catch (error) {
            console.error(
              `Error fetching products for category ${category}:`,
              error
            );
            throw error;
          }
        });

        const categoryProducts = await Promise.all(promises);
        filteredProducts = categoryProducts.flat();
      } else {
        console.log("No selected categories, applying sorting only.");
        filteredProducts = await fetchAllProducts(
          currentPage,
          productsPerPage,
          sortBy
        );
      }

      const filteredByPrice = filteredProducts.filter(
        (product) =>
          (!minPrice || product.price >= minPrice) &&
          (!maxPrice || product.price <= maxPrice)
      );

      const filteredByRating = selectedRating
        ? filteredByPrice.filter(
            (product) =>
              Math.floor(product.rating.rate) === Math.floor(selectedRating)
          )
        : filteredByPrice;

      setFilteredProducts(filteredByRating);
      setAppliedPriceRange({
        minPrice: formData.minPrice,
        maxPrice: formData.maxPrice,
      });
    } catch (error) {
      console.error("Error in applyFilters:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const handleCancelCategory = (category) => {
    const updatedCategories = selectedCategories.filter(
      (selectedCategory) => selectedCategory !== category
    );

    setSelectedCategories(updatedCategories);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Title count={dataLength} setGridView={setGridView} />
      </Grid>
      <Grid item xs={12}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="p" color="gray">
            Applied Filters:
          </Typography>
          <Box display={"flex"}>
            {selectedCategories.length > 0 ? (
              <Box>
                {selectedCategories.map((category) => (
                  <AppliedFilters
                    category={category}
                    handleCancelCategory={() => handleCancelCategory(category)}
                  />
                ))}
              </Box>
            ) : (
              ""
            )}
            {sortBy && (
              <AppliedFilters
                category={`Sort: ${sortBy}`}
                handleCancelCategory={() => handleSortCancel()}
              />
            )}

            {(appliedPriceRange?.minPrice !== 0 ||
              appliedPriceRange?.maxPrice !== 0) &&
              appliedPriceRange?.minPrice !== undefined &&
              appliedPriceRange?.maxPrice !== undefined && (
                <AppliedFilters
                  category={`Price: ${appliedPriceRange.minPrice} - ${appliedPriceRange.maxPrice}`}
                  handleCancelCategory={() => handleReset()}
                />
              )}
            {selectedRating && (
              <AppliedFilters
                category={`Selected Rating: ${selectedRating}`}
                handleCancelCategory={() => handleRatingChange(null)}
              />
            )}
            {isAnyFilterApplied && (
              <Button style={{ color: "darkgray" }} onClick={handleReset}>
                Clear All
              </Button>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item md={3} lg={2}>
        <form onSubmit={handleSubmit(applyFilters)}>
          <Box display={{ xs: "none", sm: "none", md: "block", lg: "block" }}>
            <Sort sortBy={sortBy} handleSortChange={handleSortChange} />
            <Typography variant="h6" style={{ margin: "0 24px" }}>
              Categories List
            </Typography>
            {categories?.length > 0 && !categoriesLoading ? (
              <List>
                {categories.map((category, index) => (
                  <Categories
                    index={index}
                    handleCategoryChange={() => handleCategoryChange(category)}
                    category={category}
                    categoryCount={categoryCount[index]}
                  />
                ))}
              </List>
            ) : (
              <CategoriesSkeleton />
            )}
            <Brands />
            <Rating
              onChange={handleRatingChange}
              selectedRating={selectedRating}
            />
            <Price
              control={control}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              handleReset={handleReset}
            />
          </Box>
        </form>
      </Grid>

      <Grid
        item
        container
        sm={12}
        md={9}
        lg={10}
        spacing={3}
        display={"flex"}
        justifyContent={"center"}
        marginTop={6}
      >
        {productLoading ? (
          <ProductCardSkeleton />
        ) : (
          currentProducts?.length > 0 &&
          currentProducts.map((product) => (
            <Grid
              item
              key={product.id}
              lg={isGridview ? 4 : 9}
              sm={isGridview ? 5 : 12}
              xs={isGridview ? 7 : 12}
              gap={{ sm: "1rem" }}
              display={"flex"}
              flexDirection={"column"}
              alignItems={isGridview ? "center" : "start"}
            >
              <ProductCard product={product} isGridView={isGridview} />
            </Grid>
          ))
        )}
      </Grid>
      <Grid item md={12} display={"flex"} justifyContent={"space-between"}>
        <Pagination
          count={dataLength / productsPerPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Grid>
    </Grid>
  );
}

export default HomePage;
