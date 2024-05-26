import React, { useState } from 'react';
import {
  bannerImgOnePNG,
  bannerImgTwoPNG,
  bannerImgThreePNG,
  bannerImgFourPNG,
  bannerImgFivePNG,
} from "../../../assets/images";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    { src: bannerImgOnePNG, alt: 'Banner 1' },
    { src: bannerImgTwoPNG, alt: 'Banner 2' },
    { src: bannerImgThreePNG, alt: 'Banner 3' },
    { src: bannerImgFourPNG, alt: 'Banner 4' },
    { src: bannerImgFivePNG, alt: 'Banner 5' },
  ];

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={styles.bannerContainer}>
      <div style={styles.banner}>
        <img src={banners[currentIndex].src} alt={banners[currentIndex].alt} style={styles.image} />
      </div>
      <div style={styles.controls}>
        <button onClick={handlePrevClick} style={styles.button}>&larr;</button>
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              ...styles.dot,
              backgroundColor: index === currentIndex ? '#00ff00' : '#ccc',
            }}
          ></div>
        ))}
        <button onClick={handleNextClick} style={styles.button}>&rarr;</button>
      </div>
    </div>
  );
};

const styles = {
  bannerContainer: {
    position: 'relative',
    width: '100%',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '10px',
    width: '100%',
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  dot: {
    width: '10px',
    height: '10px',
    margin: '0 5px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
};

export default Banner;
