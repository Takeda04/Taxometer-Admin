//@ts-nocheck
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  useDisclosure,
  Input
} from "@nextui-org/react";
import React, { useState } from "react";
import { columnsTarif, tarifs } from "./data";
import { RenderTarifCell } from "./renderTarif-cell";
import { toastError, toastLoading, toastSuccess } from "../toast";

export const TableTarifWrapper = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTarif, setSelectedTarif] = useState(null);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({
    tarif: "",
    id: ""
  });

  const catchChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const openModal = (type, tarif) => {
    setSelectedTarif(tarif);
    setFormData({
      tarif: tarif.tarif,
      narx: tarif.narx,
      id: tarif.id
    });
    setModalType(type);
    onOpen();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const toastId = toastLoading("Loading...");

    try {
      console.log(formData);
      toastSuccess("Tarif ma'lumotlari muaffaqiyatli yangilandi", toastId);
    } catch (error) {
      toastError("Error", toastId);
    } finally {
      onClose();
    }
  };

  const handleDelete = async (id) => {
    const toastId = toastLoading("Loading...");

    try {
      console.log(id);
      toastSuccess("Tarif muaffaqiyatli o'chirildi", toastId);
    } catch (error) {
      toastError("Error", toastId);
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
              <ModalHeader>Tarifni yangilash</ModalHeader>
              <ModalBody>
                <Input
                  name="tarif"
                  label="Tarif"
                  variant="bordered"
                  value={formData.tarif}
                  onChange={catchChange}
                />
                <Input
                  name="narx"
                  label="Narxi"
                  variant="bordered"
                  value={formData.narx}
                  onChange={catchChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button aria-label="button"  color="danger" variant="flat" onClick={onClose}>
                  Yopish
                </Button>
                <Button  aria-label="button" color="primary" variant="flat" onClick={handleUpdate}>
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
              <ModalHeader>{"Tarifni o'chirish"}</ModalHeader>
              <ModalBody>
                <p>Rostan ham <b>{selectedTarif?.tarif}</b> {"ni o'chirishni hohlaysizmi?"}</p>
              </ModalBody>
              <ModalFooter>
                <Button aria-label="button"  color="primary" variant="flat" onClick={onClose}>
                  Yopish
                </Button>
                <Button aria-label="button"  color="danger" variant="flat" onClick={() => handleDelete(selectedTarif?.id)}>
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
        <TableHeader columns={columnsTarif}>
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
        <TableBody items={tarifs}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  <RenderTarifCell
                    tarif={item}
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
