"use client";
import React, { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Layout } from "../components/layout/layout";

import { Toaster } from "react-hot-toast";
import { refreshUser } from "@/axios/UsersAPI";
import Login from "./login/page";
import AppLoading from "@/components/loading/loading";


export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const checkTokenValidity = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const getStoredToken = (): string | null => {
  const localToken = localStorage.getItem("accessToken");
  const sessionToken = sessionStorage.getItem("accessToken");

  if (localToken && checkTokenValidity(localToken)) {
    return localToken;
  } else if (sessionToken && checkTokenValidity(sessionToken)) {
    return sessionToken;
  }
  return null;
};

export function Providers({ children, themeProps }: ProvidersProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      let token = getStoredToken();

      if (!token) {
        try {
          const data = await refreshUser();
          token = data.accessToken;
          if (token) {
            localStorage.setItem("accessToken", token);
            sessionStorage.setItem("accessToken", token);
          }
        } catch (error) {
          // console.error("Failed to refresh token:", error);
        }
      }

      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  const handleLogin = (accessToken: string | null) => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("accessToken", accessToken);
      setIsAuthenticated(true);
    }
  };

  if(loading) {
    return <AppLoading/>;
  }

  if (isAuthenticated) {
    return (
      <NextUIProvider>
        <Toaster reverseOrder={true} />
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          {...themeProps}
        >
          <Layout>{children}</Layout>
        </NextThemesProvider>
      </NextUIProvider>
    );
  } else {
    return <Login/>;
  }
}
