import React, { Component } from "react";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReviewItem from "./ReviewItem.jsx";
import ReviewSum from "./ReviewSum.jsx";
import Map from "./Map.jsx";
// import MapTwo from "./MapTwo.jsx";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      currentPage: 1,
      reviewPerPage: 6,
      mouseHover: false,
      listTotal: 0,
      adj: undefined,
      minusDis: true,
      addDis: false,
      allowed: 0,
      clickNum: 0,
      zip: "90210"
    };
    this.getReviews = this.getReviews.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);
    this.topButtons = React.createRef();
    // kat's sticky nav ref
    this.reviewsDiv = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.checkRange = this.checkRange.bind(this);
  }

  getReviews = async () => {
    try {
      let adj = ["Terrible", "Poor", "Good", "Wonderful", "Excellent"];
      let rand = Math.floor(Math.random() * 10000000);
      // console.log("This is id: " + rand);
      const results = await axios.get(`/reviews/${rand}`);
      // const zipResults = await axios.get(`/zips/${rand}`);
      // console.log(zipResults);
      // console.log("this is David Kim", results);
      const sortedResults = await results.data.sort((a, b) => {
        return new Date(b.dateS) - new Date(a.dateS);
      });
      const total =
        (await results.data.reduce((a, b) => a + b.rating, 0)) /
        results.data.length;
      //console.log(total);
      let allowedClicks = await Math.floor(results.data.length / 6);
      //console.log('allowed:' + allowedClicks)
      if (results.data.length === 6 || allowedClicks === 0) {
        this.setState({
          addDis: true
        });
      }
      if (results.data.length % 6 === 0) {
        allowedClicks = allowedClicks - 1;
        //console.log('new allowed clicks: ' + allowedClicks)
      }
      console.log(results.data);
      this.setState({
        reviews: sortedResults,
        listTotal: total,
        adj: adj[Math.round(total - 1)],
        allowed: allowedClicks,
        zip: results.data[0].zipcode
      });

      // console.log(results.data);
    } catch (err) {
      console.error("Could not fetch reviews: " + err);
    }
  };

  handleAddClick() {
    this.setState(
      {
        currentPage: this.state.currentPage + 1,
        clickNum: this.state.clickNum + 1
      },
      () => {
        this.checkRange();
        this.handleScroll();
        //console.log('add current:' + this.state.currentPage)
        //console.log('clicks: ' + this.state.clickNum)
      }
    );
  }

  handleMinusClick() {
    this.setState(
      {
        currentPage: this.state.currentPage - 1,
        clickNum: this.state.clickNum - 1
      },
      () => {
        this.checkRange();
        this.handleScroll();
        //console.log('minus current:' + this.state.currentPage)
        //console.log('clicks: ' + this.state.clickNum)
      }
    );
  }

  handleScroll() {
    if (this.topButtons.current) {
      this.topButtons.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }

  componentDidUpdate() {
    this.handleScroll();
  }

  checkRange() {
    const { clickNum, allowed } = this.state;
    if (clickNum >= 1) {
      this.setState({
        minusDis: false
      });
      //console.log('this is minusDis: ' + this.state.minusDis)
    } else {
      this.setState({
        minusDis: true
      });
    }
    if (clickNum >= allowed) {
      this.setState({
        addDis: true
      });
      console.log("this is addDis: " + this.state.addDis);
    } else {
      this.setState({
        addDis: false
      });
      console.log("this is addDis: " + this.state.addDis);
    }
  }

  componentDidMount() {
    this.getReviews();
  }

  render() {
    // console.log(this.state.zip);
    if (this.state.reviews.length === 0) {
      return (
        <div className="no_reviews">
          <span>No Reviews yet...</span>
        </div>
      );
    } else {
      let length;
      const {
        reviews,
        currentPage,
        reviewPerPage,
        adj,
        minusDis,
        addDis
      } = this.state;
      const indexOfLastReview = currentPage * reviewPerPage;
      const indexOfFirstReview = indexOfLastReview - reviewPerPage;
      const currentReviews = reviews.slice(
        indexOfFirstReview,
        indexOfLastReview
      );
      if (indexOfLastReview > reviews.length) {
        length = reviews.length;
      } else if (indexOfLastReview <= reviews.length) {
        length = indexOfLastReview;
      }

      const renderReviews = currentReviews.map((review, index) => {
        return <ReviewItem review={review} key={index} />;
      });
      return (
        <div ref={this.reviewsDiv}>
          <div className="review_container">
            <span ref={this.topButtons}></span>
            <ReviewSum
              rating={this.state.listTotal}
              review={reviews}
              adjective={adj}
            />
            <div className="review_pagination">
              <button
                className="review_btn"
                onClick={this.handleMinusClick}
                disabled={minusDis}
              >
                <FiChevronLeft
                  color={minusDis ? "#ddddde" : "#717171"}
                  size={16}
                />
              </button>
              <span>
                <strong className="review_out">{`${indexOfFirstReview +
                  1}-${length}`}</strong>
                {` of ${reviews.length}`}
              </span>
              <button
                className="review_btn"
                onClick={this.handleAddClick}
                disabled={addDis}
              >
                <FiChevronRight
                  color={addDis ? "#ddddde" : "#717171"}
                  size={16}
                />
              </button>
            </div>
            <div>{renderReviews}</div>
            <div className="review_pagination">
              <button
                className="review_btn"
                onClick={this.handleMinusClick}
                disabled={minusDis}
              >
                <FiChevronLeft
                  color={minusDis ? "#ddddde" : "#717171"}
                  size={16}
                />
              </button>
              <span>
                <strong className="review_out">
                  {`${indexOfFirstReview + 1}-${length}`}
                </strong>
                {` of ${reviews.length}`}
              </span>
              <button
                className="review_btn"
                onClick={this.handleAddClick}
                disabled={addDis}
              >
                <FiChevronRight
                  color={addDis ? "#ddddde" : "#717171"}
                  size={16}
                />
              </button>
            </div>
          </div>
          <div>
            <Map zip={this.state.zip} />
          </div>
          {/* <div>
            <MapTwo zip={this.state.zip} />
          </div> */}
        </div>
      );
    }
  }
}

export default Reviews;
