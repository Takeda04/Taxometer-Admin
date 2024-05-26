'use client'
import type { NextPage } from "next";
import { Content } from "@/components/home/content";
import { useEffect, useState } from "react";
import { getTarifs } from "@/axios/UsersAPI";

const Home: NextPage = () => {
  const [tarif, setTarifs] = useState();



  const getTarif = async () => {
    try {
      const { data } = await getTarifs();
      setTarifs(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(tarif, "tariflar");
  
  useEffect(() => {
    getTarif();
  }, [])
  return <Content tarif={tarif}/>;
};

export default Home;
