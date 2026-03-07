"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const onSignup = async () => {
    try {
      await axios.post("/api/users/signup", user);
      toast.success("Signup Successfully");
      router.push("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || err.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-center">Signup</h1>
      <hr />
      <article>
        <section>
          <label htmlFor="username" className="mr-5">
            Username :
          </label>
          <input
            className="border border-teal-500 m-1 rounded"
            type="text"
            id="username"
            placeholder="Enter Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </section>
        <section>
          <label htmlFor="email" className="mr-14">
            Email :
          </label>
          <input
            className="border border-teal-500 m-1 rounded"
            type="email"
            id="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </section>
        <section>
          <label htmlFor="password" className="mr-5">
            Password :
          </label>
          <input
            className="border border-teal-500 m-1 rounded"
            type="password"
            id="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </section>
      </article>
      <section className="flex justify-center">
        <button
          type="button"
          className={`bg-teal-500 border rounded-full p-2 text-white mt-6 m-auto ${
            isBtnDisabled && "bg-gray-600"
          }`}
          onClick={onSignup}
          disabled={isBtnDisabled}
        >
          Signup Here
        </button>
      </section>
      <section className="flex justify-center">
        <Link
          href="/login"
          className="text-teal-300 mt-6 m-auto underline hover:text-blue-300"
        >
          Visit Login page
        </Link>
      </section>
    </div>
  );
}
