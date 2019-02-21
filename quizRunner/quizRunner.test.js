global.$ = require('jquery');

describe("Unit Tests", () => {
  test.skip('getQuizID', () => {

  });
  test.skip("loadQuiz", async () => {
    const quizRunner = require('./quizRunner');
    global.fetch = jest.fn().mockReturnValue(Promise.resolve());
    const quiz = await quizRunner.loadQuiz('testQuiz', fetch);
    expect
  });
  test.skip('initializeScores', () => {
    const quizRunner = {};
    quizRunner.

  });
  test.skip('objectToArray', () => {

  });
  test("setTitle", () => {
    const quizRunner = require('./quizRunner');
    document.body.innerHTML =
      '<div id="quizTitle">wrong title</div>';
    require('jquery');
    require('./quizRunner');
    quizRunner.setTitle('correct title');
    expect($('#quizTitle').text()).toBe('correct title');
  });
  test("setDocTitle", () => {
    document.title = "wrong title";
    const quizRunner = require('./quizRunner');
    quizRunner.setDocTitle('correct title');
    expect(document.title).toBe('correct title');
  });
  test("setBlurb", () => {
    const quizRunner = require('./quizRunner');
    document.body.innerHTML =
      '<div id="quizBlurb">wrong blurb</div>';
    quizRunner.setBlurb('correct blurb');
    expect($('#quizBlurb').text()).toBe('correct blurb');
  });
  test.skip('displayQuestion', () => {

  });
  test.skip('nextQuestion', () => {

  });
  test.skip('startButtonOn', () => {

  });
  test.skip('setQuestionText', () => {

  });
  test.skip('clearAnswers', () => {

  });
  test.skip('populateAnswers', () => {

  });
  test.skip('createAnswer', () => {

  });
  test.skip('fillInResults', () => {

  });
  test.skip('displayResults', () => {

  });
  test.skip('clickAnswer', () => {

  });
  test.skip('startQuiz', () => {

  });
});

test.todo('populateQuiz');
