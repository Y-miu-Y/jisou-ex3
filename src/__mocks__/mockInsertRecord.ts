import { Record } from "../types/api/Record";

export const mockInsertRecord = jest.fn().mockImplementation((title: string, time: number): Promise<{ data: Record | null, error: Error | null }> => {
  return Promise.resolve({
    data: new Record({
      id: '1',
      title,
      time,
      created_at: new Date()
    }),
    error: null
  });
});