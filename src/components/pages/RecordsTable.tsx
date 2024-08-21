import { FC, memo, useEffect } from "react";
import { useAllRecords } from "../../hooks/uesAllRecords";
import { Loading } from "../molecules/Loading";
import { TableContainer } from "@chakra-ui/react";
import { Header } from "../organism/layout/Header";

export const RecordsTable: FC = memo(() => {
  const { getRecords, isLoading, records } = useAllRecords();

  useEffect(() => getRecords(), [getRecords]);

  console.log(records);

  return(
    <>
      {isLoading? (
        <Loading />
      ) : (
        <>
        
          <Header></Header>
          <TableContainer>
            
          </TableContainer>
        </>
      )}
    </>
  );
});