/* eslint-disable @typescript-eslint/no-explicit-any */


const mockFrom = jest.fn();
const mockInsert = jest.fn();
const mockSelect = jest.fn();
const mockSingle = jest.fn();

export const supabase = {
  from: mockFrom.mockReturnValue({
    insert: mockInsert.mockReturnValue({
      select: mockSelect.mockReturnValue({
        single: mockSingle
      })
    })
  })
};

export const setMockInsertResult = (data: any, error: any = null) => {
  mockSingle.mockResolvedValue({ data, error });
};

// モジュールモックの設定
jest.mock('../utils/supabase', () => ({
  supabase: supabase
}));