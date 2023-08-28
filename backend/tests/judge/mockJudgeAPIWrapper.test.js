import MockJudgeAPIWrapper from "../../src/judge/mockJudgeAPIWrapper";

describe("testing mock api wrapper", () => { 
    it("test", async () => { 
        const mockJudgeAPIWrapper = new MockJudgeAPIWrapper(); 
        expect(await mockJudgeAPIWrapper.submit(1, 2)).toMatchObject({firstPlayerWin: false, logUrl: "dummy logurl"}); 
    })
})