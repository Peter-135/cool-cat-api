import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Modal, Button, Upload, message } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./index.css";
import { MdFileUpload } from "react-icons/md";
import { BsCloudUpload, BsThreeDots } from "react-icons/bs";
import axios from "axios";
import ShowImages from "./components/ShowImages";

//importing packages, components and React I need to make this app

function App() {
  const [data, setData] = useState([]); // data to store objects of cats I'll need
  const [loading, setLoading] = useState(false);
  // When app loads, will show "Loading" because of this and terniary operator at the bottom

  const [favouritedData, setFavouritedData] = useState([]);
  //the favourited images data to be put into state
  const [favouriteLoading, setFavouriteLoading] = useState(false);
  // When app loads, will show "Loading" because of this and terniary operator at the bottom
  const [votes, setVotes] = useState([]);
  // The votes on the cats are saved into this array
  const [votesLoading, setVotesLoading] = useState(false);
  // When app loads, will show "Loading" because of this and terniary operator at the bottom
  const [isModalVisible, setIsModalVisible] = useState(false); // state to show if Modal is visible or not

  useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/votes?limit=100", {
        //gets all votes info into array of objects //
        headers: {
          "x-api-key": "28d6171b-d8fc-424d-9962-2fe3ab6de934", // API KEY, need to access data
        },
      }) //used to get info from API endpoint, in our case get cat info from endpoint
      .then((response) => {
        //info of votes in response object
        setVotes(response); // puts our response (our votes) in votes state
        setVotesLoading(true); // sets votesLoading to true, and with terniary operator (when favouriteLoading and loading statesare true), displays everything else
        // console.log(response);
        console.log(response, "I AM VOTES ARRAY"); //See info on votes array of objects
      })
      .catch((error) => {
        console.log(error); //catches error if there are any
      });
  }, []);

  useEffect(() => {
    // use in axios call with parameters,  https://api.thecatapi.com/v1/images/

    // Newest API key: 28d6171b-d8fc-424d-9962-2fe3ab6de934

    // "https://api.thecatapi.com/v1/images/?limit=10";
    axios
      .get("https://api.thecatapi.com/v1/favourites?limit=100", {
        //get all favourited images in array of object. the ?limit=100 is query parameter to show that array is limited to 100 objects (100 favourites)
        headers: {
          "x-api-key": "28d6171b-d8fc-424d-9962-2fe3ab6de934", //API KEY, need to access data
        },
      }) //used to get info from API endpoint, in our case get cat info from endpoint
      .then((response) => {
        //info in response object
        setFavouritedData(response); // puts our response in state favouritedData
        setFavouriteLoading(true); // sets favouriteLoading to true, and with terniary operator (when votesLoading and loading statesare true), displays everything else
        console.log(response, "I AM FAVOURITES ARRAY"); //shows favourites array in browser
      })
      .catch((error) => {
        console.log(error); // catches error is there are any
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/images/?limit=12", {
        //gets images objects in array, for display later. ?limit=12 limits data to 12 images to be displayed
        headers: {
          "x-api-key": "28d6171b-d8fc-424d-9962-2fe3ab6de934",
        },
      }) //used to get info from API endpoint, in our case get cat info from endpoint
      .then((response) => {
        //info in response object
        setData(response); // puts our response in state data
        setLoading(true);

        // sets Loading to true, and with terniary operator (when votesLoading and favouriteloading statesare true), displays everything else

        // sets loading to false, due to terniary operator in return, displays everything else

        console.log(response, "I AM DATA"); //shows images data in browser
      })
      .catch((error) => {
        console.log(error); // catches error is there are any
      });
  }, []);

  // This dragger and upload is from Ant Design, allows one to upload file and send it to an API endpoint
  const { Dragger } = Upload; // this component and const props below is used to upload file
  const props = {
    name: "file", // the name of uploading file
    multiple: false, //can only upload one file at a time
    action: "https://api.thecatapi.com/v1/images/upload", // sends this image to the API endpoint
    headers: {
      "x-api-key": "28d6171b-d8fc-424d-9962-2fe3ab6de934", //NEWEST API KEY

      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    }, // need API key to send up info
    onChange(info) {
      console.log(info, "THIS IS WHAT I WANT TO SEE");

      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info);
        console.log(info.file, info.fileList, "THIS IS INFO.FILE");
      }
      // info.file is information about the file being uploaded (the image file), fileList shows all the files being uploaded if there are multiple (e.g. if multiple set to true and you upload more than one file)
      if (status === "done") {
        // console.log(info);
        message.success(`${info.file.name} file uploaded successfully.`);
        // if file is successfully uploaded, shows file uploaded successfuly
      } else if (status === "error") {
        // console.log(info);
        message.error(`${info.file.name} file upload failed.`);
        // if file failed to upload, shows file upload failed
      }
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files); // This drags the files from a user's desktop to the browser
    },
  };

  const showModal = () => {
    setIsModalVisible(true);
  }; // changes modal state to true, so opens modal. Attached to "Add New Button"

  const handleOk = () => {
    setIsModalVisible(false);
  }; // changes modal state to false, so close modal

  const handleCancel = () => {
    setIsModalVisible(false);
  }; // changes modal state to false, so close modal. Attached to cancel button

  return (
    <div className="App">
      {/* if loading, favouriteLoading and votesLoading states are true, display all my data. if any of them are false (becasue data hasn't loaded yet), display "Loading..." */}
      {loading && favouriteLoading && votesLoading ? (
        <div>
          <div className="button-movement">
            <Button
              type="primary"
              className="main-button-style"
              onClick={showModal} //button that opens modal
            >
              {/* MdFileUpload is icon within button */}
              <MdFileUpload className="icon-styling" size="20px" />
              Add New
            </Button>
          </div>
          {/* Passing in data, favouritedData and votes states into ShowImages component as "props" (with different names), so that I can use that info and data within the ShowImages component */}
          <ShowImages
            actualData={data}
            myFavouriteData={favouritedData}
            actualVotes={votes}
          />
          <Modal
            visible={isModalVisible} //state to see if modal is visible or not
            title="Upload File" //title at top of modal
            onOk={handleOk} //calls handleOk func
            onCancel={handleCancel} //calls handleCancel func, so closes button when cancel is clicked on Modal
            footer={[
              <div className="button-styling">
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>
                {/* above button calls handleCancel func */}
              </div>,
            ]}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
              {/* this code allows me to upload file from cpu to my app */}
            </Dragger>
            ,
          </Modal>
        </div>
      ) : (
        // shows Loading when false, shows everything else when true (both loading,favouriteLoading and votesLoading). Allows data to load effectively and "Loading" shows user app is working. Makes use of JavaScript logic with the terniary operator
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
