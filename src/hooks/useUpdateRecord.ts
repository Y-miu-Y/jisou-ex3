import { Dispatch, SetStateAction, useCallback } from "react";
import { Record } from "../types/api/Record";
import { updateRecord } from "./api/updateRecord";

export const useUpdateRecord = (setRecords:Dispatch<SetStateAction<Record[]>>) => {

  const executeUpdateRecord = useCallback((id:string, title:string, time:number) => {
    updateRecord({id, title, time})
    .then(() => {
      setRecords(prevRecords => 
        // IDが一致する場合タイトルと時間を置き換え
        prevRecords.map(record => record.id === id ? {...record, title, time} : record)
      );
    })
  }, [setRecords]);

  return { executeUpdateRecord };
};
