import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, FormControl, FormLabel, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import React, { FC, memo, useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: { id?: string; title: string; time: number };
  onSubmit: (data: { title: string; time: number }, id?: string) => void;
}

type formInputs = {
  id: string | undefined;
  title: string;
  time: number;
}

export const RecordModalForm:FC<Props> = memo(({isOpen, onClose, initialData, onSubmit}) =>{

  const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<formInputs>({
    defaultValues: initialData || { title: "", time: 0 }
  });
  
  useEffect(() => {
    if (isOpen && initialData) {
      reset(initialData);
    }
  }, [isOpen, initialData, reset]);

  const endModal = () => {
    reset();
    onClose();
  };

  // submit時の処理を記述
  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data, initialData?.id);
    endModal();
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={endModal} autoFocus={false} motionPreset="slideInBottom">
        <ModalOverlay></ModalOverlay>
        <ModalContent pb={6} data-testid="modal-insert">
          <ModalHeader data-testid="modal-header">新規登録</ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody mx={4}>
            <form onSubmit={handleFormSubmit}>
              <Stack spacing={4}>
                <FormControl isInvalid={Boolean(errors.title)}>
                  <FormLabel htmlFor='title'>学習内容</FormLabel>

                  <Input
                    data-testid="modal-input-title"
                    id='title'
                    {...register('title', {
                      required: '内容の入力は必須です'
                    })}
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.time)}>
                  <FormLabel htmlFor='time'>学習時間</FormLabel>
                  <Input
                    data-testid="modal-input-time"
                    id='time'
                    {...register('time', {
                      //validation here
                      required: '時間の入力は必須です',
                      pattern: {value: /^[0-9]+$/, message: '時間は0以上である必要があります'} // 数値かどうか
                    })}
                  />
                  <FormErrorMessage data-testid="modal-error">
                    {errors.time && errors.time.message}
                  </FormErrorMessage>
                </FormControl>
                <Button type='submit' isLoading={isSubmitting} data-testid="modal-submit">
                  {initialData?.id? '更新' : '登録'}
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
})
