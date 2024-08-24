import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { FC, memo, useState } from "react";
import { ActionButton } from "../../atoms/buttons/ActionButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  time?: number;
  addRecord: (title: string, time: number) => void;
}

export const AddRecordModal:FC<Props> = memo(({isOpen, onClose, title, time, addRecord}) =>{
  const [ modalTitle, setModalTitle ] = useState(title ?? "");
  const [ modalTime, setModalTime ] = useState(time ?? 0);

  const onChangeTitle = (inputTitle: string) => {
    setModalTitle(inputTitle);
  };

  const onChangeTime = (inputTime: number) => {
    setModalTime(inputTime);
  };

  const doEndModal = () => {
    setModalTitle("");
    setModalTime(0);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={doEndModal} autoFocus={false} motionPreset="slideInBottom">
        <ModalOverlay></ModalOverlay>
        <ModalContent pb={6}>
          <ModalHeader>ユーザー詳細</ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>学習内容</FormLabel>
                <Input onChange={(e) => onChangeTitle(e.target.value)} value={modalTitle}></Input>
              </FormControl>
              <FormControl>
                <FormLabel>学習時間</FormLabel>
                <Input  onChange={(e) => onChangeTime(Number(e.target.value))} value={modalTime}></Input>
              </FormControl>
            <ActionButton onClick={() => {
              addRecord(modalTitle ?? "", modalTime ?? 0);
              doEndModal();
            }}>
            登録
            </ActionButton>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
})
