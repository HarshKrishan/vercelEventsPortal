"use client";
import AddEvent from "@/components/AddEvent";
import TopNavbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import ShowEvent from "@/components/ShowEvent";
import { DatePickerWithRange } from "@/components/ui/datePickerWithRange";
import UpdateEvent from "@/components/UpdateEvent";
import Events from "@/components/Events";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const cache = "no-store";

function Page() {
  const [visible, setVisible] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  
  const [date, setDate] = useState({
    from: new Date(),
    to: new Date(),
  });
  
  const [submit,isSubmit] = useState({
    first:true,
    second:true,
  })

  useEffect(() => {
    if(submit.first && submit.second){
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
          // console.log("events",events);
          
        });
        // setFetchAgain(true);
      // console.log("now fetch data from date range",date);
      isSubmit({first:false,second:false})
      
      

    }
  }, [submit,date])
  
  // useEffect(() => {

  //   if(!fetchAgain) return;
  //   console.log("now fetch data from date range");
  //   fetch("http://localhost:3000/api/getEventByDateRange", {
  //     method: "POST",
  //     body: JSON.stringify(date),
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
        
  //       setEvents(json.result);
  //       setFetchAgain(false);

        
  //     });
  // },[fetchAgain,date])



  const [visibleShowEvent, setVisibleShowEvent] = useState(false);

  const [eventDataToShow, setEventDataToShow] = useState({
    eventId:"",
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
    setEventDataToShow({eventId:"",name:"",date:"",description:"",organiser:"",link:"",image:[],fundedBy:"",fund:""});
    setVisibleShowEvent(false);
  };


  const [visibleUpdateEvent, setVisibleUpdateEvent] = useState(false);

  const [eventDataToUpdate, setEventDataToUpdate] = useState({
    EventId: "4",
    Name: "testEvent",
    Date: "30-1-24",
    Description: "aaj ka event",
    Organiser: "mai",
    Link: "nhi pata",
    Image: [],
    FundedBy: "me",
    Fund: "1 crore",
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




  const markShowEventTrue = ({eventId,name,date,description,organiser,link,image,fundedBy,fund}) => {
    setEventDataToShow({eventId,name,date,description,organiser,link,image,fundedBy,fund});
    setVisibleShowEvent(true);
  };

  const markUpdateEventTrue = ({eventId,name,date,description,organiser,link,image,fundedBy,fund}) => {
  
    console.log("data in mark update event true",eventId,name,date,description,organiser,link,image,fundedBy,fund)
    // setEventDataToUpdate({eventId,name,date,description,organiser,link,image,fundedBy,fund});
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
    }

    // console.log("event",event)
    setEventDataToUpdate(event);

    console.log("eventData to update",eventDataToUpdate)
    setVisibleUpdateEvent(true);
  };


  const handleCLick = () => {
    setVisible(false);
  };
  
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    //for local
    // fetch("http://localhost:3000/api/getAllEvents")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setEvents(json.result);
    //   });


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


    //for vercel
    // fetch("https://iiit-events-portal.vercel.app/api/getAllEvents", {
    //   cache: "no-cache",
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setEvents(json.result);
    //   });


  },[visible, visibleShowEvent, visibleUpdateEvent]);

  // console.log("events",events);

  function handleDownloadButton(){
    let dataObjToWrite = events
    let filename = "events.json"
    const saveTemplateAsFile = (filename, dataObjToWrite) => {
    const blob = new Blob([JSON.stringify(dataObjToWrite)], { type: "text/json" });
    const link = document.createElement("a");

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    
    link.dispatchEvent(evt);
    link.remove()
};
    saveTemplateAsFile(filename,dataObjToWrite)
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
            <DatePickerWithRange date={date} setDate={setDate} submit={submit} isSubmit={isSubmit} handleCLick={handleCLick}/>
          </div>
          {/* <div className="h-[28rem] overflow-y-auto mt-20">
            <div className="w-full flex justify-center h-100dvh">
              <table className="table-auto border-4 border-slate-300 w-full ">
                <thead>
                  <tr>
                    <th className="border-4 border-slate-300">S NO.</th>
                    <th className="border-4 border-slate-300">Event Name</th>
                    <th className="border-4 border-slate-300">Date</th>
                    <th className="border-4 border-slate-300">
                      Event Organiser
                    </th>
                    <th className="border-4 border-slate-300">View</th>
                    <th className="border-4 border-slate-300">Edit</th>
                  </tr>
                </thead>
                <tbody className="">
                  {
                    events.length === 0 ? (
                      
                      <tr>

                        <td className="border-4 border-slate-300 text-center" colSpan="6">No Events Found</td>
                      </tr>
                    ):
                    (
                    events.map((event, index) => (
                    <EventTableRow
                      //for local sql
                      key={event.eventId}
                      eventId={event.eventId}
                      id={index + 1}
                      name={event.eName}
                      date={(() => {
                        const date = new Date(event.eDate);

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
                      })()}
                      organiser={event.eOrgEmail}
                      fundedBy={event.fundedBy}
                      fund={event.fund}
                      link={event.links}
                      markShowEventTrue={markShowEventTrue}
                      setEventDataToShow={setEventDataToShow}
                      //for vercel sql
                      // key={event.eventid}
                      // eventId={event.eventid}
                      // id={index + 1}
                      // name={event.ename}
                      // date={(() => {
                      //   const date = new Date(event.edate);

                      //   const year = date.getFullYear();
                      //   const month = date.toLocaleString("en-US", {
                      //     month: "long",
                      //   });
                      //   const day = date.getDate();
                      //   const hours = date.getHours();
                      //   const minutes = date.getMinutes();
                      //   const seconds = date.getSeconds();

                      //   const formattedDate = `${month} ${day}, ${year}`;

                      //   return formattedDate;
                      // }
                      // )
                      // ()}
                      // organiser={event.eorgemail}
                      // fundedBy={event.fundedby}
                      // fund={event.fund}
                      // link={event.links}
                    />
                  )
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-end mt-5 flex-col w-full">
              <button
                className="text-black bg-teal-400 rounded-md p-1 w-1/7 hover:bg-teal-500"
                onClick={() => {
                  setShowDateRange(!showDateRange);
                }}
              >
                Download Data!
              </button>
            </div>
          </div> */}
          <Events events={events} markShowEventTrue={markShowEventTrue} setEventDataToShow={setEventDataToShow} handleDownloadButton={handleDownloadButton}
          markUpdateEventTrue={markUpdateEventTrue} setEventDataToUpdate={setEventDataToUpdate} showDateRange={date} setShowDateRange={setDate} 

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
