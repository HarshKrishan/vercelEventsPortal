"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
export default function Form() {
  const [email, setEmail] = useState("");
  const isValidEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };
  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      alert("Invalid Email");
      return;
    }

    fetch("http://localhost:3000/api/forgetPassword", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status == 500) {
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (response.status == 200) {
          toast.success(
            "Email with the password reset link sent to your emailId!",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
        }

        if (response.status == 204) {
          toast.error("User not found!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

        return response.json();
      })
      .catch((error) => {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen"></div>
      <div className="absolute z-10 top-0 p-6 cursor-pointer">
        <Link href="/">
          <Image
            src="/logo.png"
            width={450}
            height={450}
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex bg-gray-300 justify-center items-center absolute z-10 top-1/3 left-1/3 w-1/3 bg-opacity-20 rounded-lg pb-10 shadow-lg border-2 border-gray-300">
        <div className="  flex flex-col rounded-xl w-full items-center ">
          <h1 className="text-center font-bold text-4xl  text-teal-400 mt-4 mb-6">
            Forget Password
          </h1>

          <input
            className="m-2 rounded-md p-1 w-3/5 border-2 border-gray-600"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-center w-3/5 my-3">
            <button
              onClick={handleSubmit}
              className="text-black bg-teal-400 rounded-md p-1 w-1/3 text-center"
            >
              Submit
            </button>
          </div>
          <div className="w-3/5 flex justify-center">
            <Link className="text-teal-400" href="/login">
              Go back to Login?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
