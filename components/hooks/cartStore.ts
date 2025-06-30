import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string; // ? means optional
  size?: string; // ? means optional
}
interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (idToRemove: string) => void;
  increaseQuantity: (idToIncrease: string) => void;
  decreaseQuantity: (idToDecrease: string) => void;
  clearCart: () => void;
}
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],

      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (cartItem) => cartItem.item._id === item.item._id
          );
          if (existingItemIndex !== -1) {
            toast("Item already in cart");
            return { cartItems: state.cartItems };
          }
          toast.success("Item added to cart", { icon: "🛒" });
          return { cartItems: [...state.cartItems, item] };
        }),

      removeItem: (idToRemove) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem.item._id !== idToRemove
          ),
        }));
        toast.success("Item removed from cart");
      },

      increaseQuantity: (idToIncrease) =>
        set((state) => {
          const updatedCartItems = state.cartItems.map((cartItem) => {
            if (cartItem.item._id === idToIncrease) {
              return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
          });
          toast.success("Item quantity increased");
          return { cartItems: updatedCartItems };
        }),

      decreaseQuantity: (idToDecrease) =>
        set((state) => {
          const updatedCartItems = state.cartItems
            .map((cartItem) => {
              if (cartItem.item._id === idToDecrease) {
                return {
                  ...cartItem,
                  quantity: Math.max(cartItem.quantity - 1, 0),
                };
              }
              return cartItem;
            })
            .filter((cartItem) => cartItem.quantity > 0);
          toast.success("Item quantity decreased");

          return { cartItems: updatedCartItems };
        }),

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage", // unique name for the storage
    }
  )
);
