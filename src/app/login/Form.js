"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";

export default function Form({ siteKey }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const isValidEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const captchaRef = useRef();
  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      alert("Invalid Email");
      return;
    }

    const token = captchaRef.current.getValue();

    if (!token) {
      toast.error("Please verify captcha");
      return;
    }

    const res = await fetch("/api/verifyCaptchaToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (data.result !== "Token verified") {
      toast.error(data.result);
      return;
    }

    toast.success("Captcha verified, logging in...");

    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: "/dashboardAdmin",
    }).then((res) => {
      if (res.error) {
        alert("Wrong Credentials");
      } else {
        captchaRef.current.reset();
        router.push("/dashboardAdmin");
      }
      return res;
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
      <div className="flex bg-gray-300 justify-center items-center absolute z-10 top-1/4 left-1/3 w-1/3 bg-opacity-20 rounded-lg pb-10 shadow-lg border-2 border-gray-300">
        <div className="  flex flex-col rounded-xl w-full items-center ">
          <h1 className="text-center font-bold text-4xl  text-teal-400 mt-4 mb-6">
            Login
          </h1>

          <input
            className="m-2 rounded-md p-1 w-3/5 border-2 border-gray-600"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="m-2 rounded-md p-1 w-3/5 border-2 border-gray-600"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <ReCAPTCHA sitekey={siteKey} ref={captchaRef} />
          <div className="flex justify-center w-3/5 my-3">
            <button
              onClick={handleLogin}
              className="text-black bg-teal-400 rounded-md p-1 w-1/3 text-center"
            >
              Login
            </button>
          </div>
          <div className="w-3/5 flex justify-center">
            <Link className="text-teal-400" href="/forgotPassword">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
