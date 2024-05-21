import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { tarifs } from "./data";

interface Props {
  tarif: (typeof tarifs)[number];
  columnKey: string | React.Key;
}

export const RenderTarifCell = ({ tarif, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = tarif[columnKey];
  switch (columnKey) {
    case "tarif":
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
              <button onClick={() => console.log("Edit tarif", tarif)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Delete tarif"
              color="danger"
              
            >
              <button onClick={() => console.log("Delete tarif", tarif.id)}>
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
