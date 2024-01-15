"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home(){
    const [events, setEvents] = useState([]);

    useEffect(() => {
      //for local
      fetch("http://localhost:3000/api/getAllEvents")
        .then((res) => res.json())
        .then((json) => {
          setEvents(json.result);
        });


      //for vercel
      // fetch("https://iiit-events-portal.vercel.app/api/getAllEvents", {
      //   cache: "no-cache",
      // })
      //   .then((res) => res.json())
      //   .then((json) => {
      //     setEvents(json.result);
      //   });
    }, []);
    // console.log("events", events);

    const getDate = (dte) => {
      const date = new Date(dte);

      const year = date.getFullYear();
      const month = date.toLocaleString("en-US", {
        month: "long",
      });
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      const formattedDate = `${month} ${day}, ${year}`;

      return formattedDate;
    };


    return (
      <div className="w-screen">
        {/* <div className="flex justify-center items-center h-screen main"></div> */}
        <div className="absolute z-10 top-0 p-2">
          <Image
            src="https://iiitd.ac.in/sites/default/files/style3colorsmall.png"
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
        <div className="absolute top-10 mt-20 ml-[450px]">
          <h1 className="text-black text-5xl font-semibold">
            Upcoming and Recents Events
          </h1>
        </div>
        {/* <div className="flex bg-white justify-center items-center absolute z-10 top-1/3 left-1/4 m-15 w-1/2 bg-opacity-60 rounded-lg">
          <div className="  flex flex-col rounded-xl w-full items-center ">
            <table className="table-auto border-4 border-slate-300 w-full overflow-auto">
              <thead>
                <tr>
                  <th className="border-4 border-black">S NO.</th>
                  <th className="border-4 border-black">Event Name</th>
                  <th className="border-4 border-black">Date</th>
                  <th className="border-4 border-black">Event Organiser</th>
                  <th className="border-4 border-black">View</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index + 1}>
                    <td className="border-4 border-black text-center">
                      {index + 1}
                    </td>
                    <td className="border-4 border-black text-center">
                      {event.eName}
                    </td>
                    <td className="border-4 border-black text-center">
                      {getDate(event.eDate)}
                    </td>
                    <td className="border-4 border-black text-center">
                      {event.eOrgEmail}
                    </td>
                    <td className="border-4 border-black text-center">
                      <div className="flex justify-center hover:cursor-pointer">
                        <Image
                          src="/view.png"
                          height={25}
                          width={30}
                          alt="view"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}

        <div className="absolute z-10 top-1/3 w-full">
          <div className="flex flex-wrap justify-center  w-full">
            {events.map((event, index) => (
              <div
                key={index + 1}
                className="flex flex-col justify-center items-center m-2 w-96 h-96 rounded-lg bg-white bg-opacity-50 border-black border-2 border-opacity-5"
              >
                <div className="flex justify-center items-center  h-1/2">
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
        </div>
      </div>
    );



}