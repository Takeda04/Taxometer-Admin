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
import { CarIcon } from "../icons/catalog/car-icon";
  
  export const AddCardtype = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
      <div>
        <>
          <Button
            onPress={onOpen}
            color="primary"
            variant="bordered"
            startContent={<CarIcon />}
          >
            {"Avtomobil yaratish"}
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
                    {"Avtomobil Yaratish"}
                  </ModalHeader>
                  <ModalBody>
                    <Input label="Avtomobil Brand" variant="bordered" />
                    <Input label="Avtomobil turi" variant="bordered" />
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
  