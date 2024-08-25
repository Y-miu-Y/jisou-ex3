import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, FormControl, FormLabel, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import React, { FC, memo } from "react";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  time?: number;
  addRecord: (title: string, time: number) => void;
}

type formInputs = {
  title: string;
  time: number;
}

export const RecordModalForm:FC<Props> = memo(({isOpen, onClose, title, time, addRecord}) =>{

  const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<formInputs>({
    defaultValues: {
      title, time
    }
  });

  const endModal = () => {
    reset();
    onClose();
  };

  // submit時の処理を記述
  const onSubmit = handleSubmit((data) => {
    addRecord(data.title, data.time);
    endModal();
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={endModal} autoFocus={false} motionPreset="slideInBottom">
        <ModalOverlay></ModalOverlay>
        <ModalContent pb={6}>
          <ModalHeader>ユーザー詳細</ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody mx={4}>
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                <FormControl isInvalid={Boolean(errors.title)}>
                  <FormLabel htmlFor='title'>学習内容</FormLabel>
                  <Input
                    id='title'
                    {...register('title', {
                      required: '内容の入力は必須です'
                    })}
                    value={title}
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.time)}>
                  <FormLabel htmlFor='time'>学習時間</FormLabel>
                  <Input
                    id='time'
                    {...register('time', {
                      //validation here
                      required: '時間の入力は必須です',
                      pattern: {value: /^[0-9]+$/, message: '時間は0以上である必要があります'} // 数値かどうか
                    })}
                    value={time}
                  />
                  <FormErrorMessage>
                    {errors.time && errors.time.message}
                  </FormErrorMessage>
                </FormControl>
                <Button type='submit' isLoading={isSubmitting}>
                  登録
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
})
