import React from "react";
import Image from "next/image";
function EventTableRow(props) {
  const { eventId, id, name, date, organiser, fundedBy, fund, link, numParticipants, speaker_id,eTime, description } = props;
  const oddClass = "border-r-4 border-b-2 border-slate-300";
  const evenClass = "border-r-4 border-b-2 border-slate-300 bg-teal-300";

  const { markShowEventTrue } = props;
  const { markUpdateEventTrue } = props;
  return (
    <tr key={id}>
      <td className={id % 2 === 0 ? evenClass : oddClass}>
        <div className="flex justify-center">{id}</div>
      </td>
      <td className={id % 2 === 0 ? evenClass : oddClass}>
        <div className="flex justify-center">{name}</div>
      </td>
      <td className={id % 2 === 0 ? evenClass : oddClass}>
        <div className="flex justify-center">{date}</div>
      </td>
      <td className={id % 2 === 0 ? evenClass : oddClass}>
        <div className="flex justify-center">{organiser}</div>
      </td>
      <td className={id % 2 === 0 ? evenClass : oddClass}>
        <div
          className="flex justify-center hover:cursor-pointer"
          onClick={() => {
            markShowEventTrue({
              eventId,
              name,
              date,
              organiser,
              fundedBy,
              fund,
              link,
              numParticipants,
              speaker_id,
              eTime,
              description,
            });
          }}
        >
          <Image src="/view.png" height={25} width={30} alt="view" />
        </div>
      </td>
      <td className={id % 2 === 0 ? evenClass : oddClass}>
        <div
          className="flex justify-center hover:cursor-pointer"
          onClick={() => {
            markUpdateEventTrue({
              eventId,
              name,
              date,
              organiser,
              fundedBy,
              fund,
              link,
              numParticipants,
              speaker_id,
              eTime,
              description,
            });
          }}
        >
          <Image src="settings.svg" height={25} width={30} alt="setting" />
        </div>
      </td>
    </tr>
  );
}

export default EventTableRow;
