import { useEffect, useState } from 'react';
import axios from 'axios';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then((res) => {
      setProducts(res.data);
    });
  }, []);

  const addToCart = async (product) => {
    try {
      const cartItem = {
        title: product.title,
        price: product.price,
        image: product.image,
        productId: product.id.toString(),
        quantity: 1,
      };

      await addDoc(collection(db, 'cart'), cartItem);
      toast.success('Added to cart!', { position: 'top-right' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart!', { position: 'top-right' });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <div key={product.id} className="border p-2 rounded shadow-md">
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto"
            />
            <h2 className="text-md md:text-lg font-bold">{product.title}</h2>
            <p className="text-sm md:text-base">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white p-2 rounded w-full md:w-auto cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
