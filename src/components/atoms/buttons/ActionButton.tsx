import { Button } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
  children: string;
  onClick?: () => void;
  isLoading?: boolean
}

export const ActionButton: FC<Props> = memo(({children, onClick, isLoading}) => {
  return(
    <>
      <Button onClick={onClick} isLoading={isLoading}>
        {children}
      </Button>
    </>
  );
});