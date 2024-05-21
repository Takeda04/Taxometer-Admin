import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
  } from "@nextui-org/react";
  import React from "react";
  import { columnsTarif, tarifs } from "./data";
  import { RenderTarifCell } from "./renderTarif-cell";
  
  export const TableTarifWrapper = () => {
    return (
      <div className=" w-full flex flex-col gap-4">
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columnsTarif}>
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
          <TableBody items={tarifs}>
            {(item) => (
              <TableRow>
                {(columnKey) => (
                  <TableCell>
                    {RenderTarifCell({ tarif: item, columnKey: columnKey })}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  