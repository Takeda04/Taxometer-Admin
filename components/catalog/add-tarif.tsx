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
  import React from "react";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
  
  export const AddTarif = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
      <div>
        <>
          <Button
            onPress={onOpen}
            color="primary"
            variant="bordered"
            startContent={<BalanceIcon />}
          >
            {"Tarif yaratish"}
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {"Ta'rif Yaratish"}
                  </ModalHeader>
                  <ModalBody>
                    <Input label="Tarif nomi" variant="bordered" />
                    <Input label="Narxi" variant="bordered" type="number"/>
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
        </>
      </div>
    );
  };
  