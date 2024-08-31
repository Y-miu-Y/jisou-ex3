import { FC, memo, useEffect } from "react";
import { useAllRecords } from "../../hooks/uesAllRecords";
import { Loading } from "../molecules/Loading";
import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { Header } from "../organism/layout/Header";
import { ActionButton } from "../atoms/buttons/ActionButton";
import { RecordModalForm } from "../organism/records/RecordModalForm";
import { useInsertRecords } from "../../hooks/useInsertRecords";
import { useDeleteRecord } from "../../hooks/useDeleteRecord";

export const RecordsTable: FC = memo(() => {
  const { getRecords, isLoading, records, setRecords} = useAllRecords();
  const {isOpen, onClose, onOpen} = useDisclosure();
  const { addRecord } = useInsertRecords(records, setRecords);
  const { removeRecord } = useDeleteRecord(records, setRecords);

  useEffect(() => getRecords(), [getRecords]);

  console.log(records);

  return(
    <>
      {isLoading? (
        <Loading />
      ) : (
        <>
          <Header />
          <ActionButton onClick={onOpen}>
            新規登録
          </ActionButton>
          <TableContainer>
            <Table data-testid='studyRecordTable'>
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
                    <Td>
                      <Button onClick={() => removeRecord(record.id)}>
                        削除
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <RecordModalForm isOpen={isOpen} onClose={onClose} addRecord={addRecord}></RecordModalForm>
        </>
      )}
    </>
  );
});