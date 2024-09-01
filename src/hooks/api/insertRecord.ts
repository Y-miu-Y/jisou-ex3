import { Record } from "../../types/api/Record";
import { supabase } from "../../utils/supabase";

export const insertRecord = async (title: string, time: number): Promise<{ data: Record | null, error: Error | null }> => {
  try {
    if (!supabase.from) {
      throw new Error('Supabase client is not initialized properly');
    }

    const response = await supabase
      .from('study-record')
      .insert({ title, time })
      .select()
      .single();

    if (response.error) throw response.error;

    if (response.data) {
      return { 
        data: new Record({
          id: response.data.id,
          title: response.data.title,
          time: response.data.time,
          created_at: new Date(response.data.created_at)
        }), 
        error: null 
      };
    } else {
      throw new Error('No data returned after insert');
    }
  } catch (error) {
    console.error('Error inserting record:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error(`Unknown error occurred: ${JSON.stringify(error)}`)
    };
  }
};