import { Center, Spinner } from "@chakra-ui/react";
import { FC, memo } from "react";


export const Loading: FC = memo(() => {
  return (
    <Center h="100vh">
      <Spinner />
    </Center>
  );
});