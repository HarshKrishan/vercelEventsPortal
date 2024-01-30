"use client";
import React from "react";
import Image from "next/image";

function UserTableRow(props) {
  const { id, name, lname, role, email, status, password } = props;
  const oddClass = "border-r-4 border-b-2 border-slate-300 ";
  const evenClass = "border-r-4 border-b-2 border-slate-300 bg-teal-300 ";

  const { markUpdateUserVisibleTrue } = props;

  return (
    <>
      <tr key={id}>
        <td className={id % 2 === 0 ? evenClass : oddClass}>
          <div className="flex justify-center">{id}</div>
        </td>
        <td className={id % 2 === 0 ? evenClass : oddClass}>
          <div className="flex justify-center">{name + " " + lname}</div>
        </td>
        <td className={id % 2 === 0 ? evenClass : oddClass}>
          <div className="flex justify-center">{role}</div>
        </td>
        <td className={id % 2 === 0 ? evenClass : oddClass}>
          <div className="flex justify-center">{email}</div>
        </td>
        <td className={id % 2 === 0 ? evenClass : oddClass}>
          <div className="flex justify-center">{status}</div>
        </td>
        <td
          className={id % 2 === 0 ? evenClass : oddClass}
          onClick={() => {
            markUpdateUserVisibleTrue({
              name,
              lname,
              role,
              email,
              status,
              password,
            });
          }}
        >
          <div className="flex justify-center hover:cursor-pointer">
            <Image src="settings.svg" height={25} width={30} alt="modify" />
          </div>
        </td>
      </tr>
    </>
  );
}

export default UserTableRow;
