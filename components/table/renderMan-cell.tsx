import { Tooltip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { managers } from "./data";

interface Props {
  manager: (typeof managers)[number];
  columnKey: string | React.Key;
  openModal: (type: string, user: any) => void;
}

export const RenderManagerCell = ({ manager, columnKey, openModal }: Props) => {
  // @ts-ignore
  const cellValue = manager[columnKey];

  switch (columnKey) {
    case "name":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
        </div>
      );
    case "email":
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
              <button onClick={() => openModal("update", manager)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Delete tarif" color="danger">
              <button onClick={() => openModal("delete", manager)}>
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
