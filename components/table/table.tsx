//@ts-nocheck
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input
} from "@nextui-org/react";
import { RenderCell } from "./render-cell";
import { columns, users } from "./data";
import { toastError, toastLoading, toastSuccess } from "../toast";

export const TableWrapper = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook for modal
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user
  const [modalType, setModalType] = useState(""); // State to store modal type

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    carNumber: "",
    key: "",
    status: "",
    tarif: ""
  });

  const catchChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const openModal = (type, user) => {
    setSelectedUser(user); // Set the selected user
    setFormData({
      fullName: user.name,
      phoneNumber: user.phoneNumber,
      carNumber: user.carNumber,
      key: user.key,
      status: user.status,
      tarif: user.tarif,
    });
    setModalType(type); // Set the modal type
    onOpen(); // Open the modal
    console.log(user, "selected");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const toastId = toastLoading("Loading...");

    try {
      console.log(formData);
      toastSuccess("Foydalanuvchi ma'lumotlari muaffaqiyatli yangilandi", toastId);
    } catch (error) {
      toastError("error", toastId);
    } finally {
      onClose();
    }
  };
  const handleDelete = async (id) => {
    const toastId = toastLoading("Loading...");

    try {
      console.log(id);
      toastSuccess("Foydalanuvchi muaffaqiyatli o'chirildi", toastId);
    } catch (error) {
      toastError("error", toastId);
    } finally {
      onClose();
    }
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "show":
        return (
          <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
            <ModalContent>
              <ModalHeader>User Details</ModalHeader>
              <ModalBody>
                <p><b>F.I.O</b>: {selectedUser?.name}</p>
                <p><b>Telefon raqami</b>: {selectedUser?.phoneNumber}</p>
                <p><b>Tarif</b>: {selectedUser?.tarif}</p>
                <p><b>Status</b>: {selectedUser?.status}</p>
                <p><b>KEY</b>: {selectedUser?.key}</p>
                <p><b>Avtomobil raqami</b>: {selectedUser?.carNumber}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Yopish
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        );
      case "update":
        return (
          <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
            <ModalContent>
              <ModalHeader>Haydovchini yangilash</ModalHeader>
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
                  label="Avtomobil raqami"
                  variant="bordered"
                  value={formData.carNumber}
                  onChange={catchChange}
                />
                <Input
                  name="key"
                  label="Key"
                  variant="bordered"
                  value={formData.key}
                  onChange={catchChange}
                />
                <Input
                  name="status"
                  label="Status"
                  variant="bordered"
                  value={formData.status}
                  onChange={catchChange}
                />
                <Input
                  name="tarif"
                  label="Tarif"
                  variant="bordered"
                  value={formData.tarif}
                  onChange={catchChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Yopish
                </Button>
                <Button color="primary" variant="flat" onClick={handleUpdate}>
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
                <p>Rostan ham <b>{selectedUser?.name}</b> ni {"o'chirishni hohlaysizmi"}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onClick={onClose}>
                  Yopish
                </Button>
                <Button color="danger" variant="flat" onClick={() => handleDelete(selectedUser.id)}>
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
        <TableHeader columns={columns}>
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
        <TableBody items={users}>
          {(item) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>
                  <RenderCell
                    user={item}
                    columnKey={columnKey}
                    openModal={openModal} // Pass openModal function as a prop
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Render modal based on type */}
      {renderModalContent()}
    </div>
  );
};
