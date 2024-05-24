//@ts-nocheck
import React, { useEffect, useState } from "react";
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
  Input,
  Pagination,
} from "@nextui-org/react";
import { RenderCell } from "./render-cell";
import { columns } from "./data";
import { toastError, toastSuccess } from "../toast";
import { deleteDriver, getDrivers } from "@/axios/UsersAPI";

export const TableWrapper = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState("");
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    carNumber: "",
    key: "",
    status: [
      {
        status: "ACTIVE",
      },
      {
        status: "InACTIVE",
      },
    ],
    tarif: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState();

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
      name: user.name,
      phone: user.phone,
      car_number: user.car_number,
      uuid: user.uuid,
      status: user.status,
      tarif: user.tarif,
    });
    setModalType(type); // Set the modal type
    onOpen(); // Open the modal
    console.log(user, "selected");
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
      await deleteDriver(id);
      toastSuccess("Foydalanuvchi muaffaqiyatli o'chirildi");
    } catch (error) {
      toastError("error");
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
                <p>
                  <b>F.I.O</b>: {selectedUser?.name}
                </p>
                <p>
                  <b>Haydovchi hujjati</b>: {selectedUser?.driver_license}
                </p>
                <p>
                  <b>Telefon raqami</b>: {selectedUser?.phone}
                </p>
                <p>
                  <b>Tarif</b>: {selectedUser?.tariff?.tariff_name}
                </p>
                <p>
                  <b>Status</b>: {selectedUser?.status}
                </p>
                <p>
                  <b>KEY</b>: {selectedUser?.uuid}
                </p>
                <p>
                  <b>Avtomobil turi</b>: {selectedUser?.car_type?.name}
                </p>
                <p>
                  <b>Avtomobil raqami</b>: {selectedUser?.car_number}
                </p>
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
                  value={formData.name}
                  onChange={catchChange}
                />
                <Input
                  name="phoneNumber"
                  label="Telefon raqami"
                  variant="bordered"
                  value={formData.phone}
                  onChange={catchChange}
                />
                <Input
                  name="carNumber"
                  label="Avtomobil raqami"
                  variant="bordered"
                  value={formData.car_number}
                  onChange={catchChange}
                />
                <Input
                  name="key"
                  label="Key"
                  variant="bordered"
                  value={formData.uuid}
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
                <p>
                  Rostan ham <b>{selectedUser?.name}</b> ni{" "}
                  {"o'chirishni hohlaysizmi"}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onClick={onClose}>
                  Yopish
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => handleDelete(selectedUser.id)}
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

  const fetchDriver = async () => {
    try {
      const data = await getDrivers(currentPage);
      setUsers(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.log(error.message);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchDriver();
  }, [currentPage]);

  const handlePageChange = (newpage) => {
    setCurrentPage(newpage);
  };

  if (loading) {
    return null;
  }

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
      <Pagination
        total={Math.ceil(meta.total / meta.per_page)}
        initialPage={currentPage}
        variant={"flat"}
        onChange={(newPage) => handlePageChange(newPage)}
      />
    </div>
  );
};
