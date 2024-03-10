import { create } from 'zustand';

const useStore = create((set) => ({
  cart: [],
  total_quantity: 0,
  total : 0,
  addToCart: (product) => set((state) => ({ cat: [...state.cart, product] })),
  removeFromCart: (product) => set((state) => ({ cart: state.cart.filter((p) => p.id !== product.id) })),
  clearCart: () => set({ cart: [] }),
}));

export default useStore;