import { StudyRecord } from "../StudyRecord";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";
import { mockInsertRecord } from "../__mocks__/mockInsertRecord";



describe("学習記録一覧のテスト", () => {
  /* モック設定 */

  /* ここからテスト */

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

  it("登録できること", async () => {
    // insertRecord のモックを設定
    const mock = (mockInsertRecord as jest.Mock).mockResolvedValue({
      data: {
        id: '1',
        title: 'テスト1',
        time: 2,
        created_at: new Date().toISOString()
      },
      error: null
    });

    jest.mock("../hooks/api/insertRecord", () => {
      return{
        insertRecord: () => mock(),
      }
    });
    
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

  it("モーダルが新規登録というタイトルになっている", async() => {
    render(<StudyRecord />);
    const inputButton = await screen.findByTestId('study-input-button');
    await userEvent.click(inputButton);
    expect(await screen.findByTestId('modal-header')).toBeTruthy();
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

    const getAllMock = jest.fn().mockResolvedValue({
      data: {
        id: '1',
        title: 'テスト1',
        time: 2,
        created_at: new Date().toISOString()
      },
      error: null
    });

    jest.mock("../hooks/api/getStudyRecords", () => {
      return{
        getStudyRecords: () => getAllMock(),
      }
    });
    
    render(<StudyRecord />);

    // 削除ボタンがあるか
    const deleteButton = await screen.findByTestId('delete-button_1');
    expect(deleteButton).toBeInTheDocument();

    // 削除ボタンをクリック
    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByAltText('テスト1')).not.toBeInTheDocument()
    })

  });
});
