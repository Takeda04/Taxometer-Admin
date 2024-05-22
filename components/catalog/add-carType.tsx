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
import { toastError, toastSuccess } from "../toast";

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
    try {
      if (formData.type !== "") {
        toastSuccess("Muaffaqaiyatli yaratildi");
        console.log(formData);
      } else {
        throw new Error("Ma'lumotlar to'liq emas");
      }
    } catch (error) {
      // toastError(error.message, toastId);
    }
    onClose();
  };

  return (
    <div>
      <Button
       aria-label="button" 
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
            <Button aria-label="button"  color="danger" variant="flat" onClick={onClose}>
              Yopish
            </Button>
            <Button aria-label="button"  color="primary" variant="flat" onClick={handleCreate}>
              Tasdiqlash
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
