import { supabase } from "../../utils/supabase";


export const insertRecord = async(title:string, time:number) => {
  const {data, error} = await supabase
    .from('study-record')
    .insert({title, time})
    .select()
    .limit(1);

    return {data, error};
};