"use client";
import AddEvent from "@/components/AddEvent";
import TopNavbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import ShowEvent from "@/components/ShowEvent";
import { DatePickerWithRange } from "@/components/ui/datePickerWithRange";
import UpdateEvent from "@/components/UpdateEvent";
import Events from "@/components/Events";

function Page() {
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
    image: [],
    fundedBy: "",
    fund: "",
  });

  const handleCLickShowEvent = () => {
    setEventDataToShow({
      eventId: "",
      name: "",
      date: "",
      description: "",
      organiser: "",
      link: "",
      image: [],
      fundedBy: "",
      fund: "",
    });
    setVisibleShowEvent(false);
  };

  const [visibleUpdateEvent, setVisibleUpdateEvent] = useState(false);

  const [eventDataToUpdate, setEventDataToUpdate] = useState({
    EventId: "",
    Name: "",
    Date: "",
    Description: "",
    Organiser: "",
    Link: "",
    Image: [],
    FundedBy: "",
    Fund: "",
  });

  const handleCLickUpdateEvent = () => {
    setEventDataToUpdate({
      EventId: "",
      Name: "",
      Date: "",
      Description: "",
      Organiser: "",
      Link: "",
      Image: [],
      FundedBy: "",
      Fund: "",
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
    image,
    fundedBy,
    fund,
  }) => {
    setEventDataToShow({
      eventId,
      name,
      date,
      description,
      organiser,
      link,
      image,
      fundedBy,
      fund,
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
    image,
    fundedBy,
    fund,
  }) => {
    const event = {
      eventId,
      name,
      date,
      description,
      organiser,
      link,
      image,
      fundedBy,
      fund,
    };
    setEventDataToUpdate(event);
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
        startDate: date.from,
        endDate: date.to,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setEvents(json.result);
      }).catch((err) => {
        // console.log(err);
      });
  }, [visible, visibleShowEvent, visibleUpdateEvent]);

  function handleDownloadButton() {
    let dataObjToWrite = events;
    let filename = "events.json";
    const saveTemplateAsFile = (filename, dataObjToWrite) => {
      const blob = new Blob([JSON.stringify(dataObjToWrite)], {
        type: "text/json",
      });
      const link = document.createElement("a");

      link.download = filename;
      link.href = window.URL.createObjectURL(blob);
      link.dataset.downloadurl = ["text/json", link.download, link.href].join(
        ":"
      );

      const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      link.dispatchEvent(evt);
      link.remove();
    };
    saveTemplateAsFile(filename, dataObjToWrite);
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
