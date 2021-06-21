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

function App() {
  const [data, setData] = useState([]); // data to store objects of cats I'll need
  const [isModalVisible, setIsModalVisible] = useState(false); // state for if Modal is visible or not
  const [loading, setLoading] = useState(true);
  // When app loads, will show "Loading" because of this and terniary operator at the bottom

  // I think I need state to store objects that will have the cat information, like the image, button, likes, etc

  // right api call, uses, learn how to use axios, how to send the data, post

  // posting to the endpoint

  //https://api.thecatapi.com/v1/images/upload

  //link for axios api call
  //api key: 17d94b92-754f-46eb-99a0-65be65b5d18f

  // {
  //   header: "17d94b92-754f-46eb-99a0-65be65b5d18f",
  // }// maybe use info within axios??

  // find out what to pass to the file property
  // use strings
  // file: "correct-file-to-put-in-here"

  useEffect(() => {
    // use in axios call with parameters,  https://api.thecatapi.com/v1/images/

    // "https://api.thecatapi.com/v1/images/?limit=10";
    axios
      .get("https://api.thecatapi.com/v1/images/?limit=12", {
        headers: {
          "x-api-key": "17d94b92-754f-46eb-99a0-65be65b5d18f",
        },
      }) //used to get info from API endpoint, in our case get cat info from endpoint
      .then((response) => {
        //info in response object
        setData(response); // puts our response in state data
        setLoading(false); // sets loading to false, due to terniary operator in return, displays everything else
        // console.log(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { Dragger } = Upload; // this component and const props below is used to upload file
  const props = {
    name: "file", // the name of uploading file
    multiple: false,
    action: "https://api.thecatapi.com/v1/images/upload", // sends this image to the API endpoint
    headers: {
      "x-api-key": "17d94b92-754f-46eb-99a0-65be65b5d18f",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    onChange(info) {
      console.log(info, "THIS IS WHAT I WANT TO SEE");

      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info);
        console.log(info.file, info.fileList, "THIS IS INFO.FILE");
      }
      if (status === "done") {
        // console.log(info);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        // console.log(info);
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const showModal = () => {
    setIsModalVisible(true);
  }; // changes modal state to true, so opens modal

  const handleOk = () => {
    setIsModalVisible(false);
  }; // changes modal state to false, so close modal

  const handleCancel = () => {
    setIsModalVisible(false);
  }; // changes modal state to false, so close modal

  return (
    <div className="App">
      {loading ? ( // shows Loading when true, shows everything else when false. Allows data to load effectively and "Loading" shows user app is working.
        <h1>Loading...</h1>
      ) : (
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
          <ShowImages actualData={data} />
          <Modal
            visible={isModalVisible} //state to see if modal is visible or not
            title="Upload File" //title at top of modal
            onOk={handleOk} //calls handleOk func
            onCancel={handleCancel} //calls handleCancel func
            footer={[
              //buttons within footer
              // THE GOOGLE BUTTON MIGHT GIVE ME A CLUE!
              // <Button
              //   key="link"
              //   href="https://google.com"
              //   type="primary"
              //   onClick={handleOk}
              // >
              //   Search on Google
              // </Button>,

              //flexbox on buttons
              <div className="button-styling">
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>
                {/* above button calls handleCancel func */}
                {/* <Button key="submit" type="primary" onClick={handleOk}>
              Submit
            </Button> */}
                {/* above button calls handleOk func */}
                {/* <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload> */}
                {/* above allows me to upload file from cpu to my app */}
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
            </Dragger>
            ,
          </Modal>
        </div>
      )}
    </div>
  );
}

export default App;

// axios
//   .post("/https://api.thecatapi.com/v1/images/upload", {
//     header: "17d94b92-754f-46eb-99a0-65be65b5d18f",
//     file: "file",
//     sub_id: "string",
//   })

//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// for 2nd part, I think you use get with axios to get info from that api endpoint (check first two projects to see how I did that)
