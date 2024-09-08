import { FC, memo, useEffect, useState } from "react";
import { useAllRecords } from "../../hooks/useAllRecords";
import { Loading } from "../molecules/Loading";
import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { Header } from "../organism/layout/Header";
import { ActionButton } from "../atoms/buttons/ActionButton";
import { RecordModalForm } from "../organism/records/RecordModalForm";
import { useInsertRecords } from "../../hooks/useInsertRecords";
import { useDeleteRecord } from "../../hooks/useDeleteRecord";
import { useUpdateRecord } from "../../hooks/useUpdateRecord";
import { Record } from "../../types/api/Record";

export const RecordsTable: FC = memo(() => {
  const { getRecords, isLoading, records, setRecords} = useAllRecords();
  const {isOpen, onClose, onOpen} = useDisclosure();
  const { addRecord } = useInsertRecords(setRecords);
  const { executeUpdateRecord } = useUpdateRecord(setRecords);

  const { removeRecord } = useDeleteRecord(records, setRecords);
  
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  useEffect(() => getRecords(), [getRecords]);

  const openUpdateModal = (record?: Record) => {
    setSelectedRecord(record || null);
    onOpen();
  }

  const handleSubmit = (data: { title: string; time: number }, id?: string) => {
    if (id) {
      executeUpdateRecord(id, data.title, data.time);
    } else {
      addRecord(data.title, data.time);
    }
  };

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
                  <Tr key={record.id} data-testid={`row_${record.id}`}>
                    <Td data-testid={`row-title_${record.id}`}>{record.title}</Td>
                    <Td data-testid={`row-time_${record.id}`}>{record.time}時間</Td>
                    <Td>
                      <Button onClick={() => openUpdateModal(record)} data-testid={`update-button_${record.id}`}>
                        更新
                      </Button>
                    </Td>
                    <Td>
                      <Button onClick={() => removeRecord(record.id)} data-testid={`delete-button_${record.id}`}>
                        削除
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <RecordModalForm 
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            initialData={selectedRecord ? { id: selectedRecord.id, title: selectedRecord.title, time: selectedRecord.time } : undefined}
          />
        </>
      )}
    </>
  );
});