const mockFrom = jest.fn().mockReturnThis();
const mockSelect = jest.fn().mockReturnThis();
const mockDelete = jest.fn().mockReturnThis();
const mockInsert = jest.fn().mockReturnThis();
const mockEq = jest.fn().mockReturnThis();
const mockLimit = jest.fn().mockReturnThis();

const mockSupabase = {
  from: mockFrom,
  select: mockSelect,
  delete: mockDelete,
  insert: mockInsert,
  eq: mockEq,
  limit: mockLimit,
};

export const supabase = mockSupabase;

// メソッドチェーンのためのヘルパー関数
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockSupabaseResolvedValue = (value: any) => {
  mockFrom.mockReturnThis();
  mockSelect.mockReturnThis();
  mockDelete.mockReturnThis();
  mockInsert.mockReturnThis();
  mockEq.mockReturnThis();
  mockLimit.mockResolvedValue(value);
};

// テストファイルの先頭に追加
jest.mock('../utils/supabase');

