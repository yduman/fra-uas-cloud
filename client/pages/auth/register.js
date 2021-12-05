import { useState } from "react";
import Router from "next/router";

import useFetch from "../../hooks/useFetch";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doFetch, errors } = useFetch({
    url: "/api/users/register",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  async function onSubmit(event) {
    event.preventDefault();
    await doFetch();
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Register</h1>

      <div className="form-group">
        <label>Email</label>
        <input
          value={email}
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errors}

      <button className="btn btn-primary">Send</button>
    </form>
  );
}
