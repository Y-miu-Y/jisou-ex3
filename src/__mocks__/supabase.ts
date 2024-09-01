/* eslint-disable @typescript-eslint/no-explicit-any */

const mockInsert = jest.fn();
const mockSelect = jest.fn();
const mockSingle = jest.fn();

const createChainedMock = () => ({
  insert: mockInsert.mockReturnThis(),
  select: mockSelect.mockReturnThis(),
  single: mockSingle,
});

export const supabase = {
  from: jest.fn(() => createChainedMock()),
};

export const setMockInsertResult = (data: any, error: any = null) => {
  mockSingle.mockResolvedValue({ data, error });
};

// デフォルトのモック動作を設定
setMockInsertResult(null);