import React from "react";
import StarRating from "react-star-ratings";
import moment from "moment";

const ReviewItem = ({ review }) => {
  var owner_response_label = {
    fontWeight: "700",
    marginRight: "5px",
    color: "#717171"
  };

  var owner_paragraph = {
    display: "block",
    marginBlockStart: "1em",
    marginBlockEnd: "1em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    marginTop: "10px",
    marginRight: "0px",
    marginBottom: "16px",
    marginLeft: "0px"
  };

  if (review.ownerR) {
    return (
      <div className="review_list">
        <h4 className="review_title">{review.title}</h4>
        <div className="review_meta">
          <span>
            <span className="review_rating_score">{review.rating}/5 </span>
            <span>
              <StarRating
                rating={JSON.parse(review.rating)}
                starDimension="15px"
                starSpacing="0px"
                starRatedColor="#323e4d"
              />
            </span>
          </span>
          <span className="author_stay_date">
            <span> Stayed </span>
            <span>{moment(`${review.dateS}`).format("MMM YYYY")}</span>
          </span>
        </div>
        <div className="author">
          <div>
            <span className="review_author">{review.author} </span>
            <span className="review_author_loc">{review.aLocation}</span>
          </div>
        </div>
        <div className="review_paragraph">
          <p>{review.review}</p>
        </div>
        <div className="review_footer">
          <div>
            <span>Published </span>
            <span>{moment(`${review.dateP}`).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        <div className="review_response">
          <span style={owner_response_label}>Owner's Response:</span>
          <span>
            <p style={owner_paragraph}>{review.ownerR}</p>
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="review_list">
        <h4 className="review_title">{review.title}</h4>
        <div className="review_meta">
          <span>
            <span className="review_rating_score">{review.rating}/5 </span>
            <span>
              <StarRating
                rating={review.rating}
                starDimension="15px"
                starSpacing="0px"
                starRatedColor="#323e4d"
              />
            </span>
          </span>
          <span className="author_stay_date">
            <span> Stayed </span>
            <span>{moment(`${review.dateS}`).format("MMM YYYY")}</span>
          </span>
        </div>
        <div className="author">
          <div>
            <span className="review_author">{review.author} </span>
            <span className="review_author_loc">{review.aLocation}</span>
          </div>
        </div>
        <div className="review_paragraph">
          <p>{review.review}</p>
        </div>
        <div className="review_footer">
          <div>
            <span>Published </span>
            <span>{moment(`${review.dateP}`).format("MMM DD, YYYY")}</span>
          </div>
        </div>
      </div>
    );
  }
};

export default ReviewItem;
