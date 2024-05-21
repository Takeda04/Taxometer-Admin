"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input, Button } from "@nextui-org/react";


interface LoginProps {
  onLogin: (accessToken: string | null) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    if (username === "user" && password === "password") {
      const accessToken = "dummyAccessToken"; 
      onLogin(accessToken);

    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <Button  aria-label="button"  type="submit" style={{ marginTop: "1rem" }}>
          Login
        </Button>
      </form>
    </div>
  );
};
