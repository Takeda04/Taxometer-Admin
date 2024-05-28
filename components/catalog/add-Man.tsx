//@ts-nocheck
import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { toastError, toastSuccess } from "../toast";
import { createManager, createTarif } from "@/axios/UsersAPI";
import { CustomersIcon } from "../icons/sidebar/customers-icon";

export const AddManager = ({ refreshManagers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const toggleVisibility = () => setIsVisible(!isVisible);

  const catchChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (
        formData.name !== "" &&
        formData.email !== "" &&
        formData.password !== "" &&
        formData.password_confirmation !== ""
      ) {
        await createManager(formData);
        toastSuccess("Muaffaqiyatli yaratildi");
        refreshManagers(); // Refresh the tariffs list
      } else {
        throw new Error("Ma'lumotlar to'liq emas");
      }
    } catch (error) {
      toastError("Kechirasiz, sizda buning uchun ruhsat yo'q");
    } finally {
      onClose();
      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      })
    }
  };

  return (
    <div>
      <Button
        aria-label="button"
        onClick={onOpen}
        color="primary"
        variant="bordered"
        startContent={<CustomersIcon />}
      >
        {"Manager yaratish"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {"Manager Yaratish"}
          </ModalHeader>
          <ModalBody>
            <Input
              name="name"
              label="Manager ismi"
              variant="bordered"
              value={formData.name}
              onChange={catchChange}
            />
            <Input
              name="email"
              label="Login"
              variant="bordered"
              type="email"
              value={formData.email}
              onChange={catchChange}
            />
            <Input
              name="password"
              label="Parol"
              variant="bordered"
              type={isVisible ? "text" : "password"}
              value={formData.password}
              onChange={catchChange}
              endContent={
                <button
                  className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <VisibilityIcon className="text-default-400 pointer-events-none" />
                  ) : (
                    <VisibilityOffIcon className="text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <Input
              name="password_confirmation"
              label="Parolni tasdiqlash"
              variant="bordered"
              type={isVisible ? "text" : "password"}
              value={formData.password_confirmation}
              onChange={catchChange}
              endContent={
                <button
                  className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <VisibilityIcon className="text-default-400 pointer-events-none" />
                  ) : (
                    <VisibilityOffIcon className="text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button
              aria-label="button"
              color="danger"
              variant="flat"
              onClick={onClose}
            >
              Yopish
            </Button>
            <Button
              aria-label="button"
              color="primary"
              variant="flat"
              onClick={handleCreate}
            >
              Yaratish
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
