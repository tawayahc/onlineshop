import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from '../../Product/ProductCard'; // Adjust the import path as necessary

const Scrolling = ({ title, products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div style={styles.container}>
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 h-8 w-2 mr-2"></div>
        <h2 className="text-blue-500 text-xl font-bold">{title}</h2>
      </div>
      <div style={styles.productListContainer}>
        <div style={styles.scrollButtonContainer}>
          <button onClick={() => scroll('left')} style={styles.scrollButton}>
            <FaChevronLeft />
          </button>
          <button onClick={() => scroll('right')} style={styles.scrollButton}>
            <FaChevronRight />
          </button>
        </div>
        <div ref={scrollRef} style={styles.productList}>
          {products.map((product) => (
            <div key={product.ProductID} style={styles.productWrapper}>
              <ProductCard data={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  productListContainer: {
    position: 'relative',
  },
  productList: {
    display: 'flex',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    padding: '10px 0',
  },
  productWrapper: {
    marginRight: '20px', // Add margin between products
  },
  scrollButtonContainer: {
    position: 'absolute',
    top: '50%',
    right: '0',
    display: 'flex',
    gap: '10px',
  },
  scrollButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
};

export default Scrolling;
