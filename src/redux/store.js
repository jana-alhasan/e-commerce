import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";

const STORAGE_KEY = "ecommerce-session";

function loadPersistedState() {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const serializedState = window.localStorage.getItem(STORAGE_KEY);

    if (!serializedState) {
      return undefined;
    }

    const parsedState = JSON.parse(serializedState);

    return {
      auth: {
        user: parsedState.auth?.user || null,
        status: "idle",
        error: null,
      },
      cart: {
        items: Array.isArray(parsedState.cart?.items)
          ? parsedState.cart.items
          : [],
        cartLoading: false,
        status: "idle",
        error: null,
      },
    };
  } catch (error) {
    return undefined;
  }
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
  preloadedState: loadPersistedState(),
});

if (typeof window !== "undefined") {
  store.subscribe(() => {
    try {
      const state = store.getState();
      const persistedState = {
        auth: { user: state.auth.user },
        cart: { items: state.cart.items },
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
    } catch (error) {
      // Storage failures should not block shopping interactions.
    }
  });
}

export { STORAGE_KEY, loadPersistedState };
export default store;
