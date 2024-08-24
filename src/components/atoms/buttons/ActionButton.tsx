import { Button } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
  children: string;
  onClick?: () => void;
}

export const ActionButton: FC<Props> = memo(({children, onClick}) => {
  return(
    <>
      <Button onClick={onClick}>
        {children}
      </Button>
    </>
  );
});