"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomInput from "./CustomInput";

const UpdateEvent = ({ visible, handleCLick, data }) => {
  const router = useRouter();

  const eventId = data.eventId;
  const name = data.name;
  const date = data.date;
  const organiser = data.organiser;
  const link = data.link;
  const fundedBy = data.fundedBy;
  const fund = data.fund;
  const numParticipants = data.numParticipants;
  const eTime = data.eTime;
  const description = data.description;
  const speaker_id = data.speaker_id;

  function formatDateToMDN(dt) {
    const date = new Date(dt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const [event, setEvent] = useState({
    eventId:eventId,
    name: name,
    date: date,
    organiser: organiser,
    link: link,
    fundedBy: fundedBy,
    fund: fund,
    numParticipants: numParticipants,
    eTime: eTime,
    description: description,
    speaker_id: speaker_id,

  });
  const [speakers, setSpeakers] = useState([]);

  const addSpeaker = (title,name, affiliation) => {
    setSpeakers([...speakers, { title,name, affiliation }]);
  };

  function handleDelete(index) {
    const newSpeakers = speakers.filter((speaker, i) => i !== index);
    setSpeakers(newSpeakers);
  }
  useEffect(() => {
    setEvent({
      eventId:eventId,
      name: name,
      date: formatDateToMDN(date),
      organiser: organiser,
      link: link,
      fundedBy: fundedBy,
      fund: fund,
      numParticipants: numParticipants,
      eTime: eTime,
      description: description,
      speaker_id: speaker_id,

    });
    
  }, [visible]);

  
  const handleSubmit = async () => {
    const answer = window.confirm(
      "Are you sure you want to update this event?"
    );
    if (!answer) return;

    const formdata = new FormData();
    formdata.append("name", event.name);
    formdata.append("date", event.date);
    formdata.append("organiser", event.organiser);
    formdata.append("link", event.link);
    formdata.append("fundedBy", event.fundedBy);
    formdata.append("fund", event.fund);
    formdata.append("numParticipants", event.numParticipants);
    formdata.append("eTime", event.eTime);
    formdata.append("description", event.description);
    formdata.append("eventId", event.eventId);
    formdata.append("speaker_id", event.speaker_id);
    formdata.append("speakers", JSON.stringify(speakers));

    fetch("http://localhost:3000/api/updateEvent", {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        if(response.status === 200){
        toast.success("Event updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        

        }else{
          toast.error("error updating event!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        handleCLick();
      })
      .catch((err) => {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    setEvent({
      eventId: "",
      name: "",
      date: "",
      organiser: "",
      link: "",
      fundedBy: "",
      fund: "",
      numParticipants: "",
      eTime: "",
      description: "",
      speaker_id: "",

    });
  };


  useEffect(() => {
    if (visible) {
      const speaker_Id = data.speaker_id;
      fetch("http://localhost:3000/api/getSpeakers", {
        method: "POST",
        body: JSON.stringify({ speaker_Id }),
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
        .then((data) => {
          setSpeakers(data.result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setSpeakers([]);
    }
  }, [visible]);


  if (!visible) return null;
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

              <label className="text-black w-3/5">Event Time</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="time"
                placeholder="Event Time"
                value={event.eTime}
                onChange={(e) => {
                  setEvent({ ...event, eTime: e.target.value });
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
                    setEvent({ ...event, numsParticipants: e.target.value });
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
                      organiser: "",
                      link: "",
                      fundedBy: "",
                      fund: "",
                    });
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
