import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center md:px-10">
      <Link to="/" className="text-lg md:text-xl font-bold">
        FakeStore
      </Link>
      <Link to="/cart" className="text-lg md:text-xl">
        <FaShoppingCart />
      </Link>
    </nav>
  );
};

export default Navbar;
