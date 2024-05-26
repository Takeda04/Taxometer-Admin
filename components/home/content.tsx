//@ts-nocheck
import React from "react";
import { TableWrapper } from "../table/table";

import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import { CardBalance } from "./card-balance1";


export interface IStatistic{
  tariff_name :string,
  tariff_price: number,
}






// const statistic:IStatistic[] = [
//     {
//       tarif: "Start",
//       users: "100",
//       narx: "5000"
//     },
//     {
//       tarif: "Econom",
//       users: "180",
//       narx: "7000"
//     },
//     {
//       tarif: "Comfort",
//       users: "200",
//       narx: "9000"
//     },
//     {
//       tarif: "Business",
//       users: "50",
//       narx: "12000"
//     },
//     {
//       tarif: "Delivery",
//       users: "90",
//       narx: "15000"
//     },
//     {
//       tarif: "Load",
//       users: "300",
//       narx: "25000"
//     },
// ]


export const Content = ({tarif}) => (
  

  
  <div className="h-full lg:px-6">
    <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
      <div className="mt-6 gap-6 flex flex-col w-full">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Tariflar</h3>
          <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
          {tarif?.map((item: IStatistic | React.Key | null | undefined) => (
              <CardBalance key={item} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
      <div className="flex  flex-wrap justify-between">
        <h3 className="text-center text-xl font-semibold">
          {"Ohirgi qo'shilganlar"}
        </h3>
        <Link
          href="/accounts"
          as={NextLink}
          color="primary"
          className="cursor-pointer"
        >
          View All
        </Link>
      </div>
      <TableWrapper />
    </div>
  </div>
);
