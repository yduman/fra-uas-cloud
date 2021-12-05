import { useState } from "react";
import { useRouter } from "next/router";

import useFetch from "../hooks/useFetch";

export default function AuthForm({ apiUrl, destination, title }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doFetch, errors } = useFetch({
    url: apiUrl,
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => router.push(destination),
  });

  async function onSubmit(event) {
    event.preventDefault();
    await doFetch();
  }

  return (
    <form onSubmit={onSubmit} className="container">
      <h1>{title}</h1>

      <div className="form-group mt-3">
        <label>Email</label>
        <input value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="form-group mt-3">
        <label>Password</label>
        <input
          value={password}
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errors}

      <button className="btn btn-primary mt-3">Send</button>
    </form>
  );
}
