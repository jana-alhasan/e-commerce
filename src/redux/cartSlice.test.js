import reducer, {
  addToCart,
  removeFromCart,
  clearfromCart,
  clearCart,
} from "./cartSlice";

const product = { id: 1, title: "Test product", price: 10 };

describe("cartSlice", () => {
  test("adds a new item with quantity one", () => {
    const state = reducer(undefined, addToCart(product));

    expect(state.items).toEqual([{ ...product, quantity: 1 }]);
  });

  test("increments an existing product instead of duplicating it", () => {
    const once = reducer(undefined, addToCart(product));
    const twice = reducer(once, addToCart(product));

    expect(twice.items).toHaveLength(1);
    expect(twice.items[0].quantity).toBe(2);
  });

  test("decrements quantity and removes an item when it reaches one", () => {
    let state = reducer(undefined, addToCart(product));
    state = reducer(state, addToCart(product));
    state = reducer(state, removeFromCart(product.id));

    expect(state.items[0].quantity).toBe(1);

    state = reducer(state, removeFromCart(product.id));
    expect(state.items).toEqual([]);
  });

  test("clearfromCart does not remove another item when id is absent", () => {
    const secondProduct = { id: 2, title: "Second", price: 20 };
    let state = reducer(undefined, addToCart(product));
    state = reducer(state, addToCart(secondProduct));
    state = reducer(state, clearfromCart(999));

    expect(state.items.map((item) => item.id)).toEqual([1, 2]);
  });

  test("clearCart empties the cart", () => {
    let state = reducer(undefined, addToCart(product));
    state = reducer(state, clearCart());

    expect(state.items).toEqual([]);
  });
});
