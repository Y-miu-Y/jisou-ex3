import { Dispatch,  SetStateAction, useCallback } from "react";
import { insertRecord } from "./api/insertRecord";
import { Record } from "../types/api/Record";

export const useInsertRecords = (setRecords:Dispatch<SetStateAction<Record[]>>) => {

  const addRecord = useCallback((title: string , time: number) => {
    console.log(title + time);
    if(title !== "" && time >= 0){
      insertRecord(title, time)
      .then((res) => {
        const record = res.data;
        if(record){
          setRecords(prevRecords => [...prevRecords, record]);
        }
      })
      .finally(() => {});
    } else {
      console.error("入力されていない");
    }
  }, [setRecords]);

  return { addRecord };
};
