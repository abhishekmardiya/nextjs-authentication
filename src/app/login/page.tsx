"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      await axios.post("/api/users/login", user);
      toast.success("Login Successfully");
      router.push("/profile");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || err.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-center">Login</h1>
      <hr />
      <article>
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
          onClick={onLogin}
          disabled={isBtnDisabled}
        >
          Login Here
        </button>
      </section>
      <section className="flex justify-center">
        <Link
          href="/signup"
          className="text-teal-300 mt-6 m-auto underline hover:text-blue-300"
        >
          Visit Signup page
        </Link>
      </section>
    </div>
  );
}
