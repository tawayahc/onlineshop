import React from "react";
import Comment from "./Comment";

const ReviewBar = ({ star, reviewAmount }) => {
  return (
    <div className="flex flex-row content-center items-center">
      <p className="text-xl">{star}</p>
      <progress
        className="progress progress-accent w-56 ml-4 h-4"
        value={reviewAmount}
        max="100"
      />
    </div>
  );
};

const reviewData = [
  {
    star: 5,
    reviewAmount: 100,
  },
  {
    star: 4,
    reviewAmount: 50,
  },
  {
    star: 3,
    reviewAmount: 20,
  },
  {
    star: 2,
    reviewAmount: 10,
  },
  {
    star: 1,
    reviewAmount: 5,
  },
];

function Review() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
        <div className="flex flex-col">
          <p>Avg star</p>
          <div className="divider"></div>
          {reviewData.map((data) => (
            <ReviewBar
              star={data.star}
              reviewAmount={data.reviewAmount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Review;
