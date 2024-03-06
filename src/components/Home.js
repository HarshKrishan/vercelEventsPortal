"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import ShowHomeEvent from "./ShowHomeEvent";
export default function Home() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState("upcoming");
  const [visible, setVisible] = useState(false);

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);

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

  const handleButtonClick = (buttonType) => {
    setSelected(buttonType);
  };

  function handleCLickShowEvent() {
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
    setVisible(false);
  }

  function separateEvents(Events) {
    if (upcomingEvents.length > 0 || recentEvents.length > 0) {
      return;
    }
    let upcoming = [];
    let recent = [];
    let today = new Date();
    
    for (let i = 0; i < Events.length; i++) {
      let eventDate = new Date(Events[i].eDate);

      if (eventDate > today) {
        upcoming.push(Events[i]);
      } else {
        recent.push(Events[i]);
      }
    }
    setUpcomingEvents(upcoming);
    setRecentEvents(recent);
  }

  useEffect(() => {
    fetch("http://localhost:3000/api/getAllEvents")
      .then((res) => res.json())
      .then((json) => {
        setEvents(json.result);
        separateEvents(json.result);
      }).catch((err) => {
        // console.log(err);
      });
  }, []);

  const getDate = (dte) => {
    const date = new Date(dte);

    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", {
      month: "long",
    });
    const day = date.getDate();
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
  };

  const eventsPerPage = 10;
  const [upComingEventOffset, setUpComingEventOffset] = useState(0);
  const upComingEventEndOffset = upComingEventOffset + eventsPerPage;
  const currentUpComingEvents = upcomingEvents.slice(
    upComingEventOffset,
    upComingEventEndOffset
  );
  const upComingEventPageCount = Math.ceil(
    upcomingEvents.length / eventsPerPage
  );

  const handleUpComingEventsPageClick = (event) => {
    const newOffset = (event.selected * eventsPerPage) % upcomingEvents.length;
    setUpComingEventOffset(newOffset);
  };

  const [recentEventOffset, setRecentEventOffset] = useState(0);
  const recentEventEndOffset = recentEventOffset + eventsPerPage;
  const currentRecentEvents = recentEvents.slice(
    recentEventOffset,
    recentEventEndOffset
  );
  
  const recentEventPageCount = Math.ceil(recentEvents.length / eventsPerPage);
  
  const handleRecentEventsPageClick = (event) => {
    const newOffset = (event.selected * eventsPerPage) % recentEvents.length;
    setRecentEventOffset(newOffset);
  };
  return (
    <div className="w-screen">
      <div className="absolute z-10 top-0 p-2">
        <Image
          src="/logo.png"
          width={450}
          height={450}
          alt="logo"
        />
      </div>
      <div className="absolute z-10 top-5 p-2 right-5">
        <Link href="/login">
          <button className='text-xl "text-black bg-teal-400 rounded-md px-3 py-2 text-center'>
            Login
          </button>
        </Link>
      </div>
      <div className="absolute top-8 mt-20 ml-[50px] md:ml-[450px]">
        <h1 className="text-black text-5xl font-semibold">
          Welcome to IIITD Events Portal
        </h1>

        <div className="flex justify-center mt-3">
          <div className="border-gray-400 border-2 rounded-xl w-full flex justify-center">
            <button
              className={` px-3 py-2 flex-1 ${
                selected === "upcoming" ? "bg-teal-300 rounded-xl" : ""
              }`}
              onClick={() => handleButtonClick("upcoming")}
            >
              Upcoming Events
            </button>
            <button
              className={`px-3 py-2 rounded-xl flex-1 ${
                selected === "recent" ? "bg-teal-300 rounded-xl" : ""
              }`}
              onClick={() => handleButtonClick("recent")}
            >
              Recent Events
            </button>
          </div>
        </div>
      </div>

      <div className="absolute z-10 top-1/3 w-full mt-10">
        <div className="flex flex-wrap justify-center  w-full">
          {selected === "upcoming" ? (
            currentUpComingEvents.length == 0 ? (
              <>
                <div className="flex flex-col justify-center items-center  h-1/2">
                  <h1 className="text-2xl font-semibold">No Upcoming Events</h1>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex w-4/5 gap-4 flex-wrap items-center">
                  {currentUpComingEvents.map((event, index) => (
                    <div
                      key={index + 1}
                      onClick={() => {
                        setVisible(true)
                        setEventDataToShow({
                          eventId: event.eId,
                          name: event.eName,
                          date: getDate(event.eDate),
                          description: event.eDesc,
                          organiser: event.eOrgEmail,
                          link: event.eLink,
                          fundedBy: event.eFundedBy,
                          fund: event.eFund,
                          eTime: event.eTime,
                          numParticipants: event.eNumParticipants,
                          speaker_id: event.eSpeakerId,
                        });
                      }
                    }

                      className="flex flex-col justify-center items-center m-2 w-72 h-72 rounded-lg bg-white bg-opacity-50 border-black border-2 border-opacity-5 hover:shadow-xl pt-5 hover:cursor-pointer"
                    >
                      <div className="flex justify-center items-center  h-1/2 ">
                        <Image
                          src="/event.png"
                          width={150}
                          height={150}
                          alt="event"
                        />
                      </div>
                      <div className="flex flex-col justify-center items-center  h-1/2">
                        <h1 className="text-2xl font-semibold">
                          {event.eName}
                        </h1>
                        <h1 className="text-xl">{getDate(event.eDate)}</h1>
                        <h1 className="text-xl">{event.eOrgEmail}</h1>
                      </div>
                    </div>
                  ))}
                </div>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handleUpComingEventsPageClick}
                  pageRangeDisplayed={5}
                  pageCount={upComingEventPageCount}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  containerClassName="flex flex-row justify-center my-10"
                  pageClassName="mx-2"
                  activeClassName="bg-blue-400 text-white"
                  activeLinkClassName="bg-blue-400 text-white px-3 py-2 rounded-md"
                  disabledClassName="text-gray-400"
                  nextClassName="mx-2"
                  previousClassName="mx-2"
                />
              </div>
            )
          ) : currentRecentEvents.length == 0 ? (
            <>
              <div className="flex flex-col justify-center items-center  h-1/2">
                <h1 className="text-2xl font-semibold">No Recent Events</h1>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="flex w-full gap-4 flex-wrap items-center justify-center ">
                {currentRecentEvents.map((event, index) => (
                  <div
                    key={index + 1}
                    onClick={() => {
                      setVisible(true)
                      setEventDataToShow({
                        eventId: event.eId,
                        name: event.eName,
                        date: getDate(event.eDate),
                        description: event.eDesc,
                        organiser: event.eOrgEmail,
                        link: event.eLink,
                        fundedBy: event.eFundedBy,
                        fund: event.eFund,
                        eTime: event.eTime,
                        numParticipants: event.eNumParticipants,
                        speaker_id: event.eSpeakerId,
                      });
                    }}
                    className="flex flex-col justify-center items-center w-72 h-72 rounded-lg bg-white bg-opacity-50 border-black border-2 border-opacity-5 hover:shadow-xl pt-5 hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center  h-1/2 ">
                      <Image
                        src="/event.png"
                        width={150}
                        height={150}
                        alt="event"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center  h-1/2">
                      <h1 className="text-2xl font-semibold">{event.eName}</h1>
                      <h1 className="text-xl">{getDate(event.eDate)}</h1>
                      <h1 className="text-xl">{event.eOrgEmail}</h1>
                    </div>
                  </div>
                ))}
              </div>
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handleRecentEventsPageClick}
                pageRangeDisplayed={5}
                pageCount={recentEventPageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="flex flex-row justify-center my-10"
                pageClassName="mx-2"
                activeClassName="bg-blue-400 text-white"
                activeLinkClassName="bg-blue-400 text-white px-3 py-2 rounded-md"
                disabledClassName="text-gray-400"
                nextClassName="mx-2"
                previousClassName="mx-2"
              />
            </div>
          )}
        </div>
      </div>
      <div className="absolute z-10 bottom-0 w-full">
        <ShowHomeEvent
          visible={visible}
          data={eventDataToShow}
          handleCLick={handleCLickShowEvent}
        />
      </div>
    </div>
  );
}
