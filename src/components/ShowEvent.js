"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const ShowEvent = ({ visible, handleCLick, data }) => {
  const [files, setFiles] = useState([]);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const handleSubmit = () => {
    const formdata = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append("files[]", files[i]);
    }
    formdata.append("eventId", data.eventId);
    formdata.append("eventName", data.name);
    formdata.append("eventDate",data.date);
    fetch("http://localhost:3000/api/addEventFiles", {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        toast.success("Files uploaded successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("Error uploading files", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleDelete = () => {
    const formdata = new FormData();
    formdata.append("eventId", data.eventId);

    fetch("http://localhost:3000/api/deleteEvent", {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        toast.success("Event deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleCLick();
      })
      .catch((err) => {
        toast.error("Error deleting event", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          progress: undefined,
        });
      });
  };

  useEffect(() => {
    if (visible) {
      const sentdata = {
        uri: data.name+data.date,
      };
      fetch("http://localhost:3000/api/getEventFiles", {
        method: "POST",
        body: JSON.stringify(sentdata),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((jsonData) => {
          setUploadedFiles(jsonData.result);
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    }
  }, [uploadedFiles, visible]);



  useEffect(() => {

    if(visible){
      

        const speaker_Id = data.speaker_id;
        fetch("http://localhost:3000/api/getSpeakers", {
          method: "POST",
          body: JSON.stringify({speaker_Id}),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        }).then((data) => {


        setSpeakers(data.result);

        }).catch((error) => {
          console.error("Error:", error);
        });
      

      

    }else{
      setSpeakers([]);
      setUploadedFiles([]);
    }
    
    
  }, [visible])
  

  if (!visible) {
    
    return null;
  }
  return (
    <div className="fixed inset-x-72 inset-y-5 bg-slate-200 overflow-y-auto">
      <div className=" flex justify-center items-center">
        <div className=" w-4/5 flex-col items-center">
          <div className="flex justify-between">
            <div>
              <h1 className="text-black text-2xl font-bold mt-10 mb-3">
                {data.name}
              </h1>
            </div>

            <div
              className="mt-10 mb-3 hover:cursor-pointer"
              onClick={() => {
                handleCLick();
              }}
            >
              <Image src="/close.png" height={25} width={30} alt="cross" />
            </div>
          </div>

          <div className="mt-5 overflow-auto">
            <h2 className="my-1 font-semibold">Description</h2>
            <p className="">{data.description}</p>
            <ul className="mt-5">
              <li className="my-1 font-semibold">
                Event Date: <span className="font-normal">{data.date}</span>
              </li>
              <li className="my-1 font-semibold">
                Event Time: <span className="font-normal">{data.eTime}</span>
              </li>

              <li className="my-1 font-semibold">
                Event Organiser:{" "}
                <span className="font-normal">{data.organiser}</span>
              </li>
              <li className="my-1 font-semibold">
                No. of Partipants:{" "}
                <span className="font-normal">{data.numParticipants}</span>
              </li>
              <li className="my-1 font-semibold">
                Speakers:{" "}
                <span className="font-normal">
                  { speakers &&
                    speakers.map((speaker,index) => (
                    <p key={index}>{speaker.title+" "+speaker.affiliation}</p>
                  ))}
                </span>


              </li>

              <li className="my-1 font-semibold">
                Event Funded By:{" "}
                <span className="font-normal">{data.fundedBy}</span>
              </li>
              <li className="my-1 font-semibold">
                Event Fund: <span className="font-normal">{data.fund}</span>
              </li>
              <li className="my-1 font-semibold">
                Event Link: <span className="font-normal">{data.link}</span>
              </li>
            </ul>
            <div className="mt-5">
              <h1 className=" font-bold text-xl">Event Files</h1>
              <label
                htmlFor="uploadFile"
                className="mt-3 rounded-md w-3/5 cursor-pointer"
              >
                <span>
                  <Image
                    src="/upload.png"
                    height={25}
                    width={30}
                    alt="add"
                    className="inline-block mr-3"
                  />
                </span>
                Upload Files
              </label>
              <input
                className="m-2 rounded-md p-1 w-3/5 hidden"
                type="file"
                id="uploadFile"
                placeholder="Event Files"
                multiple={true}
                onChange={async (e) => {
                  setFiles(e.target.files);
                  await handleSubmit();
                }}
              />
            </div>
          </div>
          <div className="flex flex-nowrap">
            {uploadedFiles.map((file, index) => (
              <div className="m-2" key={file + index}>
                <a
                  href={`/uploads/${data.name + data.date}/${file}`}
                  target="_blank"
                >
                  {file.split(".")[1] === "pdf" ? (
                    <Image
                      src="/pdf.png"
                      height={150}
                      width={150}
                      alt="event pdf"
                      className="object-fit hover:cursor-pointer hover:opacity-50"
                    />
                  ) : (
                    <Image
                      src={`/uploads/${data.name + data.date}/${file}`}
                      height={200}
                      width={200}
                      alt="event image"
                      className="object-fit hover:cursor-pointer hover:opacity-50"
                    />
                  )}
                </a>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-5">
            <button
              className="bg-red-400 rounded-md p-2 hover:bg-red-500 mb-4"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowEvent;
