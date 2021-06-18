import React, { useState } from "react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { FaCity, FaThumbsUp } from "react-icons/fa";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ShowImages = ({ actualData }) => {
  const [filled, setFilled] = useState(false); // state to see if I can change the color from black to red and vice-versa
  const [editedIndex, setEditedIndex] = useState(null);
  // i think the  actual index to be true or null, so it makes only that row editable, not whole object
  const dataIWant = actualData.data[0];
  const heightOfCat = dataIWant.height;
  const ogFileName = dataIWant.original_filename;
  const imageURLIWant = dataIWant.url;

  //   console.log(actualData, "I AM THE REAL DATA");

  //   console.log(heightOfCat, "SHOULD BE HEIGHT");
  //   console.log(ogFileName, "SHOULD BE OG FILENAME");
  //   console.log(imageURLIWant, "SHOULD BE IMAGE-URL");

  const arrayData = actualData.data;
  const imageUrl = actualData.data[0];
  //   console.log(imageUrl, "I AM URL");

  //   const justNames = actualData.data;
  console.log(arrayData, "I AM TRUE");

  //   console.log(arrayData[0].original_filename, "I AM NAME");
  //   console.log(arrayData[0].url, "I AM IMAGE URL");
  // actualData.data. original_filename

  const helloWorld = (index) => {
    console.log("Hello World");
    setFilled(true); // changes filled state to true and in turn allows terniary operator to turn the heart color red
    setEditedIndex(index);

    // should call second api (clicking unfavourite calls this api end and changes text on the button to heart unfilled)
  };

  const goodByeWorld = (index) => {
    console.log("Goodbye World");
    setFilled(false); // changes filled state to false and in turn allows terniary operator to turn the heart color black
    setEditedIndex(null);

    // should call first api (click favourite calls this api) and changes button to filled
  };

  return (
    <div>
      <div className="background-styling">
        {arrayData.map((element, index) => {
          return (
            <div className="div-styling" key={element.id}>
              <div>
                <img className="smaller-sizing" src={element.url} />
              </div>
              <div className="favourite-spacing">
                <span>
                  <FaCity className="bit-of-space-two" />
                  135
                </span>
                <div className="round-heart">
                  <label
                    onClick={() =>
                      filled && index == editedIndex
                        ? goodByeWorld(index)
                        : helloWorld(index)
                    }
                  >
                    <AiFillHeart
                      size="20px"
                      color={filled && index == editedIndex ? "red" : ""}
                    />
                  </label>
                </div>
                {/* <button className="favourite">
                  {" "}
                  <FaThumbsUp /> Favourite
                </button> */}
              </div>
              <div className="two-buttons">
                <button className="upvote">
                  <FiThumbsUp className="bit-of-space" />
                  Upvote
                </button>
                <button className="downvote">
                  {" "}
                  <FiThumbsDown className="bit-of-space" />
                  Downvote
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowImages;
