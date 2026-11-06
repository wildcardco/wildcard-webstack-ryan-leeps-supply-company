import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { addToCart, cartCount, loadCart, removeFromCart, saveCart, setQuantity } from '../cart/cartStore'
import { isKnownProductSlug } from '../data/catalog'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadCart(isKnownProductSlug))

  useEffect(() => {
    saveCart(items)
  }, [items])

  const addItem = useCallback((slug, quantity = 1) => {
    setItems((current) => addToCart(current, slug, quantity, isKnownProductSlug))
  }, [])

  const setItemQuantity = useCallback((slug, quantity) => {
    setItems((current) => setQuantity(current, slug, quantity))
  }, [])

  const removeItem = useCallback((slug) => {
    setItems((current) => removeFromCart(current, slug))
  }, [])

  const value = useMemo(
    () => ({
      items,
      count: cartCount(items),
      addItem,
      setItemQuantity,
      removeItem,
    }),
    [items, addItem, setItemQuantity, removeItem],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used within CartProvider')
  return value
}
