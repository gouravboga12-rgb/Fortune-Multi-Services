import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  name: string;
  slug: string;
  categorySlug: string;
  price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  cartCount: number;
  isInCart: (slug: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const local = localStorage.getItem('fortune_cart');
      return local ? JSON.parse(local) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('fortune_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      // Avoid duplicate services
      if (prev.some((i) => i.slug === item.slug)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (slug: string) => {
    setCartItems((prev) => prev.filter((item) => item.slug !== slug));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (slug: string) => {
    return cartItems.some((item) => item.slug === slug);
  };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
