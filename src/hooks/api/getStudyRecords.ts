import { supabase } from "../../utils/supabase";

export const getStudyRecords = async() => {
  const { data, error } = await supabase
    .from('study-record')
    .select();
  return { data, error };
};