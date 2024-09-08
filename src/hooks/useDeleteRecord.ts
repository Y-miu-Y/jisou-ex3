import { Dispatch, SetStateAction, useCallback } from "react";
import { Record } from "../types/api/Record";
import { deleteRecord } from "./api/deleteRecord";

export const useDeleteRecord = (records:Array<Record>, setRecords:Dispatch<SetStateAction<Record[]>>) => {

  const removeRecord = useCallback((id:string) => {
    deleteRecord(id)
    .then(() => {
      const newRecords = records.filter((col) => col.id !== id);
      setRecords(newRecords);
    })
  }, [records]);

  return { removeRecord };
};
