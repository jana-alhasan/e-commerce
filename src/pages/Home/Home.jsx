import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Typography, Pagination, List, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchProductsByCategory } from "../../services/productsApi";
import {
  fetchCategories,
  fetchCategoryItemCounts,
} from "../../services/categoriesApi";
import { validationSchema } from "../../utils/validation/validationSchema";
import { fetchAllProducts } from "../../redux/productSlice";
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

const PRODUCTS_PER_PAGE = 5;

function HomePage() {
  const [isGridview, setGridView] = useState(false);
  const products = useSelector((state) => state.products.products);
  const productLoading = useSelector((state) => state.products.productLoading);
  const [dataLength, setDataLength] = useState(0);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryCount, setCategoryCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [appliedPriceRange, setAppliedPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const dispatch = useDispatch();

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
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
    reset({ minPrice: 0, maxPrice: 0, priceRange: [0, 1000] });
    setSelectedRating(null);
    setSelectedCategories([]);
    setSortBy(null);
    setCurrentPage(1);
  };

  const isAnyFilterApplied =
    selectedCategories.length > 0 ||
    Boolean(sortBy) ||
    appliedPriceRange?.minPrice > 0 ||
    appliedPriceRange?.maxPrice > 0 ||
    Boolean(selectedRating);

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        currentPage,
        productsPerPage: PRODUCTS_PER_PAGE,
        sortBy,
      })
    );
  }, [currentPage, dispatch, sortBy]);

  useEffect(() => {
    setFilteredProducts(Array.isArray(products) ? products : []);
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
    if (!categories.length) {
      setCategoryCount([]);
      setDataLength(0);
      return;
    }

    fetchCategoryItemCounts(categories)
      .then((itemCounts) => {
        const normalizedCounts = itemCounts.map((count) => Number(count) || 0);
        setCategoryCount(normalizedCounts);
        setDataLength(
          normalizedCounts.reduce((total, count) => total + count, 0)
        );
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
    setCurrentPage(1);
  };

  const handleRatingChange = (newRating) => {
    setSelectedRating(newRating);
  };

  const handleSortCancel = () => {
    setSortBy(null);
    setCurrentPage(1);
  };

  const applyFilters = async (formData) => {
    try {
      const { minPrice, maxPrice } = formData;
      let nextProducts;

      if (selectedCategories.length > 0) {
        const categoryProducts = await Promise.all(
          selectedCategories.map((category) =>
            fetchProductsByCategory(
              category,
              currentPage,
              PRODUCTS_PER_PAGE,
              sortBy
            )
          )
        );
        nextProducts = categoryProducts.flat();
      } else {
        nextProducts = await dispatch(
          fetchAllProducts({
            currentPage,
            productsPerPage: PRODUCTS_PER_PAGE,
            sortBy,
          })
        ).unwrap();
      }

      const safeProducts = Array.isArray(nextProducts) ? nextProducts : [];
      const filteredByPrice = safeProducts.filter(
        (product) =>
          (!minPrice || product.price >= Number(minPrice)) &&
          (!maxPrice || product.price <= Number(maxPrice))
      );

      const filteredByRating = selectedRating
        ? filteredByPrice.filter(
            (product) =>
              Math.floor(product.rating.rate) === Math.floor(selectedRating)
          )
        : filteredByPrice;

      setFilteredProducts(filteredByRating);
      setAppliedPriceRange({ minPrice, maxPrice });
      setCurrentPage(1);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category]
    );
  };

  const handleCancelCategory = (category) => {
    setSelectedCategories((previous) =>
      previous.filter((item) => item !== category)
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Title count={dataLength} setGridView={setGridView} />
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          <Typography component="span" color="gray">
            Applied Filters:
          </Typography>
          <Box display="flex">
            {selectedCategories.map((category) => (
              <AppliedFilters
                key={category}
                category={category}
                handleCancelCategory={() => handleCancelCategory(category)}
              />
            ))}
            {sortBy && (
              <AppliedFilters
                category={`Sort: ${sortBy}`}
                handleCancelCategory={handleSortCancel}
              />
            )}
            {(appliedPriceRange?.minPrice !== 0 ||
              appliedPriceRange?.maxPrice !== 0) &&
              appliedPriceRange?.minPrice !== undefined &&
              appliedPriceRange?.maxPrice !== undefined && (
                <AppliedFilters
                  category={`Price: ${appliedPriceRange.minPrice} - ${appliedPriceRange.maxPrice}`}
                  handleCancelCategory={handleReset}
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
            {categories.length > 0 && !categoriesLoading ? (
              <List>
                {categories.map((category, index) => (
                  <Categories
                    key={category}
                    index={index}
                    handleCategoryChange={() => handleCategoryChange(category)}
                    category={category}
                    categoryCount={categoryCount[index] || 0}
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
        display="flex"
        justifyContent="center"
        marginTop={6}
      >
        {productLoading ? (
          <ProductCardSkeleton />
        ) : (
          currentProducts.map((product) => (
            <Grid
              item
              key={product.id}
              lg={isGridview ? 4 : 9}
              sm={isGridview ? 5 : 12}
              xs={isGridview ? 7 : 12}
              gap={{ sm: "1rem" }}
              display="flex"
              flexDirection="column"
              alignItems={isGridview ? "center" : "start"}
            >
              <ProductCard product={product} isGridView={isGridview} />
            </Grid>
          ))
        )}
      </Grid>

      <Grid item md={12} display="flex" justifyContent="space-between">
        <Pagination
          count={Math.max(1, Math.ceil(dataLength / PRODUCTS_PER_PAGE))}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Grid>
    </Grid>
  );
}

export default HomePage;
