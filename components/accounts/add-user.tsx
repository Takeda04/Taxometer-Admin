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
import React from "react";
import { UsersIcon } from "../icons/breadcrumb/users-icon";

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const carType = [
    { car: "Chevrolet", value: "chevrolet" },
    { car: "Nissan", value: "nissan" },
    { car: "Kia", value: "kia" },
  ];

  const tarif = [
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
        onPress={onOpen}
        color="primary"
        variant="bordered"
        startContent={<UsersIcon />}
        aria-label="Add User"
      >
        {"Haydovchi Qo'shish"}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {"Haydovchi Qo'shish"}
              </ModalHeader>
              <ModalBody>
                <Input label="Ism" variant="bordered" />
                <Input label="Familiya" variant="bordered" />
                <Input label="Otasining ismi" variant="bordered" />
                <Input label="Telefon raqami" variant="bordered" />
                <Input label="Moshina raqami" variant="bordered" />
                <Input label="Haydovchilik guvohnoma" variant="bordered" />
                <Select label="Moshina turi">
                  {carType.map(({ car, value }) => (
                    <SelectItem key={value} value={value}>
                      {car}
                    </SelectItem>
                  ))}
                </Select>
                <Select label="Tarif">
                  {tarif.map(({ tarif, value }) => (
                    <SelectItem key={value} value={value}>
                      {tarif}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Yopish
                </Button>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Tasdiqlash
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
