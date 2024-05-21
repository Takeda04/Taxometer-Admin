import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import { IStatistic } from "./content"

interface CardBalanceProps {
  item: IStatistic;
}

export const CardBalance: React.FC<CardBalanceProps> = ({ item }) => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">{item.tarif}</span>
            <span className="text-white text-xs">{item.users} Cars</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">{item.narx +" so'm"}</span>
        </div>
      </CardBody>
    </Card>
  );
};
