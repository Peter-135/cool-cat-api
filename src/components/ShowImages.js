import React from "react";

const ShowImages = ({ actualData }) => {
  const dataIWant = actualData.data[0];
  const heightOfCat = dataIWant.height;
  const ogFileName = dataIWant.original_filename;
  const imageURLIWant = dataIWant.url;

  console.log(actualData, "I AM THE REAL DATA");

  //   console.log(heightOfCat, "SHOULD BE HEIGHT");
  //   console.log(ogFileName, "SHOULD BE OG FILENAME");
  console.log(imageURLIWant, "SHOULD BE IMAGE-URL");

  return (
    <div>
      <h1>Hello World</h1>
      <p>Here I come!</p>
      <div className="super">
        <h1>Hi guys</h1>

        <div className="background">
          <img className="smaller-sizing" src={imageURLIWant} />
          {/* puts images url from data into file, so using img src I can display the image */}
          <img className="smaller-sizing" src={imageURLIWant} />

          <img className="smaller-sizing" src={imageURLIWant} />
        </div>
      </div>
    </div>
  );
};

export default ShowImages;
