"use client";
import React from "react";
import { AddTarif } from "./add-tarif";
import { AddCardtype } from "./add-carType";
import { TableTarifWrapper } from "../table/tableTarif";
import { TableCarWrapper } from "../table/tableCar";

export const Catalog = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">{"Ta'riflar"}</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddTarif />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableTarifWrapper />
      </div>
      <h3 className="text-xl font-semibold">Avtomobil turlari</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddCardtype />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableCarWrapper />
      </div>
    </div>
  );
};
