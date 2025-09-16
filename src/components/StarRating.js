import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import './StarRating.css';

const StarRating = ({ rating, onRatingChange, isInteractive = true }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  if (!isInteractive) {
    return <div className="star-rating static">{stars}</div>;
  }

  return (
    <div className="star-rating interactive">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              size={25}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;