import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { createSite } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { mutate } from "swr";

const AddSiteModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, reset } = useForm();

  const initialRef = useRef(null);
  const toast = useToast();
  const auth = useAuth();

  const handleCreateSite = ({ name, url }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    };

    createSite(newSite);
    showSuccessToast("We've added your site.");

    mutate(
      "api/sites",
      (data) => {
        return { sites: [...data.sites, newSite] };
      },
      false
    ).then();

    onClose();
    reset();
  };

  const showSuccessToast = (message) => {
    toast({
      title: "Success !",
      description: message,
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {children}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="My site"
                name="name"
                {...register("name", {
                  required: true,
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                name="url"
                {...register("url", {
                  required: true,
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              mr={3}
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
            <Button
              onClick={onClose}
              backgroundColor="gray.100"
              color="gray.400"
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
