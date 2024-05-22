import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Select,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  SelectItem,
} from "@nextui-org/react";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { toastError, toastLoading, toastSuccess } from "../toast";

export const AddUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    carNumber: "",
    licensePlate: "",
    carType: "",
    tarif: "",
  });

  const catchChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTasdiqlash = async (e: { preventDefault: () => void; }) => {
    const toastId = toastLoading("Loading...")
    e.preventDefault();
    try {
      console.log(formData);
      toastSuccess("Foydalanuvchi muaffaqiyatli ro'yhatdan o'tkazildi", toastId);
    } catch (error) {
      toastError("error", toastId);
    }finally{
      onClose()
    }
  };

  const carTypes = [
    { car: "Chevrolet", value: "chevrolet" },
    { car: "Nissan", value: "nissan" },
    { car: "Kia", value: "kia" },
  ];

  const tarifOptions = [
    { tarif: "START", value: "start" },
    { tarif: "EKONOM", value: "ekonom" },
    { tarif: "COMFORT", value: "comfort" },
    { tarif: "BUSINESS", value: "business" },
    { tarif: "DELIVERY", value: "delivery" },
    { tarif: "LOAD", value: "load" },
  ];

  return (
    <div>
      <Button
        onClick={onOpen}
        color="primary"
        variant="bordered"
        startContent={<UsersIcon />}
        aria-label="Add User"
      >
        {"Haydovchi Qo'shish"}
        
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader>{"Haydovchi Qo'shish"}</ModalHeader>
          <ModalBody>
            <Input
              name="fullName"
              label="F.I.O"
              variant="bordered"
              value={formData.fullName}
              onChange={catchChange}
            />
            <Input
              name="phoneNumber"
              label="Telefon raqami"
              variant="bordered"
              value={formData.phoneNumber}
              onChange={catchChange}
            />
            <Input
              name="carNumber"
              label="Moshina raqami"
              variant="bordered"
              value={formData.carNumber}
              onChange={catchChange}
            />
            <Input
              name="licensePlate"
              label="Haydovchilik guvohnoma"
              variant="bordered"
              value={formData.licensePlate}
              onChange={catchChange}
            />
            <Select
              name="carType"
              label="Moshina turi"
              value={formData.carType}
              onChange={catchChange}
            >
              {carTypes.map(({ car, value }) => (
                <SelectItem key={value} value={value}>
                  {car}
                </SelectItem>
              ))}
            </Select>
            <Select
              name="tarif"
              label="Tarif"
              value={formData.tarif}
              onChange={catchChange}
            >
              {tarifOptions.map(({ tarif, value }) => (
                <SelectItem key={value} value={value}>
                  {tarif}
                </SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button aria-label="button"  color="danger" variant="flat" onClick={onClose}>
              Yopish
            </Button>
            <Button aria-label="button"  color="primary" variant="flat" onClick={handleTasdiqlash}>
              Tasdiqlash
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
