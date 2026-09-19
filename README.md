# E-Commerce Web App

A responsive e-commerce web application built with React, featuring product
browsing, search, cart management, authentication, and a multi-step checkout
flow. Product data is powered by [Fake Store API](https://fakestoreapi.com/).

## ✨ Features

- **Product Catalog** — Browse products by category with pagination and sorting
- **Search** — Real-time product search from the header
- **Product Details** — Dedicated page per product with quantity selection
- **Shopping Cart** — Add, remove, and update items with live total calculation
- **Authentication** — Login flow with form validation and error handling
- **Checkout** — Multi-field order form with validation via React Hook Form + Yup
- **Loading States** — Skeleton loaders for products, details, and cart while data fetches
- **Reusable Dialogs** — Confirmation dialogs for delete and login-required actions

## 🛠️ Built With

- **React** — UI library
- **Redux Toolkit** — Global state management (auth, cart, products, categories)
- **React Router v6** — Client-side routing
- **Material UI (MUI)** — Component library and styling
- **React Hook Form + Yup** — Form handling and schema validation
- **Axios** — HTTP client, wrapped in a dedicated `services/` layer

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components (header, product card, dialogs, skeletons)
├── pages/           # Route-level pages (Home, Login, Cart, Checkout, Product Details)
├── redux/           # Redux Toolkit slices (auth, cart, products, categories)
├── services/        # API calls, separated from state management
├── router/          # Route definitions
└── App.js           # Root component and layout
```

## 🚧 Status

Core shopping flow is complete: browsing, searching, product details, cart
management, and checkout form validation all work end-to-end against the
Fake Store API.


### Planned Next
- Persist authentication state (localStorage or `redux-persist`)
- Connect checkout to a mock order-confirmation flow (clear cart + confirmation page)
- Derive cart/user identifiers from the authenticated user instead of static values

## 🎯 What I Learned

Structuring a mid-sized React app with a clear separation between API calls
(`services/`), state (`redux/`), and UI (`components/`, `pages/`), and using
React Hook Form with Yup to manage multi-field form validation cleanly.

