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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { RenderCell } from "./render-cell";
import { columns } from "./data";
import { toastError, toastSuccess } from "../toast";
import { deleteDriver, getDrivers, getTarifs, updateDriver } from "@/axios/UsersAPI";

export const TableWrap = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState("");
  const [users, setUsers] = useState([]);
  const [tarif, setTarif] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    status: "",
    tariff_id: null,
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

  const openModal = async (type, user) => {
    try {
      const {data} = await getTarifs();
      setTarif(data);
      setSelectedUser(user);
      setFormData({
        id: user.id,
        name: user.name,
        status: user.status,
        tariff_id: user.tariff.id,
      });
      setModalType(type); // Set the modal type
      onOpen(); // Open the modal
      console.log(user)
    } catch (error) {
      console.log(error);
    }
  };
  console.log(tarif, "selected");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateDriver(formData);
      fetchDriver();
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
      fetchDriver();
      toastSuccess("Foydalanuvchi muaffaqiyatli o'chirildi");
    } catch (error) {
      toastError("error");
    } finally {
      onClose();
    }
  };
  const state = [
    {
      stats: "active",
    },
    {
      stats: "inactive",
    },
  ];

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
                  name="name"
                  label="F.I.O"
                  variant="bordered"
                  value={formData.name}
                  onChange={catchChange}
                />
                <Select
                  name="status"
                  label="Haydovchi holati"
                  value={formData.status}
                  defaultSelectedKeys={[formData.status]}
                  onChange={catchChange}
                >
                  {state.map(({ stats }) => (
                    <SelectItem key={stats} value={true}>
                      {stats}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  name="tariff_id"
                  label="Haydovchi Tarifi"
                  value={formData.tariff_id}
                  defaultSelectedKeys={[formData.tariff_id]}
                  onChange={catchChange}
                >
                  {tarif.map((item) => (
                    <SelectItem key={item?.id} value={item.id}>
                      {item?.tariff_name}
                    </SelectItem>
                  ))}
                </Select>
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
    } finally {
      setLoading(false);
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
