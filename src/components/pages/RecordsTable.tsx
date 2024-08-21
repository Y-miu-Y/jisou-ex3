import { FC, memo, useEffect } from "react";
import { useAllRecords } from "../../hooks/uesAllRecords";
import { Loading } from "../molecules/Loading";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
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
        
          <Header />
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>学習内容</Th>
                  <Th>学習時間</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {records.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.title}</Td>
                    <Td>{record.time}時間</Td>
                    <Td>編集</Td>
                    <Td>削除</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
});