//@ts-nocheck
import React, { useEffect, useState } from "react";
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
import { toastError, toastSuccess } from "../toast";
import { createDriver, getCars, getTarifs } from "@/axios/UsersAPI";

export const AddUser = ({refreshDrivers}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [carTypes, setCarTypes] = useState([]);
  const [tarifOptions, setTarifOptions] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    driver_license: "",
    car_number: "",
    tariff_id: undefined,
    car_type_id: undefined,
  });

  const catchChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    
    const licenseRegex = /^[A-Z0-9]+$/;
    
    const carNumberRegex = /^[A-Z0-9]+$/;
    
    if (name === "driver_license" && licenseRegex.test(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.toUpperCase(),
      }));
    } else if (name === "car_number" && carNumberRegex.test(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.toUpperCase(),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  

  const handleTasdiqlash = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (
        formData.name !== "" &&
        formData.phone !== "" &&
        formData.car_number !== "" &&
        formData.car_type_id !== "" &&
        formData.driver_license !== "" &&
        formData.tariff_id !== ""
      ) {
        await createDriver(formData);
        toastSuccess("Foydalanuvchi muaffaqiyatli ro'yhatdan o'tkazildi");
        await refreshDrivers();
      }else{
        throw new Error("Ma'lumotlar to'liq emas");
      }
    } catch (error) {
      toastError(error.message);
    } finally {
      onClose();
    }
  };

  const getTarif = async () => {
    try {
      const { data } = await getTarifs();
      const car = await getCars();
      setTarifOptions(data);
      setCarTypes(car.data);
      console.log(data, "data");
    } catch (error) {
      // console.log(error.message);
    }
  };

  useEffect(() => {
    getTarif();
  }, []);

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
              name="name"
              label="F.I.O"
              variant="bordered"
              value={formData.name}
              onChange={catchChange}
            />
            <Input
              name="phone"
              label="Telefon raqami"
              variant="bordered"
              value={formData.phone}
              onChange={catchChange}
            />
            <Input
              name="driver_license"
              label="Haydovchilik guvohnoma"
              variant="bordered"
              value={formData.driver_license}
              onChange={catchChange}
            />
            <Input
              name="car_number"
              label="Avtomobil raqami"
              variant="bordered"
              value={formData.car_number}
              onChange={catchChange}
            />
            <Select
              name="car_type_id"
              label="Moshina turi"
              value={formData.car_type_id}
              onChange={catchChange}
            >
              {carTypes.map(({ name, id }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </Select>
            <Select
              name="tariff_id"
              label="Tarif"
              value={formData.tariff_id}
              onChange={catchChange}
            >
              {tarifOptions.map(({ tariff_name, id }) => (
                <SelectItem key={id} value={id}>
                  {tariff_name}
                </SelectItem>
              ))}
            </Select>
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
              onClick={handleTasdiqlash}
            >
              Tasdiqlash
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
