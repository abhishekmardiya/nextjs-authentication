"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        await axios.post("/api/users/verifyEmail", { token });
        setVerified(true);
      } catch (_err) {}
    };

    if (token?.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <h1>{verified ? "Verification completed" : "Something went wrong"}</h1>
      {verified && <Link href="/login">Go to login page</Link>}
    </div>
  );
}
