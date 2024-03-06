"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";

const ShowHomeEvent = ({ visible, handleCLick, data }) => {

    const [speakers, setSpeakers] = useState([]);
    const [numParticipants, setNumParticipants] = useState(0);

    useEffect(() => {
        if (visible) {
            const speaker_Id = data.speaker_id;
            fetch("http://localhost:3000/api/getSpeaker", {
                method: "POST",
                body: JSON.stringify({ speaker_Id }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                }
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
        }
        else {
            setSpeakers([]);
        }
    }, [visible]);

    if (!visible) {
        return null;
    }
    return (
        <div className="fixed inset-x-72 inset-y-5 bg-slate-200 overflow-y-auto">
        <div className=" flex justify-center items-center">
            <div className=" w-4/5 flex-col items-center">
            <div className="flex justify-between">
                <div>
                <h1 className="text-black text-2xl font-bold mt-10 mb-3">
                    {data.name}
                </h1>
                </div>

                <div
                className="mt-10 mb-3 hover:cursor-pointer"
                onClick={() => {
                    handleCLick();
                }}
                >
                <Image src="/close.png" height={25} width={30} alt="cross" />
                </div>
            </div>

            <div className="mt-5 overflow-auto">
                <h2 className="my-1 font-semibold">Description</h2>
                <p className="">{data.description}</p>
                <ul className="mt-5">
                <li className="my-1 font-semibold">
                    Event Date: <span className="font-normal">{data.date}</span>
                </li>
                <li className="my-1 font-semibold">
                    Event Time: <span className="font-normal">{data.eTime}</span>
                </li>

                <li className="my-1 font-semibold">
                    No. of Partipants:{" "}
                    <span className="font-normal">{data.numParticipants}</span>
                </li>
                <li className="my-1 font-semibold">
                    Speakers:{" "}
                    <span className="font-normal">
                    { speakers &&
                        speakers.map((speaker,index) => (
                        <p key={index}>{speaker.title+" "+speaker.affiliation}</p>
                    ))}
                    </span>
                </li>

                </ul>
                
            </div>
            </div>
        </div>
        </div>
    );
}

export default ShowHomeEvent;