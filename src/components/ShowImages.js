import React from "react";

const ShowImages = ({ actualData }) => {
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
  return (
    <div>
      <div className="background-styling">
        {arrayData.map((element, index) => {
          return (
            <div className="div-styling">
              <div>
                <img className="smaller-sizing" src={element.url} />
              </div>
              <div className="favourite-spacing">
                <span>135</span>
                <button className="favourite">Favourite</button>
              </div>
              <div className="two-buttons">
                <button className="upvote">Upvote</button>
                <button className="downvote">Downvote</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowImages;
