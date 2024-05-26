import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from "../../Product/ProductCard"; // Adjust the import path as necessary

const flashSaleProducts = [
  { ProductID: 1, ProductName: 'HAVIT HV-G92 Gamepad', Price: 120, OriginalPrice: 160, Discount: 40, RatingAvg: 4, ProductImagescode: 'https://cdn.britannica.com/13/234213-050-45F47984/dachshund-dog.jpg' },
  { ProductID: 2, ProductName: 'AK-900 Wired Keyboard', Price: 960, OriginalPrice: 1160, Discount: 35, RatingAvg: 5, ProductImagescode: 'https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J' },
  { ProductID: 3, ProductName: 'IPS LCD Gaming Monitor', Price: 370, OriginalPrice: 400, Discount: 30, RatingAvg: 4.5, ProductImagescode: 'https://static.scientificamerican.com/sciam/cache/file/A61DAA39-A55D-4715-A6308DAB750D2E27_source.jpg?w=600' },
  { ProductID: 4, ProductName: 'S-Series Comfort Chair', Price: 375, OriginalPrice: 400, Discount: 25, RatingAvg: 4.5, ProductImagescode: 'https://media.cnn.com/api/v1/images/stellar/prod/230412095218-02-shortest-dog.jpg?c=16x9&q=h_833,w_1480,c_fill' },
  { ProductID: 5, ProductName: 'S-Series Comfort Chair', Price: 375, OriginalPrice: 400, Discount: 25, RatingAvg: 4.5, ProductImagescode: 'https://d.newsweek.com/en/full/1979380/dog-running-through-autumn-leaves.jpg' },
];

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const targetDate = new Date().setSeconds(new Date().getSeconds() + 30);
    const timer = setInterval(() => {
      const difference = targetDate - new Date().getTime();
      if (difference <= 0) {
        clearInterval(timer);
        setIsVisible(false); // Set visibility to false when time runs out
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  if (!isVisible) return null; // Hide the component when time runs out

  return (
    <div style={styles.container}>
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 h-8 w-2 mr-2"></div>
        <h2 className="text-blue-500 text-xl font-bold">Today's</h2>
      </div>
      <h3 className="text-2xl font-bold mb-4">Flash Sales</h3>
      <div className="flex items-center mb-4">
        <div className="mr-2">
          <span className="text-xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-lg"> : </span>
        </div>
        <div className="mr-2">
          <span className="text-xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-lg"> : </span>
        </div>
        <div>
          <span className="text-xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
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
          <div style={styles.row}>
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.ProductID} data={product} />
            ))}
          </div>
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

export default FlashSale;
