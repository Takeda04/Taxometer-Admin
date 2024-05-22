import {  Tooltip} from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { tarifs } from "./data";

interface Props {
  tarif: (typeof tarifs)[number];
  columnKey: string | React.Key;
  openModal: (type: string, user: (typeof tarifs)[number]) => void;
}

export const RenderTarifCell = ({ tarif, columnKey, openModal }: Props) => {
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
      case "waiting":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
        </div>
      );
      case "time":
        return (
          <div>
            <div>
              <span>{cellValue} daqiqa</span>
            </div>
          </div>
        );
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <Tooltip content="Edit tarif" color="secondary">
              <button onClick={() => openModal("update", tarif)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Delete tarif"
              color="danger"
              
            >
              <button onClick={() => openModal("delete", tarif)}>
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
