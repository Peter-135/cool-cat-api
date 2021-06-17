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
      <h1>Hello World</h1>
      <p>Here I come!</p>
      <div className="super">
        <h1>Hi guys</h1>
        {/* <h1>{arrayData[0].original_filename}</h1>
        <img className="smaller-sizing" src={imageURLIWant} /> */}

        {/* <div className="background"> */}
        {/* <img className="smaller-sizing" src={imageURLIWant} /> */}
        {/* puts images url from data into file, so using img src I can display the image */}
        {/* <img className="smaller-sizing" src={imageURLIWant} />

          <img className="smaller-sizing" src={imageURLIWant} /> */}
        {/* </div> */}
        {/* 
        <div className="background">
          {arrayData.map((element, index) => {
            return <h1>{element.original_filename}</h1>;
          })}
          </div>
          {/* VERY GOOD STUFF! */}

        <div className="background">
          {arrayData.map((element, index) => {
            return <img className="smaller-sizing" src={element.url} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ShowImages;
