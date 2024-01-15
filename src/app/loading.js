"use client"

import ReactLoading from 'react-loading';
export default function Loading (){
  return (
    <div className="flex justify-center items-center z-10 h-screen w-screen">
      <ReactLoading
        className=""
        type={"spinningBubbles"}
        color={"#26A69A"}
        height={100}
        width={100}
      />
    </div>
  );
}

