# E-Commerce Web App

An individual React portfolio project that demonstrates a multi-page shopping flow using Fake Store API data, Redux Toolkit state management, Material UI, and validated checkout forms.

## What the app does

- Loads product data from Fake Store API.
- Browses products with pagination and grid/list layouts.
- Filters by category, price, and rating and supports API sorting.
- Opens a dedicated details route for each product.
- Uses Fake Store API authentication for the login flow.
- Requires a logged-in session before products can be added to the cart.
- Adds, increments, decrements, removes, and clears cart items through Redux Toolkit.
- Persists the authenticated session token and cart items in `localStorage` so they survive a refresh.
- Clears cart state when the user logs out.
- Validates checkout information with React Hook Form and Yup.
- Completes a transparent **local demo checkout** that shows a confirmation summary and clears the cart.
- Uses skeleton/loading states and reusable confirmation dialogs.

## Important checkout boundary

This project does **not** process payments or create a real backend order. The checkout completion is intentionally a local portfolio simulation: it validates the form, summarizes the item count and total, clears the local cart, and tells the user that no payment/backend order occurred.

The previous hard-coded Fake Store cart synchronization was removed because it used fixed cart/user values and did not represent a real authenticated-user order flow.

## Tech stack

- React 18
- JavaScript
- React Router v6
- Redux Toolkit + React Redux
- Material UI v5
- React Hook Form
- Yup
- Axios
- Fake Store API
- `localStorage`
- Jest / React Scripts test runner
- GitHub Actions CI

## Routes

- `/` — product catalog and filters
- `/login` — Fake Store API login
- `/product/:id` — product details
- `/cart` — local Redux cart
- `/checkout` — validated local demo checkout

## State and API design

Redux Toolkit manages authentication, products, and cart state. API requests are separated into service modules where appropriate. Authentication uses Fake Store API, while cart changes are deliberately local rather than pretending to synchronize with a real user-owned backend cart.

Only the session user/token and cart items are persisted. Transient loading and error state is rebuilt at runtime instead of being written to storage.

## Validation and CI

The repository includes focused regression tests for:

- cart add/increment/decrement/remove/clear behavior
- safe handling of an unknown cart item ID
- checkout validation, including optional marketing consent and required terms acceptance
- session/cart persistence loading and localStorage write-back

GitHub Actions runs a clean dependency install, rejects legacy Material UI v4 imports, runs the tests, and creates a production build on pull requests and pushes to the default branch.

## Run locally

```bash
npm install
npm start
```

Create a production build with:

```bash
npm run build
```

The login endpoint is provided by Fake Store API, so a valid Fake Store API test account is required to exercise authenticated cart actions.

## Project status

The current cleanup focuses on reproducible builds, reliable state behavior, truthful checkout semantics, focused regression coverage, and recruiter-facing evidence. A real payment provider and real order backend are outside the implemented scope and are not claimed.
