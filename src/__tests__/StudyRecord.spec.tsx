import { StudyRecord } from "../StudyRecord";
import { render, screen, waitFor } from "@testing-library/react";
import { Record } from "../types/api/Record";
import { mockSupabaseResolvedValue } from "../__mocks__/supabase";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";

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
    expect(await screen.findByTestId('studyRecordTable')).toBeTruthy();
  
  });

  it("新規登録ボタンがある", async() => {
    render(<StudyRecord />);
    expect(await screen.findByTestId('study-input-button')).toBeTruthy();
  });

  it("タイトルがあること", async() => {
    render(<StudyRecord />);
    expect((await screen.findAllByText('学習記録一覧'))[0]).toBeTruthy();
  });

  it("登録できること", async() => {
    render(<StudyRecord />);
    const inputButton = await screen.findByTestId('study-input-button');
    act(() => {
      inputButton.click();
    });

    const modalTitle = await screen.findByTestId('modal-input-title');
    const modalTime = await screen.findByTestId('modal-input-time');
    const modalSubmit = await screen.findByTestId('modal-submit');

    act(() => {
      userEvent.type(modalTitle, 'テスト1');
      userEvent.type(modalTime, "2");
    });

    modalSubmit.click();

    expect(await screen.findAllByText('テスト1')).toBeTruthy();
  });

  it("モーダルが新規登録というタイトルになっている", async() => {
    render(<StudyRecord />);
    const inputButton = await screen.findByTestId('study-input-button');
    inputButton.click();
    expect(await screen.findByTestId('modal-header')).toBeTruthy();
  });

  it("学習内容がないときに登録するとエラーがでる", async() => {
    render(<StudyRecord />);
    const inputButton = await screen.findByTestId('study-input-button');
    inputButton.click();
    // const modalTitle = await screen.findByTestId('modal-input-title');
    const modalTime = await screen.findByTestId('modal-input-time');
    const modalSubmit = await screen.findByTestId('modal-submit');

    act(() => {
      // userEvent.type(modalTitle, 'テスト1');
      userEvent.type(modalTime, "2");
    });

    modalSubmit.click();

    expect(await screen.findByText('内容の入力は必須です')).toBeTruthy();
  });

  it("学習時間がないときに登録するとエラーがでる(未入力)", async() => {
    render(<StudyRecord />);
    const inputButton = await screen.findByTestId('study-input-button');
    inputButton.click();
    const modalTitle = await screen.findByTestId('modal-input-title');
    // const modalTime = await screen.findByTestId('modal-input-time');
    const modalSubmit = await screen.findByTestId('modal-submit');

    act(() => {
      userEvent.type(modalTitle, 'テスト1');
      // userEvent.type(modalTime, "2");
    });

    modalSubmit.click();

    expect(await screen.findByText('時間の入力は必須です')).toBeTruthy();
  });

  it("学習時間がないときに登録するとエラーがでる(0以上でないときのエラー)", async() => {
    render(<StudyRecord />);
    const inputButton = await screen.findByTestId('study-input-button');
    inputButton.click();
    const modalTitle = await screen.findByTestId('modal-input-title');
    const modalTime = await screen.findByTestId('modal-input-time');
    const modalSubmit = await screen.findByTestId('modal-submit');

    act(() => {
      userEvent.type(modalTitle, 'テスト1');
      userEvent.type(modalTime, "-1");
    });

    modalSubmit.click();

    expect(await screen.findByText('時間は0以上である必要があります')).toBeTruthy();
    screen.debug();
  });

  it("削除ができること", async() => {

  });

  it("a", async() => {

  });
});
