import React from "react";
import EventTableRow from "./EventTableRow";
function Events({
  events,
  markShowEventTrue,
  setEventDataToShow,
  markUpdateEventTrue,
  setEventDataToUpdate,
  handleDownloadButton,
}) {
  return (
    <>
      <div className="h-[22rem] mt-20 overflow-y-auto">
        <div className="w-full flex justify-center h-100dvh ">
          <table className="table-auto border-4 border-slate-300 w-full">
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
            <tbody className="overflow-y-auto">
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
                      const formattedDate = `${month} ${day}, ${year}`;
                      return formattedDate;
                    })()}
                    organiser={event.eOrgEmail}
                    fundedBy={event.fundedBy}
                    fund={event.fund}
                    link={event.links}
                    eTime={event.eTime}
                    numParticipants={event.numParticipants}
                    description={event.description}
                    speaker_id={event.speaker_Id}
                    markShowEventTrue={markShowEventTrue}
                    setEventDataToShow={setEventDataToShow}
                    markUpdateEventTrue={markUpdateEventTrue}
                    setEventDataToUpdate={setEventDataToUpdate}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
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
    </>
  );
}

export default Events;
