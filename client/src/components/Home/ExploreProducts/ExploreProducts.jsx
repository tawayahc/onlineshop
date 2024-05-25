import React, { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from "../../Product/ProductCard"; // Adjust the import path as necessary
import CategorySelect from '../BrowseByCategory/CategorySelect'; // Adjust the import path as necessary

const allProducts = [
  { ProductID: 1, ProductName: '1', Category: 'Phones', Price: 100, RatingAvg: 4, ProductImagescode: 'https://inwfile.com/s-fl/sffm8k.jpg' },
  { ProductID: 2, ProductName: '2', Category: 'Gaming', Price: 360, RatingAvg: 5, ProductImagescode: 'https://techwarehouse.co.th/wp-content/uploads/2023/06/cover_TW-74-300x300.png' },
  { ProductID: 3, ProductName: '3', Category: 'Computers', Price: 700, RatingAvg: 4.5, ProductImagescode: 'https://comkub.com/wp-content/uploads/2023/07/1_0-300x300.jpg' },
  { ProductID: 4, ProductName: '4', Category: 'Phones', Price: 500, RatingAvg: 4.5, ProductImagescode: 'https://remaxbts.com/wp-content/uploads/2020/08/Car-Gadget-Holder-Remax-RM-C38-Black-D1900427-300x300.jpg' },
  { ProductID: 5, ProductName: '5', Category: 'SmartWatch', Price: 960, RatingAvg: 5, ProductImagescode: 'https://dq.lnwfile.com/_webp_resize_images/300/300/ji/2m/aw.webp' },
  { ProductID: 6, ProductName: '6', Category: 'Computers', Price: 160, RatingAvg: 4, ProductImagescode: 'https://www.oshicomputer.com/wp-content/uploads/set3-300x300.png' },
  { ProductID: 7, ProductName: '7', Category: 'Phones', Price: 60, RatingAvg: 4.5, ProductImagescode: 'https://www.bestofcase.com/wp-content/uploads/i2051-sty1-300x300.jpg' },
  { ProductID: 8, ProductName: '8', Category: 'Camera', Price: 60, RatingAvg: 4.5, ProductImagescode: 'https://magento1.bigcamera.co.th/media/catalog/product/cache/2/small_image/300x300/9df78eab33525d08d6e5fb8d27136e95/2/0/20230908_091557_ct04-ct5.png' },
  { ProductID: 9, ProductName: '9', Category: 'HeadPhones', Price: 100, RatingAvg: 4, ProductImagescode: 'https://cdn-dghio.nitrocdn.com/WeHvdsfCHLdbWrjCbJwlIovFmTgYTNZq/assets/images/optimized/rev-3a476b7/www.aquapro.co.th/wp-content/uploads/2023/09/ok27_Onikuma-K10-Pro-Gaming-Headphone-RGB-3.5mm-Black-9-300x300.jpg' },
  { ProductID: 10, ProductName: '10', Category: 'Gaming', Price: 360, RatingAvg: 5, ProductImagescode: 'https://www.elysiumgadget.com/wp-content/uploads/2022/05/G-PRO-GAMING-KB-300x300.jpg' },
  { ProductID: 11, ProductName: '11', Category: 'Gaming', Price: 700, RatingAvg: 4.5, ProductImagescode: 'https://www.neolutionesport.com/wp-content/uploads/2021/09/1-300x300.jpg' },
  { ProductID: 12, ProductName: '12', Category: 'Phones', Price: 500, RatingAvg: 4.5, ProductImagescode: 'https://ginkotown.store/cdn/shop/products/LEITZ2_300x300.jpg?v=1668849564' },
  { ProductID: 13, ProductName: '13', Category: 'HeadPhones', Price: 960, RatingAvg: 5, ProductImagescode: 'https://www.gump.in.th/content/product/5367-Thumbnail.jpg' },
  { ProductID: 14, ProductName: '14', Category: 'SmartWatch', Price: 160, RatingAvg: 4, ProductImagescode: 'https://image.made-in-china.com/2f0j00fwzhspZthgun/I9-Wireless-Children-prime-S-Smart-Watch-Plug-in-Card-with-4G-SIM-Card-Camera-GPS-Positioning-Sports-Bracelet-for-Video-Calling.webp' },
  { ProductID: 15, ProductName: '15', Category: 'Computers', Price: 60, RatingAvg: 4.5, ProductImagescode: 'https://www.uboncomputer.co.th/pub/media/catalog/product/cache/c57fc18c4acb16561e78d17d69057ac7/1/_/1_461.jpg' },
  { ProductID: 16, ProductName: '16', Category: 'Camera', Price: 60, RatingAvg: 4.5, ProductImagescode: 'https://ge.lnwfile.com/_/ge/_fit/300/300/ba/5d/ot.jpg' },
  { ProductID: 17, ProductName: '17', Category: 'Phones', Price: 260, RatingAvg: 4, ProductImagescode: 'https://s.alicdn.com/@sc04/kf/Hbfb802a500b04ec9a6b9ef7c46058105S.jpg_300x300.jpg' },
  { ProductID: 18, ProductName: '18', Category: 'Camera', Price: 20, RatingAvg: 5, ProductImagescode: 'https://ae01.alicdn.com/kf/S7982d74a670646168f01273e89e518ac7.jpg_300x300Q70.jpg_.webp' },
  { ProductID: 19, ProductName: '19', Category: 'Camera', Price: 160, RatingAvg: 4, ProductImagescode: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvegCu5gDBAhXKmhPkSZ4tqk1Omlcg4oddncfuyO6rcQcSD8W_jGoRO4weudK3upvns64&usqp=CAU' },
  { ProductID: 20, ProductName: '20', Category: 'Camera', Price: 50, RatingAvg: 4.5, ProductImagescode: 'https://multimedia.bbycastatic.ca/multimedia/products/300x300/170/17051/17051649_1.png' },
];

const ExploreProducts = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  const filteredProducts = selectedCategory === 'All'
    ? allProducts
    : allProducts.filter(product => product.Category === selectedCategory);

  const splitProducts = (products) => {
    const rows = [];
    const itemsPerRow = 4;
    for (let i = 0; i < products.length; i += itemsPerRow) {
      rows.push(products.slice(i, i + itemsPerRow));
    }
    return rows.slice(0, 2); // Only show the first 2 rows
  };

  const rows = splitProducts(filteredProducts);

  return (
    <div style={styles.container}>
      <CategorySelect
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 h-8 w-2 mr-2"></div>
        <h2 className="text-blue-500 text-xl font-bold">Our Products</h2>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-left">
        {selectedCategory === 'All' ? 'Explore Our Products' : selectedCategory}
      </h3>
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
