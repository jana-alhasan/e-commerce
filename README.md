# E-Commerce Web App

A responsive React shopping demo built as an individual frontend portfolio project. It focuses on catalog browsing, Redux Toolkit state management, demo authentication, a local cart, validated checkout UI, and a deployable GitHub Pages experience.

**Live demo:** https://jana-alhasan.github.io/e-commerce/

## My role

I built this project individually. The repository demonstrates frontend implementation only; it does not claim a production commerce backend, payment processing, real inventory, or real customer orders.

## Verified features

- Browse a product catalog with grid/list layouts and pagination.
- Filter products by category, rating, and price and change ascending/descending order.
- Open direct product-detail routes, including after a refresh or fresh page load.
- Display API-backed product metadata, images, ratings, and review content.
- Sign in through DummyJSON's public demo-auth endpoint.
- Require a demo-auth session before adding items to the cart.
- Add, increment, decrement, remove, and clear local cart items with Redux Toolkit.
- Persist the demo session and cart in `localStorage` across refreshes.
- Validate checkout fields with React Hook Form and Yup.
- Complete a clearly labeled **local demo checkout** that shows a confirmation summary and clears the local cart.
- Show loading/skeleton states for asynchronous product data.

## Demo login

The login uses public DummyJSON test data rather than a real account system.

- Username: `emilys`
- Password: `emilyspass`

These are public demo credentials documented by DummyJSON and are included only so reviewers can exercise the authenticated cart flow.

## Technical implementation

- **React 18 + JavaScript** for the UI.
- **React Router v6 / HashRouter** for client-side routes that work reliably on GitHub Pages.
- **Redux Toolkit + React Redux** for authentication, product, and cart state.
- **Material UI v5** for components and responsive layout.
- **Axios** for REST requests.
- **DummyJSON Products API** for public demo catalog/category data.
- A small normalization boundary maps external product responses into the stable shape used by the UI.
- **React Hook Form + Yup** for checkout validation.
- **localStorage** for demo session/cart persistence.
- **Jest / React Scripts test runner** for focused regression coverage.
- **GitHub Actions** for clean install, tests, production build, and Pages publishing.

## Routes

- `#/` — product catalog and filters
- `#/login` — public demo login
- `#/product/:id` — product details
- `#/cart` — local Redux cart
- `#/checkout` — validated local demo checkout

## Checkout boundary

This project does **not** process payments or create a backend order. Checkout is intentionally a local portfolio simulation: it validates the form, summarizes the item count and total, clears local cart state, and states that no payment/backend order occurred.

The cart is also intentionally local. An earlier fixed-user demo cart synchronization was removed because it did not represent a real authenticated-user order flow.

## Validation and CI

The repository includes focused regression tests for state behavior, persistence, checkout validation, product API normalization, and demo-auth response handling. GitHub Actions runs a clean dependency install, checks for legacy Material UI imports, runs the test suite, and creates a production build on pull requests and pushes to the default branch.

The deployed site has also been exercised in headless Chrome for the live catalog and direct product-detail route. This is not a claim of full cross-browser or mobile QA.

## Run locally

```bash
npm install
npm start
```

Create a production build with:

```bash
npm run build
```

## Current status

The core portfolio flow is implemented and deployed. Remaining work is limited to incremental polish and maintenance; real payments, real orders, and a production account/backend system are intentionally outside this project's scope.
