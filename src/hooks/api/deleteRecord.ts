import { supabase } from "../../utils/supabase";

export const deleteRecord = async(id: string) => {
  const { data, error } = await supabase
    .from('study-record')
    .delete()
    .eq('id', id);
  return { data, error };
};