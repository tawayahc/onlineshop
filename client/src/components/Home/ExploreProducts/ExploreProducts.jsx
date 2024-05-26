import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from "../../Product/ProductCard"; // Adjust the import path as necessary
import CategorySelect from '../BrowseByCategory/CategorySelect'; // Adjust the import path as necessary
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import fetchProductsList from '../../../API/fetchProducts';
import { productsState } from '../../../recoil/atom';
import { cartStatusState } from '../../../recoil/cart';
import { useNavigate } from 'react-router-dom';
import  Toast  from '../../../components/Toast';

const ExploreProducts = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const products = useRecoilValue(productsState);
  const [loading, setLoading] = useState(true);
  const {fetchProducts} = fetchProductsList();

  const status = useRecoilValue(cartStatusState);
  const setStatus = useSetRecoilState(cartStatusState);

  useEffect(() => {
    setLoading(true);
    fetchProducts().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (status.visible) {
      const timer = setTimeout(() => {
        setStatus({ visible: false, message: "", type: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, setStatus]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };


  const splitProducts = (products) => {
    const rows = [];
    const itemsPerRow = 4;
    for (let i = 0; i < products.length; i += itemsPerRow) {
      rows.push(products.slice(i, i + itemsPerRow));
    }
    return rows.slice(0, 2); // Only show the first 2 rows
  };

  const rows = splitProducts(products);

  const navigate = useNavigate();
  const viewAllproducts = () => {
    navigate('/products');
  };

  return (
    <div style={styles.container}>
      {status.visible && (
          <Toast
            message={status.message}
            type={status.type}
            onClose={() => setStatus({ visible: false, message: "", type: "" })}
          />
        )}
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 h-8 w-2 mr-2"></div>
        <h2 className="text-blue-500 text-xl font-bold">Our Products</h2>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-left">
       Explore by Category
      </h3>
      <CategorySelect
      />
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
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} style={styles.row}>
              {row.map((product) => (
                <ProductCard key={product.ProductID} data={product} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={styles.viewAllButtonContainer}>
        <button
          className="btn btn-accent btn-sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            backgroundColor: isHovered ? '#2B6CB0' : '#3B82F6', // Change color on hover
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            margin: '0 auto',
            display: 'block',
          }}
          onClick={viewAllproducts}
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  productListContainer: {
    position: 'relative',
  },
  productList: {
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    padding: '10px 0',
    width: '100%',
  },
  row: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '20px',
    minWidth: 'max-content', // Ensure rows take up necessary width
    gap: '20px', // Add gap between each product
  },
  scrollButtonContainer: {
    position: 'absolute',
    top: '-40px',
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
  viewAllButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
};

export default ExploreProducts;
