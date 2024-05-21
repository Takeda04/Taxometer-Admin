import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { cars } from "./data";

interface Props {
  car: (typeof cars)[number];
  columnKey: string | React.Key;
}

export const RenderCarCell = ({ car, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = car[columnKey];
  switch (columnKey) {
    case "brand":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
        </div>
      );
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
              <button onClick={() => console.log("Edit tarif", car)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Delete tarif"
              color="danger"
              
            >
              <button onClick={() => console.log("Delete tarif", car.id)}>
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
