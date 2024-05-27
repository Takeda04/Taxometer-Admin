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
  import { managerCols } from "./data";
  import { toastError, toastSuccess } from "../toast";
  import { deleteManager, deleteTarif, getUsers, updateManager, updateTarif } from "@/axios/UsersAPI";
import { AddManager } from "../catalog/add-Man";
import { RenderManagerCell } from "./renderMan-cell";
  
  export const TableManagerWrapper = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedManager, setSelectedManager] = useState(null);
    const [modalType, setModalType] = useState("");
    const [manager, setManager] = useState([]);
    const [formData, setFormData] = useState({
      id: "",
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
  
    const catchChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const openModal = (type, manager) => {
      setSelectedManager(manager);
      setFormData({
        id: manager.id,
        name: manager.name,
        email: manager.email,
      });
      setModalType(type);
      onOpen();
    };
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        await updateManager(formData);
        toastSuccess("Muaffaqiyatli yangilandi");
        getManager(); // Refresh the tariffs list
      } catch (error) {
        toastError("Kechirasiz, sizda buning uchun ruhsat yo'q");
      } finally {
        onClose();
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await deleteManager(id);
        toastSuccess("Muaffaqiyatli o'chirildi");
        getManager(); // Refresh the tariffs list
      } catch (error) {
        toastError("Kechirasiz, sizda buning uchun ruhsat yo'q");
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
                <ModalHeader>Managerni yangilash</ModalHeader>
                <ModalBody>
                  <Input
                    name="name"
                    label="Manager ismi"
                    variant="bordered"
                    value={formData.name}
                    onChange={catchChange}
                  />
                  <Input
                    name="email"
                    label="Manager logini"
                    variant="bordered"
                    type="email"
                    value={formData.email}
                    onChange={catchChange}
                  />
                  <Input
                    name="password"
                    label="Parol"
                    variant="bordered"
                    type="text"
                    value={formData.password}
                    onChange={catchChange}
                  />
                  <Input
                    name="password_confirmation"
                    label="Parol tasdiqlash"
                    variant="bordered"
                    type="text"
                    value={formData.password_confirmation}
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
                  <p>Rostan ham <b>{selectedManager?.name}</b> {"ni o'chirishni hohlaysizmi?"}</p>
                </ModalBody>
                <ModalFooter>
                  <Button aria-label="button" color="primary" variant="flat" onClick={onClose}>
                    Yopish
                  </Button>
                  <Button aria-label="button" color="danger" variant="flat" onClick={() => handleDelete(selectedManager?.id)}>
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
  
    const getManager = async () => {
      try {
        const {users} = await getUsers();
        setManager(users);
      } catch (error) {
        // console.log(error);
      }
    };
  
    useEffect(() => {
        getManager();
    }, []);
    
    
  
    return (
      <div className="w-full flex flex-col gap-4">
        <AddManager refreshManagers={getManager} />
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={managerCols}>
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
          <TableBody items={manager}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell key={columnKey}>
                    <RenderManagerCell
                      manager={item}
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
  