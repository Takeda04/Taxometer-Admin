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
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { toastError, toastSuccess } from "../toast";
import { createTarif } from "@/axios/UsersAPI";

export const AddTarif = ({ refreshTarifs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    tarif: "",
    price: "",
    call_price: "",
    time: "",
    waiting: "",
    tariff_min_price: "",
    tariff_min_km: "",
  });

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
        formData.tarif !== "" &&
        formData.price !== "" &&
        formData.time !== "" &&
        formData.waiting !== "" &&
        formData.call_price !== "" &&
        formData.tariff_min_price !== "" && 
        formData.tariff_min_km !== ""
      ) {
        await createTarif(formData);
        toastSuccess("Muaffaqiyatli yaratildi");
        refreshTarifs(); // Refresh the tariffs list
      } else {
        throw new Error("Ma'lumotlar to'liq emas");
      }
    } catch (error) {
      toastError("Kechirasiz, sizda buning uchun ruhsat yo'q");
    } finally {
      onClose();
      setFormData({
        tarif: "",
        price: "",
        call_price: "",
        time: "",
        waiting: "",
        tariff_min_price: "",
        tariff_min_km: ""
      });
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
              name="tarif"
              label="Tarif"
              variant="bordered"
              value={formData.tarif}
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
            <Input
              name="call_price"
              label="Chaqiruv narxi"
              variant="bordered"
              type="number"
              value={formData.call_price}
              onChange={catchChange}
            />
            <Input
              name="waiting"
              label="Tarif kutish summasi"
              variant="bordered"
              type="number"
              value={formData.waiting}
              onChange={catchChange}
            />
            <Input
              name="time"
              label="Tarif tekin kutish vaqti"
              variant="bordered"
              type="number"
              value={formData.time}
              onChange={catchChange}
            />
            <Input
              name="tariff_min_price"
              label="1 km gacha ta'rif narxi"
              variant="bordered"
              type="number"
              value={formData.tariff_min_price}
              onChange={catchChange}
            />
            <Input
              name="tariff_min_km"
              label="Minimal kilometer (km)"
              variant="bordered"
              type="number"
              value={formData.tariff_min_km}
              onChange={catchChange}
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
              Tasdiqlash
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
