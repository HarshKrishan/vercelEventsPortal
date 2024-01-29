"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import CustomInput from "./CustomInput";
import { toast } from "react-toastify";

const UpdateEvent = ({ visible, handleCLick, data }) => {
  const router = useRouter();
  // const [speakers, setSpeakers] = useState([]);
  // console.log("data for update", data);
  // const addSpeaker = (title, affiliation) => {
  //   // setSpeakers([...speakers, { title, affiliation }]);
  //   setEvent({ ...event, speakers: [...event.speakers, { title, affiliation }] });  
  // };

  // function handleDelete(index) {
  //   // console.log("index",index)
  //   const newSpeakers = event.speakers.filter((speaker, i) => i !== index);
  //   setEvent({ ...event, speakers: newSpeakers });
  // }

  const [event, setEvent] = useState({
    eventId: data.eventId,
    name: data.name,
    date:data.date,
    description: data.description,
    // speakers: data.speakers,
    organiser: data.organiser,
    link: data.link,
    fundedBy:data.fundedBy,
    fund: data.fund,
  });
  if (!visible) return null;
  const handleSubmit = async () => {
    // e.preventDefault();
    // console.log("event",event);

    const answer = window.confirm("Are you sure you want to update this event?");
    if (!answer) return;

    const formdata = new FormData();
    formdata.append("name", event.name);
    formdata.append("date", event.date);
    // formdata.append("time", event.time);
    formdata.append("description", event.description);
    formdata.append("organiser", event.organiser);
    formdata.append("link", event.link);
    formdata.append("fundedBy", event.fundedBy);
    formdata.append("fund", event.fund);
    // formdata.append("numParticipants", event.numParticipants);
    // formdata.append("speakers", JSON.stringify(speakers));

    //for local

    fetch("http://localhost:3000/api/updateEvent", {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        toast.success("Event update!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        console.log(response);
        handleCLick();
      })
      .catch((err) => {
        console.log(err);
        toast.error("error updating event!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });

    //for vercel
    // fetch("https://iiit-events-portal.vercel.app/api/addEvent", {
    //   method: "POST",
    //   body: formdata,
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .then((json) => console.log(json));

    setEvent({
      eventId: "",
      name: "",
      date: "",
      // time: "",
      description: "",
      // numParticipants: 0,
      organiser: "",
      link: "",
      fundedBy: "",
      fund: "",
    });

    // setSpeakers([]);
    //  router.refresh();
  };

  // bg-black  bg-opacity-20 backdrop-blur-sm
  return (
    <div className="fixed inset-x-72 inset-y-5 bg-slate-200 overflow-auto">
      <div className=" flex justify-center items-center overflow-auto">
        <div className=" w-4/5 flex-col items-center">
          <h1 className="text-black text-2xl font-bold my-5 ">Update Event</h1>

          <div>
            <div className="flex flex-col items-center">
              <label className="text-black w-3/5">Event Name</label>
              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="Event Name"
                value={event.name}
                onChange={(e) => {
                  setEvent({ ...event, name: e.target.value });
                }}
              />

              <label className="text-black w-3/5">Event Date</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="date"
                placeholder="Event Date"
                value={event.date}
                onChange={(e) => {
                  setEvent({ ...event, date: e.target.value });
                }}
              />
              {/* <label className="text-black w-3/5">Event Time</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="time"
                placeholder="Event Time"
                value={event.time}
                onChange={(e) => {
                  setEvent({ ...event, time: e.target.value });
                }}
              /> */}
              <label className="text-black w-3/5">Event Description</label>

              <textarea
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="Event Description"
                value={event.description}
                onChange={(e) => {
                  setEvent({ ...event, description: e.target.value });
                }}
              />
{/* 
              <CustomInput
                speakers={speakers}
                addSpeaker={addSpeaker}
                handleDelete={handleDelete}
                className="w-3/5"
              /> */}
              {/* <label className="text-black w-3/5">No. of Participants </label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="Number"
                placeholder="10"
                value={event.numParticipants}
                onChange={(e) => {
                  // if (e.target.value < 0)
                  //   setEvent({ ...event, numsParticipants: 0 });
                  // else {
                    setEvent({ ...event, numsParticipants: e.target.value });
                  // }
                }}
                min="0"
              /> */}
              <label className="text-black w-3/5">Event Organiser</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="Event Organiser"
                value={event.organiser}
                onChange={(e) => {
                  setEvent({ ...event, organiser: e.target.value });
                }}
              />
              <label className="text-black w-3/5">Event Link</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="Event Link"
                value={event.link}
                onChange={(e) => {
                  setEvent({ ...event, link: e.target.value });
                }}
              />

              <label className="text-black w-3/5">Event Funded By</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="Event Funded By"
                value={event.fundedBy}
                onChange={(e) => {
                  setEvent({ ...event, fundedBy: e.target.value });
                }}
              />

              <label className="text-black w-3/5">Event Fund</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="Event Fund"
                value={event.fund}
                onChange={(e) => {
                  setEvent({ ...event, fund: e.target.value });
                }}
              />

              <div className="flex justify-between w-3/5 mb-5">
                <button
                  className="text-black bg-teal-400 rounded-md p-1 w-1/3 hover:bg-teal-500"
                  onClick={() => {
                    handleSubmit();
                    // handleCLick();
                  }}
                >
                  Update Event
                </button>
                <button
                  className="text-black bg-teal-400 rounded-md p-1 w-1/3 hover:bg-teal-500"
                  onClick={() => {
                    setEvent({
                      eventId: "",
                      name: "",
                      date: "",
                      // time: "",
                      description: "",
                      organiser: "",
                      link: "",
                      fundedBy: "",
                      fund: "",
                    });
                    // setSpeakers([]);
                    handleCLick();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;
