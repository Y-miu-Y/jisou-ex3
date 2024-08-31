import { StudyRecord } from "../StudyRecord";
import { render, screen, waitFor } from "@testing-library/react";
import { Record } from "../types/api/Record";
import { mockSupabaseResolvedValue } from "./__mocks__/supabase";

jest.mock('../utils/supabase');


describe("学習記録一覧のテスト", () => {
  /* モック設定 */

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* ここからテスト */

  it("ローディング画面をみることができる", async() => {

    render(<StudyRecord />);
    // loadingのテストIDが描画されるか
    expect(await screen.findByTestId('loading')).toBeTruthy();
  });

  it("テーブルをみることができる(リスト)", async() => {


    const mockData = [
      new Record({
        id: "1",
        title: "テスト1",
        time: 1,
        'created_at': new Date("2024-01-01 00:00:00.000000")
      }),
      new Record({
        id: "2",
        title: "テスト2",
        time: 2,
        'created_at': new Date("2024-02-02 00:00:00.000000")
      }),
      new Record({
        id: "3",
        title: "テスト3",
        time: 3,
        'created_at': new Date("2024-03-03 00:00:00.000000")
      })
    ];    
    
    mockSupabaseResolvedValue({ data: mockData, error: null });

    render(<StudyRecord />);
    await screen.findByTestId('studyRecordTable');
    await waitFor(() => screen.debug());
  });
});
