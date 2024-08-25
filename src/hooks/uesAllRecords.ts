import { useCallback, useState } from "react";
import { Record } from "../types/api/Record";
import { getStudyRecords } from "./api/getAllRecords";

export const useAllRecords = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ records, setRecords ] = useState<Array<Record>>([]);

  const getRecords = useCallback(() => {
    // 読み込み有効化
    setIsLoading(true);

    getStudyRecords()
      .then((res) => {
        setRecords(res?.data?.map((col) => new Record(col)) ?? []);
      })
      .catch(() => {
        alert("取得時エラー発生");
      })
      .finally(()=> {
        setIsLoading(false);
      })
  }, []);

  return { getRecords, isLoading, records, setRecords };
};
