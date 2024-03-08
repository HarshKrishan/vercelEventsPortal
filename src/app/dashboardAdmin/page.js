"use client";
import AddEvent from "@/components/AddEvent";
import TopNavbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import ShowEvent from "@/components/ShowEvent";
import { DatePickerWithRange } from "@/components/ui/datePickerWithRange";
import UpdateEvent from "@/components/UpdateEvent";
import Events from "@/components/Events";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { json2csv } from "json-2-csv";


function Page() {
  const [currentUser, setCurrentUser] = useState({
    fname: "",
    lname: "",
    email: "",
    role: "",
    status: "",
  });
  const session = async () => {
    const curr = await getSession();
    const { fname, lname, email, role, status } = curr.user;

    setCurrentUser({
      fname: fname,
      lname: lname,
      email: email,
      role: role,
      status: status,
    });
  };
  useEffect(() => {
    session();
  }, []);

  
  const [visible, setVisible] = useState(false);

  const [date, setDate] = useState({
    from: new Date(),
    to: new Date(),
  });

  const [submit, isSubmit] = useState({
    first: true,
    second: true,
  });

  useEffect(() => {
    if (submit.first && submit.second) {
      fetch("http://localhost:3000/api/getEventByDateRange", {
        method: "POST",
        body: JSON.stringify({
          email: currentUser.email,
          role: currentUser.role,
          startDate: date.from,
          endDate: date.to,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setEvents(json.result);
        });
      isSubmit({ first: false, second: false });
    }
  }, [submit, date]);

  const [visibleShowEvent, setVisibleShowEvent] = useState(false);

  const [eventDataToShow, setEventDataToShow] = useState({
    eventId: "",
    name: "",
    date: "",
    description: "",
    organiser: "",
    link: "",
    fundedBy: "",
    fund: "",
    eTime:"",
    numParticipants:"",
    speaker_id:"",
  });

  const handleCLickShowEvent = () => {
    setEventDataToShow({
      eventId: "",
      name: "",
      date: "",
      description: "",
      organiser: "",
      link: "",
      fundedBy: "",
      fund: "",
      eTime: "",
      numParticipants: "",
      speaker_id: "",
    });
    setVisibleShowEvent(false);
  };

  const [visibleUpdateEvent, setVisibleUpdateEvent] = useState(false);

  const [eventDataToUpdate, setEventDataToUpdate] = useState({
    eventId: "",
    name: "",
    date: "",
    description: "",
    organiser: "",
    link: "",
    fundedBy: "",
    fund: "",
    eTime: "",
    numParticipants: "",
    speaker_id: "",
  });

  const handleCLickUpdateEvent = () => {
    setEventDataToUpdate({
      eventId: "",
      name: "",
      date: "",
      description: "",
      organiser: "",
      link: "",
      fundedBy: "",
      fund: "",
      eTime: "",
      numParticipants: "",
      speaker_id: "",
    });
    setVisibleUpdateEvent(false);
  };

  const markShowEventTrue = ({
    eventId,
    name,
    date,
    description,
    organiser,
    link,
    fundedBy,
    fund,
    eTime,
    numParticipants,
    speaker_id,
  }) => {
    setEventDataToShow({
      eventId,
      name,
      date,
      description,
      organiser,
      link,
      fundedBy,
      fund,
      eTime,
      numParticipants,
      speaker_id,
    });

    
    setVisibleShowEvent(true);
  };

  const markUpdateEventTrue = ({
    eventId,
    name,
    date,
    description,
    organiser,
    link,
    fundedBy,
    fund,
    eTime,
    numParticipants,
    speaker_id
  }) => {
    setEventDataToUpdate({
      eventId,
      name,
      date,
      description,
      organiser,
      link,
      fundedBy,
      fund,
      eTime,
      numParticipants,
      speaker_id
    });
    setVisibleUpdateEvent(true);
  };

  const handleCLick = () => {
    setVisible(false);
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/getEventByDateRange", {
      method: "POST",
      body: JSON.stringify({
        email: currentUser.email,
        role: currentUser.role,
        startDate: date.from,
        endDate: date.to,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setEvents(json.result);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [visible, visibleShowEvent, visibleUpdateEvent]);

  
  async function handleDownloadButton(mode) {
    
    let dataObjToWrite = await fetch("http://localhost:3000/api/getData", {
      method: "POST",
      body: JSON.stringify({
        email: currentUser.email,
        role: currentUser.role,
        startDate: mode=="all"? null: date.from,
        endDate: mode=="all"? null: date.to,
      }),
    }).then((res) => res.json()).then((json)=>{
      return json.result;
    }).catch((err) => {

      console.log(err);
      toast.error("Error in downloading file");
      return;
    });
    dataObjToWrite = await json2csv(dataObjToWrite);
    let filename = "data.csv";
    
    const blob = new Blob([dataObjToWrite], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  return (
    <div className="overflow-hidden">
      <TopNavbar>
        <div className="pt-5 px-16 w-full">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Events</h1>
            <button
              className="bg-teal-400 rounded-md p-2 hover:bg-teal-500"
              onClick={() => {
                setVisible(true);
              }}
            >
              Add Event
            </button>
          </div>

          <div className="flex justify-start w-full">
            <DatePickerWithRange
              date={date}
              setDate={setDate}
              submit={submit}
              isSubmit={isSubmit}
              handleCLick={handleCLick}
            />
          </div>
          <Events
            events={events}
            markShowEventTrue={markShowEventTrue}
            setEventDataToShow={setEventDataToShow}
            handleDownloadButton={handleDownloadButton}
            markUpdateEventTrue={markUpdateEventTrue}
            setEventDataToUpdate={setEventDataToUpdate}
            showDateRange={date}
            setShowDateRange={setDate}
          />
        </div>
        <AddEvent visible={visible} handleCLick={handleCLick} />

        <ShowEvent
          visible={visibleShowEvent}
          handleCLick={handleCLickShowEvent}
          data={eventDataToShow}
        />

        <UpdateEvent
          visible={visibleUpdateEvent}
          handleCLick={handleCLickUpdateEvent}
          data={eventDataToUpdate}
        />
      </TopNavbar>
    </div>
  );
}

export default Page;
