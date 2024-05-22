"use client";
import React, { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Layout } from "../components/layout/layout";
import { Login } from "./login/page";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "../axios/index"

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = (accessToken: string | null) => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      setIsAuthenticated(true);
    }
  };

  if (isAuthenticated) {
    return (
      <NextUIProvider>
        <ContextProvider>
          <Toaster reverseOrder={true} />
          <NextThemesProvider
            defaultTheme="system"
            attribute="class"
            {...themeProps}
          >
            <Layout>{children}</Layout>
          </NextThemesProvider>
        </ContextProvider>
      </NextUIProvider>
    );
  } else {
    return <Login onLogin={handleLogin} />;
  }
}
