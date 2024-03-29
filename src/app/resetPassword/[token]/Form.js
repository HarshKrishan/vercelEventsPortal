"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Form({ token }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/api/verifyToken", {
      method: "POST",
      body: JSON.stringify({ token: token }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setError("An error occured");

          return;
        }

        return response.json();
      })
      .then((json) => {
        if (json.status == 204) {
          setError(json.result);
          return;
        }

        setUserEmail(json.user);
      })
      .catch((error) => {
        setError("An error occured");
      });
  }, [token]);

  const handleClick = async () => {
    fetch("http://localhost:3000/api/resetPassword", {
      method: "POST",
      body: JSON.stringify({ password: password, email: userEmail }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setError("An error occured");
        }

        return response.json();
      })
      .then((json) => {
        if (json.status == 400) {
          setError(json.result);
          return;
        }
        if (json.status == 200) {
          toast.success("Password reset successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }

        if (json.status == 204) {
          setError(json.result);
        }
      })
      .catch((error) => {
        setError("An error occured");
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
            Reset Password
          </h1>

          <input
            className="m-2 rounded-md p-1 w-3/5 border-2 border-gray-600"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="flex justify-center w-3/5 my-3">
            <button
              onClick={handleClick}
              disabled={error.length > 0}
              className="text-black bg-teal-400 rounded-md p-1 w-1/3 text-center"
            >
              Reset Password
            </button>
          </div>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    </>
  );
}
