import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
  } from "@nextui-org/react";
  import React from "react";
  import { columnsCar, cars } from "./data";
import { RenderCarCell } from "./renderCar-cell";
  
  export const TableCarWrapper = () => {
    return (
      <div className=" w-full flex flex-col gap-4">
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columnsCar}>
            {(column) => (
              <TableColumn
                key={column.uid}
                hideHeader={column.uid === "actions"}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={cars}>
            {(item) => (
              <TableRow>
                {(columnKey) => (
                  <TableCell>
                    {RenderCarCell({ car: item, columnKey: columnKey })}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  