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
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { toastError, toastSuccess } from "../toast";

export const AddTarif = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const catchChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleContinue = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (formData.name !== "" && formData.price !== "") {
        toastSuccess("Muaffaqiyatli yaratildi");
        console.log(formData);
      } else {
        throw new Error("Ma'lumotlar to'liq emas");
      }
    } catch (error) {
      // toastError(error.message, toastId);
    } finally {
      onClose();
    }
  };

  return (
    <div>
      <Button
       aria-label="button" 
        onClick={onOpen}
        color="primary"
        variant="bordered"
        startContent={<BalanceIcon />}
      >
        {"Tarif yaratish"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {"Ta'rif Yaratish"}
          </ModalHeader>
          <ModalBody>
            <Input
              name="name"
              label="Tarif nomi"
              variant="bordered"
              value={formData.name}
              onChange={catchChange}
            />
            <Input
              name="price"
              label="Narxi"
              variant="bordered"
              type="number"
              value={formData.price}
              onChange={catchChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button aria-label="button"  color="danger" variant="flat" onClick={onClose}>
              Yopish
            </Button>
            <Button aria-label="button"  color="primary" variant="flat" onClick={handleContinue}>
              Tasdiqlash
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
