"use client";

import React from "react";
import { useState } from "react";
import CustomInput from "./CustomInput";
import { toast } from "react-toastify";

const AddEvent = ({ visible, handleCLick }) => {
  const [speakers, setSpeakers] = useState([]);


 
  const addSpeaker = (title,name, affiliation) => {
    setSpeakers([...speakers, { title, name,affiliation }]);
  };

  function handleDelete(index) {
    const newSpeakers = speakers.filter((speaker, i) => i !== index);
    setSpeakers(newSpeakers);
  }

  const [event, setEvent] = useState({
    name: "",
    date: "",
    time: "",
    description: "",
    speakers: "",
    numParticipants: 0,
    organiser: "",
    link: "",
    fundedBy: "",
    fund: "",
  });
  if (!visible) return null;
  const handleSubmit = async () => {
    const answer = window.confirm("Are you sure you want to add this event?");
    if (!answer) return;

    const formdata = new FormData();
    formdata.append("name", event.name);
    formdata.append("date", event.date);
    formdata.append("time", event.time);
    formdata.append("description", event.description);
    formdata.append("organiser", event.organiser);
    formdata.append("link", event.link);
    formdata.append("fundedBy", event.fundedBy);
    formdata.append("fund", event.fund);
    formdata.append("numParticipants", event.numParticipants);
    formdata.append("speakers", JSON.stringify(speakers));

    fetch("http://localhost:3000/api/addEvent", {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        toast.success("Event added!", {
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
        toast.error("error adding event!", {
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

    setEvent({
      name: "",
      date: "",
      time: "",
      description: "",
      numParticipants: 0,
      organiser: "",
      link: "",
      fundedBy: "",
      fund: "",
    });

    setSpeakers([]);
  };

  return (
    <div className="fixed inset-x-72 inset-y-5 bg-slate-200 overflow-auto">
      <div className=" flex justify-center items-center overflow-auto">
        <div className=" w-4/5 flex-col items-center">
          <h1 className="text-black text-2xl font-bold my-5 ">Add Event</h1>

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
              <label className="text-black w-3/5">Event Time</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="time"
                placeholder="Event Time"
                value={event.time}
                onChange={(e) => {
                  setEvent({ ...event, time: e.target.value });
                }}
              />
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

              <CustomInput
                speakers={speakers}
                addSpeaker={addSpeaker}
                handleDelete={handleDelete}
                className="w-3/5"
              />
              <label className="text-black w-3/5">No. of Participants </label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="Number"
                placeholder="10"
                value={event.numParticipants}
                onChange={(e) => {
                  setEvent({ ...event, numParticipants: e.target.value });
                }}
                min="0"
              />
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

              <label className="text-black w-3/5">Event Budget</label>

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
                  }}
                >
                  Add Event
                </button>
                <button
                  className="text-black bg-teal-400 rounded-md p-1 w-1/3 hover:bg-teal-500"
                  onClick={() => {
                    setEvent({
                      name: "",
                      date: "",
                      time: "",
                      description: "",
                      organiser: "",
                      link: "",
                      fundedBy: "",
                      fund: "",
                    });
                    setSpeakers([]);
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

export default AddEvent;
