//@ts-nocheck
"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { toastError } from "@/components/toast";
import { signIn } from "../../axios/UsersAPI";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface ErrorWithMessage {
  message: string;
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const catchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (formData.email !== "" && formData.password !== "") {
        const data = await signIn(formData);
        localStorage.setItem("accessToken", data.access_token);
        sessionStorage.setItem("accessToken", data.access_token);
        window.location.reload();
      } else {
        throw new Error("Ma'lumotlar to'liq emas");
      }
    } catch (error) {
      const err = error as ErrorWithMessage;
      toastError(err.message);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Akkauntga kirish
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <Input
                name="email"
                label="Emailingiz"
                variant="bordered"
                autoComplete="off"
                value={formData.email}
                onChange={catchChange}
              />
              <Input
                name="password"
                autoComplete="off"
                endContent={
                  <button
                    className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <VisibilityIcon className="text-default-400 pointer-events-none" />
                    ) : (
                      <VisibilityOffIcon className="text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                label="Parolingiz"
                variant="bordered"
                value={formData.password}
                onChange={catchChange}
              />
              <Button
                type="submit"
                className="w-full text-gray dark:text-gray-400"
                color="primary"
                variant="bordered"
              >
                Kirish
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
