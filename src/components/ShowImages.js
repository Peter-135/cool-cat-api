import React, { useState, useEffect } from "react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { FaCity, FaThumbsUp } from "react-icons/fa";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import axios from "axios";

const ShowImages = ({ actualData, myFavouriteData, actualVotes }) => {
  const [filled, setFilled] = useState(false); // state to see if I can change the color from black to red and vice-versa
  const [editedIndex, setEditedIndex] = useState(null);
  // The actual index to be true or null, so it makes only that row editable, not whole object

  const dataIWant = actualData.data[0];
  const heightOfCat = dataIWant.height;
  const ogFileName = dataIWant.original_filename;
  const imageURLIWant = dataIWant.url;
  const [favourites, setFavourites] = useState([]);
  // console.log(favouritedId, "I AM FAVOURITED ID!");
  console.log(actualData, "MY DISPLAYED DATA!");
  console.log(myFavouriteData, "MY FAVOURITES ARRAY!");

  // console.log(favouritedData, "MY FAVS!!!!! AREN'T YOU??");

  // console.log(dataIWant, "LET'S A GO");
  //   console.log(actualData, "I AM THE REAL DATA");

  //   console.log(imageURLIWant, "SHOULD BE IMAGE-URL");

  // console.log(myFavouriteData.data[5].id, "MY FAVOURITES ID!");

  const arrayData = actualData.data;
  const imageUrl = actualData.data[0];
  //   console.log(imageUrl, "I AM URL");

  //   const justNames = actualData.data;
  // console.log(arrayData, "I AM TRUE");

  // console.log(arrayData[7].id, "I AM NAME");
  //   console.log(arrayData[0].url, "I AM IMAGE URL");
  // actualData.data. original_filename

  // pass in index

  //  if pass state or props variable in the array, it will run every time state or props is updated

  const favouriteHeart = (element) => {
    axios
      .post(
        "https://api.thecatapi.com/v1/favourites",
        {
          // image_id: "Bh7ZzShGR",
          image_id: `${element.id}`,
          // image_id: `${actualData.data.id}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "28d6171b-d8fc-424d-9962-2fe3ab6de934", //NEWEST API KEY
            // "x-api-key": "17d94b92-754f-46eb-99a0-65be65b5d18f",
          }, // headers necessary to favourite info
        }
      )
      .then(function (response) {
        // if filled true, let filled for that index remain true??

        // if (filled === false) {
        // if (filled === true) {
        //   return;
        // } else {
        console.log(response, "I AM FAVOURITED");
        setFavourites([...favourites, element.id]);
        setFilled(true); // from false to true, so terniary operator turns it from black to red // from null to index, so terniary operator turns it from black to red only for that specific object
        // setFavouritedData(response);
        // putting favourited info into state, so I can do the delete part
        // }
        // } else {
        // setFavouritedData([...favouritedData, response]);
        //   return setFilled(true);
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // console.log(favouritedData, "SUPER FAVOURITED");
  // console.log(favouritedData.data.id, "SUPER FAVOURITED");

  const helloWorld = (index) => {
    setFilled(true); // from false to true, so terniary operator turns it from black to red
    setEditedIndex(index); // from null to index, so terniary operator turns it from black to red only for that specific object
  };

  const goodByeWorld = (index) => {
    setFilled(false); // not longer true, so terniary operator below changes it back from red to black

    setEditedIndex(null); // not longer true, so terniary operator below changes it back from red to black for only that index
  };

  const deleteHeart = (element, index) => {
    axios
      .delete(
        `https://api.thecatapi.com/v1/favourites/${myFavouriteData.data[index].id}`, // passing id of favourited data to delete

        {
          headers: {
            "x-api-key": "28d6171b-d8fc-424d-9962-2fe3ab6de934", //NEWEST API KEY
            // "x-api-key": "17d94b92-754f-46eb-99a0-65be65b5d18f",
          },
        }
      )
      .then(function (response) {
        console.log(response, "I AM DELETE RESPONSE");
        setFilled(false); // not longer true, so terniary operator below changes it back from red to black
        var favState = [...favourites];
        var i = favState.indexOf(element.id);
        favState.splice(i, 1);
        setFavourites(favState); // save favourites array in local storage???
        setEditedIndex(null); // not longer true, so terniary operator below changes it back from red to black for only that index
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // Make a copy of that data, then add it on to favouritedData?

  const upVoting = (index) => {
    axios
      .post(
        "https://api.thecatapi.com/v1/votes",
        {
          // image_id: "Bh7ZzShGR",
          image_id: `${actualData.data[index].id}`,
          value: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "28d6171b-d8fc-424d-9962-2fe3ab6de934", //NEWEST API KEY
            // "x-api-key": "17d94b92-754f-46eb-99a0-65be65b5d18f",
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
    axios
      .post(
        "https://api.thecatapi.com/v1/votes",
        {
          image_id: `${actualData.data[index].id}`,
          value: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "28d6171b-d8fc-424d-9962-2fe3ab6de934", //NEWEST API KEY
            // "x-api-key": "17d94b92-754f-46eb-99a0-65be65b5d18f",
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
                  315
                  {/* {`${Math.floor(Math.random() * 500) + 1}`} */}
                  {/* Math.random() returns a random decimal no. between 0 and 1 (strictly less than 1) */}
                  {/* Math.floor() returns the largest integer less than or equal to a given number.  */}
                  {/* Add 1 so minimum no. is 1 instead of 0 and max no. is 1 more too */}
                  {/* Times by no. you want range between, e.g. for no. between 1 and 10, *10 */}
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
                      favourites.includes(element.id)
                        ? deleteHeart(element, index)
                        : favouriteHeart(element)
                    }
                  >
                    <AiFillHeart
                      size="20px"
                      color={favourites.includes(element.id) ? "red" : ""}
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

// Something I was trying

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
