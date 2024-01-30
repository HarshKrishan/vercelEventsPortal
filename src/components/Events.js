import React from 'react'
import EventTableRow from './EventTableRow'
function Events({events,markShowEventTrue,setEventDataToShow, markUpdateEventTrue, setEventDataToUpdate,setShowDateRange,showDateRange,handleDownloadButton}) {
    // console.log(events)
  return (
    <div className="h-[28rem] mt-20">
      <div className="w-full flex justify-center h-100dvh overflow-y-auto">
        <table className="table-auto border-4 border-slate-300 w-full overflow-y-auto">
          <thead>
            <tr>
              <th className="border-4 border-slate-300">S NO.</th>
              <th className="border-4 border-slate-300">Event Name</th>
              <th className="border-4 border-slate-300">Date</th>
              <th className="border-4 border-slate-300">Event Organiser</th>
              <th className="border-4 border-slate-300">View</th>
              <th className="border-4 border-slate-300">Edit</th>
            </tr>
          </thead>
          <tbody className="">
            {events.length === 0 ? (
              <tr>
                <td
                  className="border-4 border-slate-300 text-center"
                  colSpan="6"
                >
                  No Events Found
                </td>
              </tr>
            ) : (
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
                  markUpdateEventTrue={markUpdateEventTrue}
                  setEventDataToUpdate={setEventDataToUpdate}
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
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-end mt-5 flex-col w-full">
        <button
          className="text-black bg-teal-400 rounded-md p-1 w-1/7 hover:bg-teal-500"
          onClick={() => {
            handleDownloadButton();
          }}
        >
          Download Data!
        </button>
      </div>
    </div>
  );
}

export default Events