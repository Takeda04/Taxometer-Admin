import { Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { cars } from "./data";

interface Props {
  car: (typeof cars)[number];
  columnKey: string | React.Key;
  openModal: (type: string, user: (typeof cars)[number]) => void;
}

export const RenderCarCell = ({ car, columnKey, openModal }: Props) => {
  // @ts-ignore
  const cellValue = car[columnKey];
  switch (columnKey) {
    case "carType":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
        </div>
      );
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <Tooltip content="Edit tarif" color="secondary">
              <button  aria-label="button" onClick={() => openModal("update", car)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Delete tarif" color="danger">
              <button aria-label="button"  onClick={() => openModal("delete", car)}>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};
