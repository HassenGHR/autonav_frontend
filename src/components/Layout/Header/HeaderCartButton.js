import { useEffect, useState } from 'react';
import CartIcon from '../../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  // Function to get the number of cart items from localStorage
  const getCartItemsLength = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return cartItems.length;
  };

  // Effect to update the number of cart items and listen for changes
  useEffect(() => {
    // Update the number of cart items initially
    setNumberOfCartItems(getCartItemsLength());

    // Function to handle storage change event
    const handleStorageChange = () => {
      setNumberOfCartItems(getCartItemsLength());
    };

    // Listen for storage events to update cart items
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Effect to highlight the button when cart items change
  useEffect(() => {
    if (numberOfCartItems === 0) {
      return;
    }

    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [numberOfCartItems]);

  // CSS classes for the button
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  return (
    <button className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      {/* Badge for cart items */}
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
