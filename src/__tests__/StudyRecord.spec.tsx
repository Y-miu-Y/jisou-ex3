import { StudyRecord } from "../StudyRecord";
import { render, screen, waitFor } from "@testing-library/react";
import { Record } from "../types/api/Record";

type AsyncVoidFunction = () => Promise<void>;

describe("学習記録一覧のテスト", () => {
  /* モック設定 */

  beforeEach(() => {
    jest.clearAllMocks();

    const mockDelete: jest.MockedFunction<AsyncVoidFunction> = jest.fn().mockResolvedValue(undefined);
    const mockAdd = jest.fn().mockResolvedValue(new Record({
      id: "0",
      title: "テスト0",
      time: 0,
      'created_at': new Date("2024-12-31 00:00:00.000000")
    }));
    const mockGet = jest.fn().mockResolvedValue([
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
    ]);
  
    jest.mock("../hooks/api/getStudyRecords", () => {
      return{
        getStudyRecords:() => mockGet()
      }
    });
      
    jest.mock("../hooks/api/deleteRecord", () => {
      return{
        deleteRecord:() => mockDelete()
      }
    });
      
    jest.mock("../hooks/api/insertRecord", () => {
      return{
        insertRecord:() => mockAdd()
      }
    });
  });

  /* ここからテスト */

  it("ローディング画面をみることができる", async() => {

    render(<StudyRecord />);
    // loadingのテストIDが描画されるか
    expect(await screen.findByTestId('loading')).toBeTruthy();
  });

  it("テーブルをみることができる(リスト)", async() => {

    const mockDelete: jest.MockedFunction<AsyncVoidFunction> = jest.fn().mockResolvedValue(undefined);
    const mockAdd = jest.fn().mockResolvedValue(new Record({
      id: "0",
      title: "テスト0",
      time: 0,
      'created_at': new Date("2024-12-31 00:00:00.000000")
    }));
    const mockGet = jest.fn().mockResolvedValue([
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
    ]);
  
    jest.mock("../hooks/api/getStudyRecords", () => {
      return{
        getStudyRecords:() => mockGet()
      }
    });
      
    jest.mock("../hooks/api/deleteRecord", () => {
      return{
        deleteRecord:() => mockDelete()
      }
    });
      
    jest.mock("../hooks/api/insertRecord", () => {
      return{
        insertRecord:() => mockAdd()
      }
    });

    render(<StudyRecord />);
    await screen.findByTestId('studyRecordTable');
    await waitFor(() => screen.debug());
  });
});
