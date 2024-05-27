"use client";
import React from "react";
import { TableTarifWrapper } from "../table/tableTarif";
import { TableCarWrapper } from "../table/tableCar";
import { TableManagerWrapper } from "../table/tableMan";

export const Catalog = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
       <h3 className="text-xl font-semibold">Managerlar</h3>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableManagerWrapper /> {/* TableTarifWrapper includes AddTarif */}
      </div>
      <h3 className="text-xl font-semibold">{"Ta'riflar"}</h3>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableTarifWrapper /> {/* TableTarifWrapper includes AddTarif */}
      </div>
      <h3 className="text-xl font-semibold">Avtomobil turlari</h3>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableCarWrapper />
      </div>
    </div>
  );
};
