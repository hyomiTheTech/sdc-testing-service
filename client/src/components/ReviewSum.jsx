import React from 'react';
import StarRating from 'react-star-ratings';

const ReviewSum = ({ rating, review, adjective }) => {
  return (
    <div className="review-summary">
      <h2>
        <strong>
          <span className="review_total">
            {`${review.length} Reviews`}
          </span>
        </strong>
      </h2>
      <div>
        <span>
          <StarRating rating={rating} starDimension="20px" starSpacing="0px" starRatedColor="#323e4d"/>
        </span>
        <span className="review_sum_header">
          {`${adjective}  ${rating.toFixed(1)}/5`}
        </span>
      </div>
    </div>
  );
};

export default ReviewSum;