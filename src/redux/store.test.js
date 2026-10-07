jest.mock("../services/authApi", () => ({
  fetchLogin: jest.fn(),
}));

jest.mock("./productSlice", () => ({
  __esModule: true,
  default: (
    state = { products: [], productsLength: 1, productLoading: false }
  ) => state,
}));

import store, { loadPersistedState, STORAGE_KEY } from "./store";
import { addToCart, clearCart } from "./cartSlice";

const product = { id: 7, title: "Persisted product", price: 12 };

describe("store persistence", () => {
  afterEach(() => {
    store.dispatch(clearCart());
    window.localStorage.removeItem(STORAGE_KEY);
  });

  test("restores only the persisted auth user and cart items", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        auth: { user: { token: "demo-token" } },
        cart: { items: [{ ...product, quantity: 2 }] },
      })
    );

    expect(loadPersistedState()).toEqual({
      auth: {
        user: { token: "demo-token" },
        status: "idle",
        error: null,
      },
      cart: {
        items: [{ ...product, quantity: 2 }],
        cartLoading: false,
        status: "idle",
        error: null,
      },
    });
  });

  test("ignores invalid persisted JSON", () => {
    window.localStorage.setItem(STORAGE_KEY, "not-json");

    expect(loadPersistedState()).toBeUndefined();
  });

  test("writes cart changes to localStorage", () => {
    window.localStorage.removeItem(STORAGE_KEY);

    store.dispatch(addToCart(product));

    const persisted = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    expect(persisted.cart.items).toEqual([{ ...product, quantity: 1 }]);
  });
});
