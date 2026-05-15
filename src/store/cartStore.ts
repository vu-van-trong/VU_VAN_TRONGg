import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  variant?: string;
};

type AddToCartPayload = Omit<CartItem, 'quantity'> & { quantity?: number };

type CartStore = {
  items: CartItem[];
  addToCart: (product: AddToCartPayload) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const qty = Math.max(1, product.quantity ?? 1);
          const existingItem = state.items.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: product.size,
                variant: product.variant,
                quantity: qty,
              },
            ],
          };
        }),
      updateQuantity: (id, delta) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () =>
        set(() => ({
          items: [],
        })),
    }),
    {
      name: 'furniture_cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
