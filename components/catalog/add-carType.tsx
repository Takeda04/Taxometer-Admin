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
import { CarIcon } from "../icons/catalog/car-icon";
import { toastError, toastLoading, toastSuccess } from "../toast";

export const AddCardtype = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    type: "",
  });

  const catchChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    const toastId = toastLoading("Loading...");
    try {
      if (formData.type !== "") {
        toastSuccess("Muaffaqaiyatli yaratildi", toastId);
        console.log(formData);
      } else {
        throw new Error("Ma'lumotlar to'liq emas");
      }
    } catch (error) {
      toastError(error.message, toastId);
    }
    onClose();
  };

  return (
    <div>
      <Button
        onClick={onOpen}
        color="primary"
        variant="bordered"
        startContent={<CarIcon />}
      >
        {"Avtomobil yaratish"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {"Avtomobil Yaratish"}
          </ModalHeader>
          <ModalBody>
            <Input
              name="type"
              label="Avtomobil turi"
              variant="bordered"
              value={formData.type}
              onChange={catchChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={onClose}>
              Yopish
            </Button>
            <Button color="primary" variant="flat" onClick={handleCreate}>
              Tasdiqlash
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
