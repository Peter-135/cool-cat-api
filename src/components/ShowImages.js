import React, { useState } from "react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { FaCity, FaThumbsUp } from "react-icons/fa";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";
import axios from "axios";

const ShowImages = ({ actualData }) => {
  const [filled, setFilled] = useState(false); // state to see if I can change the color from black to red and vice-versa
  const [editedIndex, setEditedIndex] = useState(null);
  // i think the  actual index to be true or null, so it makes only that row editable, not whole object
  const [favouritedData, setFavouritedData] = useState([]);

  const dataIWant = actualData.data[0];
  const heightOfCat = dataIWant.height;
  const ogFileName = dataIWant.original_filename;
  const imageURLIWant = dataIWant.url;

  // console.log(favouritedId, "I AM FAVOURITED ID!");

  //   console.log(actualData, "I AM THE REAL DATA");

  //   console.log(imageURLIWant, "SHOULD BE IMAGE-URL");

  const arrayData = actualData.data;
  const imageUrl = actualData.data[0];
  //   console.log(imageUrl, "I AM URL");

  //   const justNames = actualData.data;
  // console.log(arrayData, "I AM TRUE");

  //   console.log(arrayData[0].original_filename, "I AM NAME");
  //   console.log(arrayData[0].url, "I AM IMAGE URL");
  // actualData.data. original_filename

  const helloWorld = (index) => {
    // console.log("Hello World");
    setFilled(true); // changes filled state to true and in turn allows terniary operator to turn the heart color red
    setEditedIndex(index);

    // should call first api (clicking favourite calls this api end and changes text on the button to heart to filled)
  };

  const goodByeWorld = (index) => {
    //     console.log("Goodbye World");

    setFilled(false);
    // changes filled state to false and in turn allows terniary operator to turn the heart color black
    setEditedIndex(null);

    //     // should call second api (click favourite calls this api) and changes button to unfilled
  };

  //     const favouriteHeart = (index) => {
  //       useEffect(() => {
  //         axios.post("https://api.thecatapi.com/v1/favourites",
  //   {
  //     headers: {
  //         "Content-Type": "application/json",
  //       "x-api-key": "17d94b92-754f-46eb-99a0-65be65b5d18f",
  //     },
  //     {
  //         "image_id": {arrayData.id}
  //     }, // template literal
  // }).then((response) => {
  // console.log(response);
  //     setFilled(true); //should be within useEffect
  //     setEditedIndex(index); // should be within useEffect
  // }).catch((error) => {
  //     console.log(error);
  //   })},

  // []);

  // pass in index
  // useEffect(() => {
  const favouriteHeart = (index) => {
    // const favouritedId = favouritedData.data;
    // useEffect(() => {
    axios
      .post(
        "https://api.thecatapi.com/v1/favourites",
        {
          // image_id: "Bh7ZzShGR",
          image_id: `${arrayData.id}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "17d94b92-754f-46eb-99a0-65be65b5d18f",
          }, // headers necessary to favourite info
        }
      )
      .then(function (response) {
        console.log(response, "I AM FAVOURITED");
        setFilled(true);
        setEditedIndex(index);
        setFavouritedData(response); // putting favourited info into state, so I can do the delete part
      })
      .catch(function (error) {
        console.log(error);
      });
    // }, []);
  };

  // console.log(favouritedData, "SUPER FAVOURITED");
  // console.log(favouritedData.data.id, "SUPER FAVOURITED");

  const deleteHeart = (index) => {
    axios
      .delete(
        `https://api.thecatapi.com/v1/favourites/${favouritedData.data.id}`, // passing id of favourited data to delete

        {
          headers: {
            "x-api-key": "17d94b92-754f-46eb-99a0-65be65b5d18f",
          },
        }
      )
      .then(function (response) {
        console.log(response, "I AM DELETE RESPONSE");
        setFilled(false);

        setEditedIndex(null);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // Make a copy of that data, then add it on to favouritedData?

  const upVoting = (index) => {
    // const favouritedId = favouritedData.data;
    // useEffect(() => {
    axios
      .post(
        "https://api.thecatapi.com/v1/votes",
        {
          // image_id: "Bh7ZzShGR",
          image_id: `${arrayData.id}`,
          value: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "17d94b92-754f-46eb-99a0-65be65b5d18f",
          }, // headers necessary to favourite info
        }
      )
      .then(function (response) {
        console.log(response, "I AM UPVOTE");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const downVoting = (index) => {
    // const favouritedId = favouritedData.data;
    // useEffect(() => {
    axios
      .post(
        "https://api.thecatapi.com/v1/votes",
        {
          // image_id: "Bh7ZzShGR",
          image_id: `${arrayData.id}`,
          value: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "17d94b92-754f-46eb-99a0-65be65b5d18f",
          }, // headers necessary to favourite info
        }
      )
      .then(function (response) {
        console.log(response, "I AM DOWNVOTE");
      })
      .catch(function (error) {
        console.log(error);
      });
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
                    // onClick={() =>
                    //   filled && index == editedIndex
                    //     ? goodByeWorld(index)
                    //     : helloWorld(index)
                    // }
                    // onClick={() =>
                    //   filled && index == editedIndex
                    //     ? goodByeWorld(index)
                    //     : favouriteHeart(index)
                    // }
                    onClick={() =>
                      filled && index == editedIndex
                        ? deleteHeart(index)
                        : favouriteHeart(index)
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
                <button className="upvote" onClick={() => upVoting(index)}>
                  <FiThumbsUp className="bit-of-space" />
                  Upvote
                </button>
                <button className="downvote" onClick={() => downVoting(index)}>
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
