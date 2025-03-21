import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const querySnapshot = await getDocs(collection(db, 'cart'));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      
      const groupedCart = items.reduce((acc, item) => {
        const existingItem = acc.find(
          (cartItem) => cartItem.productId === item.productId
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          acc.push({ ...item, quantity: 1 });
        }
        return acc;
      }, []);

      setCart(groupedCart);
    };

    fetchCart();
  }, []);

  // Increase quantity
  const increaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity (Remove item if quantity reaches 0)
  const decreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = async (id) => {
    try {
      await deleteDoc(doc(db, 'cart', id));
      setCart(cart.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-lg md:text-xl font-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="border p-4 my-2 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <img src={item.image} alt={item.title} className="h-20 w-20" />
                <div className="flex-1">
                  <h3 className="text-md md:text-lg font-bold">{item.title}</h3>
                  <p className="text-sm md:text-base">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm md:text-base font-semibold">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.productId)}
                    className="p-2 bg-gray-300 rounded-md cursor-pointer"
                  >
                    <FaMinus />
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.productId)}
                    className="p-2 bg-gray-300 rounded-md cursor-pointer"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 bg-red-500 text-white rounded-md cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-bold mt-4">
            Total Price: ${totalPrice.toFixed(2)}
          </h3>
        </>
      )}
    </div>
  );
};

export default Cart;
