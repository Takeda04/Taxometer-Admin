//@ts-nocheck
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { columnsCar, cars } from "./data";
import { RenderCarCell } from "./renderCar-cell";
import { toastError, toastSuccess } from "../toast";

export const TableCarWrapper = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({
    typeCar: "",
    id: ""
  });

  const catchChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const openModal = (type, car) => {
    setSelectedCar(car); 
    setFormData({
      typeCar: car.typeCar,
      id: car.id
    });
    setModalType(type); 
    onOpen(); 
    console.log(car, "selected");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      toastSuccess("Foydalanuvchi ma'lumotlari muaffaqiyatli yangilandi");
    } catch (error) {
      toastError("error");
    } finally {
      onClose();
    }
  };

  const handleDelete = async (id) => {

    try {
      console.log(id);
      toastSuccess("Foydalanuvchi muaffaqiyatli o'chirildi");
    } catch (error) {
      toastError("error");
    } finally {
      onClose();
    }
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "update":
        return (
          <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
            <ModalContent>
              <ModalHeader>Avtomobil turini yangilash</ModalHeader>
              <ModalBody>
                <Input
                  name="typeCar"
                  label="Avtomobil turi"
                  variant="bordered"
                  value={formData.typeCar}
                  onChange={catchChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button aria-label="button" color="danger" variant="flat" onClick={onClose}>
                  Yopish
                </Button>
                <Button aria-label="button"  color="primary" variant="flat" onClick={handleUpdate}>
                  Yangilash
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        );
      case "delete":
        return (
          <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
            <ModalContent>
              <ModalHeader>{"Haydovchini o'chirish"}</ModalHeader>
              <ModalBody>
                <p>Rostan ham <b>{selectedCar?.typeCar}</b> ni {"o'chirishni hohlaysizmi?"}</p>
              </ModalBody>
              <ModalFooter>
                <Button aria-label="button"  color="primary" variant="flat" onClick={onClose}>
                  Yopish
                </Button>
                <Button  aria-label="button" color="danger" variant="flat" onClick={() => handleDelete(selectedCar?.id)}>
                  {"O'chirish"}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columnsCar}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={cars}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  <RenderCarCell
                    car={item}
                    columnKey={columnKey}
                    openModal={openModal}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {renderModalContent()}
    </div>
  );
};
