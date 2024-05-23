//@ts-nocheck
import { User, Tooltip, Chip, useDisclosure } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { users } from "./data";

interface Props {
  user: (typeof users)[number];
  columnKey: string | React.Key;
  openModal: (type: string, user: (typeof users)[number]) => void
}

export const RenderCell = ({  user, columnKey, openModal }: Props) => {
  // @ts-ignore
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{
            src: user.avatar,
          }}
          name={cellValue}
        >
          {user.name}
        </User>
      );
    case "tarif":
      return (
        <div>
          <div>
            <span>{user?.tariff?.tariff_name}</span>
          </div>
        </div>
      );
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "active"
              ? "success"
              : cellValue === "paused"
              ? "danger"
              : "warning"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4">
          <div>
            <Tooltip content="Details">
              <button  aria-label="button" onClick={() => openModal("show", user)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Edit user" color="secondary">
              <button  aria-label="button" onClick={() => openModal("update", user)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Delete user" color="danger">
              <button  aria-label="button" onClick={() => openModal("delete", user)}>
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
