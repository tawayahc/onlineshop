import React, { useState } from 'react';
import Slider from "react-slick";

import {
  bannerImgOnePNG,
  bannerImgTwoPNG,
  bannerImgThreePNG,
  bannerImgFourPNG,
  bannerImgFivePNG,
} from "../../../assets/images";

const TopBanner = () => {
    const [dotActive, setDotActive] = useState(0);
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      beforeChange: (prev, next) => {
        setDotActive(next);
      },
      appendDots: dots => (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, display: "flex" }}>
            {dots.slice(0, 5)}
          </ul>
        </div>
      ),
      customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: i === dotActive ? "#2F84FF" : "#ccc",
          margin: "0 3px",
          cursor: "pointer",
        }}
        ></div>
      ),
    };

    return (
        <div>
            {/* Banner */}
          <div className='w-1/2 pl-4' style={{ marginLeft: '420px', marginTop: '-313px' }}>
            <div className='w-full h-full relative'>
              <Slider {...settings}>
                <div>
                  <img src={bannerImgOnePNG} alt="bannerImgOne" />
                </div>
                <div>
                  <img src={bannerImgTwoPNG} alt="bannerImgTwo" />
                </div>
                <div>
                  <img src={bannerImgThreePNG} alt="bannerImgThree" />
                </div>
                <div>
                  <img src={bannerImgFourPNG} alt="bannerImgFour" />
                </div>
                <div>
                  <img src={bannerImgFivePNG} alt="bannerImgFive" />
                </div>
              </Slider>
            </div>
          </div>
        </div>
    );
};

export default TopBanner;