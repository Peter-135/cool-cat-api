import React, { useState, useEffect } from "react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { FaCity, FaThumbsUp } from "react-icons/fa";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import axios from "axios";

// capturing the props that are passed in from App.js, destructuring the props so I can use the values into the variables (states) actualData, myFavouritedData, actualVotes
const ShowImages = ({ actualData, myFavouriteData, actualVotes }) => {
  const [filled, setFilled] = useState(false); // state to see if I can change the color from black to red and vice-versa
  const [editedIndex, setEditedIndex] = useState(null);
  // The actual index to be true or null, so it makes only that row editable, not whole object

  //dot and bracket notation to access the information (data) that I need
  const dataIWant = actualData.data[0];
  const heightOfCat = dataIWant.height;
  const ogFileName = dataIWant.original_filename;
  const imageURLIWant = dataIWant.url;
  const [favourites, setFavourites] = useState([]); //state of the indexes of the array, which is needed to make multiple heart clickable and target them
  console.log(favourites, "SUPER DUPER FAVOURITES INDEXES");
  // console.log(favouritedId, "I AM FAVOURITED ID!");
  console.log(actualData, "MY DISPLAYED DATA!");
  console.log(myFavouriteData, "MY FAVOURITES ARRAY!");

  useEffect(() => {
    const temp = localStorage.getItem("favourites");
    const realLoadedFavourites = JSON.parse(temp); //converts JSON back to Javascript

    if (realLoadedFavourites) {
      setFavourites(realLoadedFavourites);
    }
    // so only grab data of array indexes from local storage if it exists
  }, []);
  // runs once when the component is loaded if empty array []
  //localStorage.getItem retrieves items from localStorage

  useEffect(() => {
    const temp = JSON.stringify(favourites); // turns array of index data into strings
    localStorage.setItem("favourites", temp); // saves that data into localStorage
  }, [favourites]);

  //  if pass state or props variable in the array, it will run every time state or props is updated

  const arrayData = actualData.data;
  const imageUrl = actualData.data[0]; // pass in index to access the url

  const favouriteHeart = (element) => {
    //pass in element from map method (specific  object of a cat that's being displayed)
    axios // axios use to access api, post method to post something, in my case, post our favourites to the api endpoint
      .post(
        "https://api.thecatapi.com/v1/favourites", //cat api endpoint to pass image id into
        {
          // image_id: "Bh7ZzShGR",
          image_id: `${element.id}`, //from map method, we have element, which is each object being displayed in cat app. use dot notation to access id of that element and send it up
          // image_id: `${actualData.data[index].id}`,
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
        console.log(response, "I AM FAVOURITED");
        setFavourites([...favourites, element.id]);
        // spread operator on favourites (array of indexes), then adds the specific id being clicked to the array
        setFilled(true); // from false to true, so terniary operator turns it from black to red // from null to index, so terniary operator turns it from black to red only for that specific object. But with favourites array and the "includes" javascript method in the terniary operator at the bottom , can click multiple items, since it add the specific id to array of indexes, not just the sole index

        // idea I tried
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

  // don't actually need helloWorld anymore...
  const helloWorld = (index) => {
    setFilled(true); // from false to true, so terniary operator turns it from black to red
    setEditedIndex(index); // from null to index, so terniary operator turns it from black to red only for that specific object
  };

  //don't actually need goodByeWorld anymore...
  const goodByeWorld = (index) => {
    setFilled(false); // not longer true, so terniary operator below changes it back from red to black

    setEditedIndex(null); // not longer true, so terniary operator below changes it back from red to black for only that index
  };

  const deleteHeart = (element, index) => {
    //passing in element (object of image being displayed from map method) and index of the element
    axios // axios used to access api, delete method to delete something, in my case to delete something from the api endpoint
      .delete(
        `https://api.thecatapi.com/v1/favourites/${myFavouriteData.data[index].id}`, // passing id of favourited data to delete, so api endpoint will delete that favourited image

        {
          headers: {
            "x-api-key": "28d6171b-d8fc-424d-9962-2fe3ab6de934", //NEWEST API KEY
            // "x-api-key": "17d94b92-754f-46eb-99a0-65be65b5d18f",
          }, // need headers to access api
        }
      )
      .then(function (response) {
        console.log(response, "I AM DELETE RESPONSE");
        setFilled(false); // not longer true, so terniary operator below changes it back from red to black
        var favState = [...favourites]; //gets favourites of index in favState variable, so that we don't mutate the state directly, instead through favState variable
        var i = favState.indexOf(element.id); //sets i to be the index of the element being clicked on
        favState.splice(i, 1); //using splice method to only delete the index being clicked, and only 1 element to delete
        setFavourites(favState); // updates favourites array, with the index being deleted
        // can save favourites array in local storage so that hearts remain, I do this above with local storage and useEffect
        setEditedIndex(null); // not longer true, so terniary operator below changes it back from red to black for only that index
      })
      .catch(function (error) {
        console.log(error); // catches errors if there are any errors made
      });
  };

  const upVoting = (index) => {
    // passes in index to function
    axios // used to access API endpoint, using post method to post a vote
      .post(
        "https://api.thecatapi.com/v1/votes", // specific endpoint to use to point a vote
        {
          // image_id: "Bh7ZzShGR",
          image_id: `${actualData.data[index].id}`, // using dot and bracket notation, passing image id to endpoint, needed to upvote
          value: 1, // value 1 means upvote
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
        console.log(response, "I AM UPVOTE"); //shows that upvote info in browser console
      })
      .catch(function (error) {
        console.log(error); // shows errors if there are any
      });
  };

  const downVoting = (index) => {
    // pass in index to function
    axios // used to access API endpoint, using post method to post a vote
      .post(
        "https://api.thecatapi.com/v1/votes", // specific endpoint to use to point a vote
        {
          image_id: `${actualData.data[index].id}`, // using dot and bracket notation, passing image id to endpoint, needed to downvote
          value: 0, // value 0 means downvote
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
      }) // using dot and bracket notation, passing image id to endpoint, needed to downvote
      .catch(function (error) {
        console.log(error); // shows errors if there are any
      });
  };

  return (
    <div>
      <div className="background-styling">
        {/* map method used over arrayData in order to display all my images, hearts, buttons, etc in the ui. Lots of styling done. passes in element (object of images) and the index (index of the image) */}
        {arrayData.map((element, index) => {
          return (
            <div className="div-styling" key={element.id}>
              {/* map method needs a key, so using the element unique as a key, access through dot notation */}
              <div>
                <img className="smaller-sizing" src={element.url} />
                {/* displaying all my images through dot notation */}
              </div>
              <div className="favourite-spacing">
                <span>
                  <FaCity
                    // cool city icon
                    className="bit-of-space-two"
                  />
                  315
                  {/* Don't nee Math.random() and Math.floor() but I want to keep this explanation, hence it is here */}
                  {/* {`${Math.floor(Math.random() * 500) + 1}`} */}
                  {/* Math.random() returns a random decimal no. between 0 and 1 (strictly less than 1) */}
                  {/* Math.floor() returns the largest integer less than or equal to a given number.  */}
                  {/* Add 1 so minimum no. is 1 instead of 0 and max no. is 1 more too */}
                  {/* Times by no. you want range between, e.g. for no. between 1 and 10, *10 */}
                </span>
                <div className="round-heart">
                  <label
                    onClick={() =>
                      favourites.includes(element.id)
                        ? deleteHeart(element, index)
                        : favouriteHeart(element)
                    }
                    //The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate
                    //terniary operator, if favourites (array of indexes) is true (the array include specific index to delete), calls deleteHeart func which deletes a heart (deletes index)
                    // if favourites is false (array doesn't include specific index to delete), calls favouriteHeart func, which adds a heart (and adds the index)
                  >
                    <AiFillHeart
                      // cool heart icon
                      size="20px"
                      color={favourites.includes(element.id) ? "red" : ""}
                    />
                    {/* The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate */}
                    {/* terniary operator, if favourites (array of indexes) is true, make heart turn red */}
                    {/* if favourites is false, make heart go black (have no color) */}
                  </label>
                </div>
              </div>
              <div className="two-buttons">
                <button className="upvote" onClick={() => upVoting(index)}>
                  {/* Function "upVoting" on upvote button */}
                  <FiThumbsUp className="bit-of-space" />
                  {/* cool thumbs up icon */}
                  Upvote
                </button>
                <button className="downvote" onClick={() => downVoting(index)}>
                  {/* Function "downVoting" on downvote button */}
                  <FiThumbsDown className="bit-of-space" />
                  {/* cool thumbs down icon */}
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
