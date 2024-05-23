import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { LogoutIcon } from "../icons/navbar/logout-icon";

export const UserDropdown = () => {

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    window.location.reload();
  }
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button aria-label="button"  color="primary">
            Parameterlar
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem startContent={<LogoutIcon/>} onClick={handleLogout}  key="logout" color="danger" className="text-danger ">
          Chiqish
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
