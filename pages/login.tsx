import React, { useState } from "react";
import { Site } from "../components/Site";
import { fetchData } from "../util/fetch";

export default function Login() {
  const [form, setForm] = useState({ user: "", password: "" });
  const [user, setUser] = useState();
  const login = () => {
    fetchData(`/api/auth?user=${form.user}&password=${form.password}`)
      .then(user => setUser(user))
      .catch(err => {
        console.error("err", err);
      });
  };

  return (
    <Site>
      {user ? (
        <div
          className="grid gap-2"
          style={{ gridTemplate: "1fr 1fr / 140px 200px" }}
        >
          {JSON.stringify(user)}
        </div>
      ) : (
        <div className="flex flex-col items-center my-20">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <div
            className="grid gap-2"
            style={{ gridTemplate: "1fr 1fr / 140px 200px" }}
          >
            <div>Username</div>
            <input
              className="px-3 py-1"
              onChange={e =>
                setForm(form => ({ ...form, user: e.target.value }))
              }
            />
            <div>Password</div>
            <input
              className="px-3 py-1"
              type="password"
              onChange={e =>
                setForm(form => ({ ...form, password: e.target.value }))
              }
            />
            <div></div>
            <button
              className="bg-primary-500 text-white rounded p-1"
              onClick={login}
            >
              Anmelden
            </button>
          </div>
        </div>
      )}
    </Site>
  );
}
