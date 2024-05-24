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
import React, { useEffect, useState } from "react";
import { columnsTarif } from "./data";
import { RenderTarifCell } from "./renderTarif-cell";
import { toastError, toastSuccess } from "../toast";
import { createTarif, deleteTarif, getTarifs, updateTarif } from "@/axios/UsersAPI";
import { AddTarif } from "../catalog/add-tarif";

export const TableTarifWrapper = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTarif, setSelectedTarif] = useState(null);
  const [modalType, setModalType] = useState("");
  const [tarifs, setTarifs] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    tariff_name: "",
    tariff_price: "",
    price_for_expectation: "",
    expectation: ""
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
      id: tarif.id,
      tariff_name: tarif.tariff_name,
      tariff_price: tarif.tariff_price,
      price_for_expectation: tarif.price_for_expectation,
      expectation: tarif.expectation
    });
    setModalType(type);
    console.log(tarif.id, "id");
    
    onOpen();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateTarif(formData);
      toastSuccess("Tarif ma'lumotlari muaffaqiyatli yangilandi");
      getTarif(); // Refresh the tariffs list
    } catch (error) {
      toastError(error.message);
    } finally {
      onClose();
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTarif(id);
      toastSuccess("Tarif muaffaqiyatli o'chirildi");
      getTarif(); // Refresh the tariffs list
    } catch (error) {
      toastError("Error");
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
                  name="tariff_name"
                  label="Tarif"
                  variant="bordered"
                  value={formData.tariff_name}
                  onChange={catchChange}
                />
                <Input
                  name="tariff_price"
                  label="Narxi"
                  variant="bordered"
                  type="number"
                  value={formData.tariff_price}
                  onChange={catchChange}
                />
                <Input
                  name="price_for_expectation"
                  label="Tarif kutish vaqti"
                  variant="bordered"
                  type="number"
                  value={formData.price_for_expectation}
                  onChange={catchChange}
                />
                <Input
                  name="expectation"
                  label="Tarif tekin kutish vaqti"
                  variant="bordered"
                  type="number"
                  value={formData.expectation}
                  onChange={catchChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button aria-label="button" color="danger" variant="flat" onClick={onClose}>
                  Yopish
                </Button>
                <Button aria-label="button" color="primary" variant="flat" onClick={handleUpdate}>
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
                <p>Rostan ham <b>{selectedTarif?.tariff_name}</b> {"ni o'chirishni hohlaysizmi?"}</p>
              </ModalBody>
              <ModalFooter>
                <Button aria-label="button" color="primary" variant="flat" onClick={onClose}>
                  Yopish
                </Button>
                <Button aria-label="button" color="danger" variant="flat" onClick={() => handleDelete(selectedTarif?.id)}>
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

  const getTarif = async () => {
    try {
      const { data } = await getTarifs();
      setTarifs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTarif();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <AddTarif refreshTarifs={getTarif} /> {/* Pass the refreshTarifs prop */}
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
