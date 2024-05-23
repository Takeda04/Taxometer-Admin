//@ts-nocheck
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { columnsCar, cars } from "./data";
import { RenderCarCell } from "./renderCar-cell";
import { toastError, toastSuccess } from "../toast";
// import { AddTarif } from "../catalog/add-tarif";
import { deleteCar, getCars, updateCar } from "@/axios/UsersAPI";
import { AddCardtype } from "../catalog/add-carType";

export const TableCarWrapper = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    id: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

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
      name: car.name,
      id: car.id,
    });
    setModalType(type);
    onOpen();
    console.log(car, "selected");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateCar(formData);
      console.log(formData);
      await fetchData();
      toastSuccess("Foydalanuvchi ma'lumotlari muaffaqiyatli yangilandi");
    } catch (error) {
      toastError(error.message);
    } finally {
      onClose();
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      await fetchData();
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
                  name="name"
                  label="Avtomobil turi"
                  variant="bordered"
                  value={formData.name}
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
                  onClick={handleUpdate}
                >
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
                <p>
                  Rostan ham <b>{selectedCar?.name}</b> ni{" "}
                  {"o'chirishni hohlaysizmi?"}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  aria-label="button"
                  color="primary"
                  variant="flat"
                  onClick={onClose}
                >
                  Yopish
                </Button>
                <Button
                  aria-label="button"
                  color="danger"
                  variant="flat"
                  onClick={() => handleDelete(selectedCar?.id)}
                >
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
  const [meta, setMeta] = useState();

  const fetchData = async () => {
    try {
      const data = await getCars(currentPage);
      setCars(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageChange = (newpage) => {
    setCurrentPage(newpage);
    console.log(newpage);
  };

  if (loading) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <AddCardtype refreshCars={fetchData} />
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
      <Pagination
        total={Math.ceil(meta.total / meta.per_page)}
        initialPage={currentPage}
        variant={"flat"}
        onChange={(newPage) => handlePageChange(newPage)}
      />
    </div>
  );
};
