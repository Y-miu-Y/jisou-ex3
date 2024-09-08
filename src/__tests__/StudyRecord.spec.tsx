import { StudyRecord } from "../StudyRecord";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";
import { Record } from "../types/api/Record";

const mockRecords: Record[] = [
  {
    id: '1',
    title: 'テスト1',
    time: 1,
    created_at: new Date('2024-03-01T10:00:00Z')
  },
  {
    id: '2',
    title: 'テスト2',
    time: 2,
    created_at: new Date('2024-03-01T10:00:00Z')
  },
];

const getAllMock = jest.fn().mockResolvedValue({
  data: mockRecords,
  error: null
});

jest.mock("../hooks/api/getStudyRecords", () => {
  return{
    getStudyRecords: () => getAllMock(),
  }
});

// insertRecord のモックを設定
const mock = jest.fn().mockResolvedValue({
  data: [{
    id: '1',
    title: 'テスト1',
    time: 2,
    created_at: new Date().toISOString()
  }],
  error: null
});

jest.mock("../hooks/api/insertRecord", () => {
  return{
    insertRecord: () => mock(),
  }
});

// deleteRecord のモックを設定
const deleteMock = jest.fn().mockResolvedValue({
  data: null,
  error: null
});

jest.mock("../hooks/api/deleteRecord", () => {
  return{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteRecord: (id:number) => deleteMock(),
  }
});

// updateRecord のモックを設定
const updateMock = jest.fn().mockResolvedValue({
  data: null,
  error: null
});

jest.mock("../hooks/api/updateRecord", () => {
  return{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateRecord: (id:number) => updateMock(),
  }
});

describe('ページ内容のテスト', () => {
  it("ローディング画面をみることができる", async() => {

    render(<StudyRecord />);
    // loadingのテストIDが描画されるか
    expect(await screen.findByTestId('loading')).toBeTruthy();
  });

  it("テーブルをみることができる(リスト)", async() => {
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

  it("モーダルが新規登録というタイトルになっている", async() => {
    render(<StudyRecord />);
    const inputButton = await screen.findByTestId('study-input-button');
    await userEvent.click(inputButton);
    expect(await screen.findByTestId('modal-header')).toBeTruthy();
  });

  it("モーダルのタイトルが記録編集である", async() => {
    render(<StudyRecord />);

    // 更新ボタンがあるか
    const updateButton = await screen.findByTestId('update-button_1');
    expect(updateButton).toBeInTheDocument();

    // 削除ボタンをクリック
    await userEvent.click(updateButton);

    // モーダルヘッダーのタイトルが記録編集である。
    expect(await screen.findByTestId('modal-header')).toHaveTextContent('記録編集')

  });
})

describe("操作のテスト", () => {

  it("登録できること", async () => {
    
    render(<StudyRecord />);

    // 新規登録ボタンをクリック
    const inputButton = await screen.findByTestId('study-input-button');
    await userEvent.click(inputButton);

    // モーダル内の要素を取得
    const modalTitle = await screen.findByTestId('modal-input-title');
    const modalTime = await screen.findByTestId('modal-input-time');
    const modalSubmit = await screen.findByTestId('modal-submit');

    // フォームに入力
    await userEvent.type(modalTitle, 'テスト1');
    await userEvent.type(modalTime, '2');

    // 送信ボタンをクリック
    await userEvent.click(modalSubmit);

  });

  it("学習内容がないときに登録するとエラーがでる", async() => {
    render(<StudyRecord />);
    const inputButton = await screen.findByTestId('study-input-button');
    await userEvent.click(inputButton);
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
    await userEvent.click(inputButton);
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
    await userEvent.click(inputButton);
    const modalTitle = await screen.findByTestId('modal-input-title');
    const modalTime = await screen.findByTestId('modal-input-time');
    const modalSubmit = await screen.findByTestId('modal-submit');

    act(() => {
      userEvent.type(modalTitle, 'テスト1');
      userEvent.type(modalTime, "-1");
    });

    modalSubmit.click();

    expect(await screen.findByText('時間は0以上である必要があります')).toBeTruthy();
  });

  it("削除ができること", async() => {
    
    render(<StudyRecord />);

    // 削除ボタンがあるか
    const deleteButton = await screen.findByTestId('delete-button_1');
    expect(deleteButton).toBeInTheDocument();

    // 削除ボタンをクリック
    await userEvent.click(deleteButton);

    expect(await screen.queryByTestId('row-title_1')).toBeNull();

  });

  it("更新ができること", async() => {
    const testTitle = '更新後';
    const testTime = '13';

    render(<StudyRecord />);
    const updateButton = await screen.findByTestId('update-button_1');

    await userEvent.click(updateButton);

    const modalTitle = await screen.findByTestId('modal-input-title');
    const modalTime = await screen.findByTestId('modal-input-time');
    const modalSubmit = await screen.findByTestId('modal-submit');
    // フォームに入力
    await userEvent.clear(modalTitle);
    await userEvent.type(modalTitle, testTitle);

    await userEvent.clear(modalTime);
    await userEvent.type(modalTime, testTime);

    await userEvent.click(modalSubmit);

    expect(await screen.findByTestId('row-title_1')).toHaveTextContent(testTitle);
    expect(await screen.findByTestId('row-time_1')).toHaveTextContent(testTime + '時間');
  });

});
