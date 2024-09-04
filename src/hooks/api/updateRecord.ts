import { supabase } from "../../utils/supabase";

type Props = {
  id: string;
  title: string;
  time: number;
}

export const updateRecord = async({id, title, time}: Props) => {
  const { error } = await supabase
    .from('study-record')
    .update({title, time})
    .eq('id', id)
    .select();

  return { error };
};