"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
const UpdateUser = ({ visible, handleCLick, data }) => {
  const [showPassword, setShowPassword] = useState(false);

  const userfname = data.fName;
  const userlname = data.lName;
  const userrole = data.role;
  const useremail = data.emailId;
  const userstatus = data.status;
  const userPassword = data.password;
  const [firstName, setFirstName] = useState(userfname);
  const [lastName, setLastName] = useState(userlname);
  const [role, setRole] = useState(userrole);
  const [email, setEmail] = useState(useremail);
  const [status, setStatus] = useState(userstatus);
  const [password, setPassword] = useState(userPassword);

  useEffect(() => {
    setFirstName(userfname);
    setLastName(userlname);
    setRole(userrole);
    setEmail(useremail);
    setStatus(userstatus);
    setPassword(userPassword);
  }, [visible]);
  if (!visible) return null;

  const handleSubmit = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      role: role,
      email: email,
      status: status,
    };
    if (
      firstName === "" ||
      lastName === "" ||
      password === "" ||
      email === "" ||
      status === "" ||
      role === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    fetch("http://localhost:3000/api/updateUser", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        toast.success("User updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setFirstName("");
        setLastName("");
        setPassword("");
        setEmail("");
        setStatus("active");
        setRole("admin");
        handleCLick();
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
          theme: "dark",
        });
      });
  };

  const handleDelete = () => {
    const formdata = new FormData();

    formdata.append("email", email);
    fetch("http://localhost:3000/api/deleteUser", {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        toast.success("User deleted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setFirstName("");
        setLastName("");
        setPassword("");
        setEmail("");
        setStatus("active");
        setRole("admin");
        handleCLick();
      })
      .catch((erorr) => {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <div className="fixed inset-x-72 inset-y-5 bg-slate-200">
      <div className=" flex justify-center items-center">
        <div className=" w-4/5 flex-col items-center">
          <div className="flex justify-between">
            <div>
              <h1 className="text-black text-2xl font-bold mt-10 mb-3">
                Update User
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

          <div>
            <div className="flex flex-col items-center gap-y-2">
              <label className="text-black w-3/5">First Name</label>
              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="User Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />

              <label className="text-black w-3/5">Last Name</label>
              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="User Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />

              <label className="text-black w-3/5">Role</label>

              <select
                className="m-2 rounded-md p-1 w-3/5"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option
                  value="admin"
                  selected={role === "admin" ? "selected" : ""}
                >
                  Admin
                </option>
                <option
                  value="coadmin"
                  selected={role === "coadmin" ? "selected" : ""}
                >
                  Co-Admin
                </option>
              </select>
              <label className="text-black w-3/5">Email</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="email"
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={true}
              />

              <label className="text-black w-3/5">Password</label>
              <div className="flex w-3/5 gap-x-2">
                <input
                  className="p-1 rounded-md w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button onClick={(e) => setShowPassword(!showPassword)}>
                  <Image
                    src={showPassword ? "/view.png" : "/not-view.png"}
                    height={25}
                    width={30}
                    alt="showPassword"
                  />
                </button>
              </div>

              <label className="text-black w-3/5">Status</label>

              <select
                className="m-2 rounded-md p-1 w-3/5"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option
                  value="active"
                  selected={status === "active" ? "selected" : ""}
                >
                  Active
                </option>
                <option
                  value="inactive"
                  selected={status === "inactive" ? "selected" : ""}
                >
                  Not-Active
                </option>
              </select>

              <div className="flex justify-between w-3/5 mt-3">
                <button
                  className="text-black bg-teal-400 rounded-md p-1 w-1/3 hover:bg-teal-500"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Update User
                </button>
                <button
                  className="text-black bg-red-400 rounded-md p-1 w-1/3 hover:bg-red-500"
                  onClick={() => {
                    setFirstName("");
                    setLastName("");
                    setPassword("");
                    setEmail("");
                    setStatus("active");
                    setRole("admin");

                    handleDelete();
                  }}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
