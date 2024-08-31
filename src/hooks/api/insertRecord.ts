import { Record } from "../../types/api/Record";
import { supabase } from "../../utils/supabase";

export const insertRecord = async (title: string, time: number): Promise<{ data: Record | null, error: Error | null }> => {
  try {
    if (!supabase.from) {
      throw new Error('Supabase client is not initialized properly');
    }

    const { data, error } = await supabase
      .from('study-record')
      .insert({ title, time })
      .select()
      .single();

    if (error) throw error;

    if (data) {
      return { 
        data: new Record({
          id: data.id,
          title: data.title,
          time: data.time,
          created_at: new Date(data.created_at)
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