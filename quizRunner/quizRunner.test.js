const $ = require('jquery');
const quizRunner = require('./quizRunner');

describe("Unit Tests", () => {

  test("loadQuiz", async () => {
    const quiz = quizRunner.loadQuiz('testQuiz');
    expect(quiz).toBeDefined();
    expect(typeof quiz.title).toBe('string');
    expect(typeof quiz.blurb).toBe('string');
    const resultKeys = Object.keys(quiz.results);
    expect(typeof quiz.results[resultKeys[0]].name).toBe('string');
    expect(typeof quiz.results[resultKeys[0]].description).toBe('string');
    expect(Array.isArray(quiz.questions)).toBe(true);
    expect(quiz.questions[0]).toHaveProperty('question');
    expect(quiz.questions[0]).toHaveProperty('answers');
    expect(Array.isArray(quiz.questions[0].answers)).toBe(true);
    expect(quiz.questions[0].answers[0]).toHaveProperty('answer');
    expect(quiz.questions[0].answers[0]).toHaveProperty('results');
    expect(Array.isArray(quiz.questions[0].answers[0].results)).toBe(true);
  });
  test("setTitle", () => {
    document.body.innerHTML =
      '<div id="quizTitle">wrong title</div>';
    quizRunner.setTitle('correct title');
    expect($('#quizTitle').text()).toBe('correct title');
  });
  test("setBlurb", () => {
    document.body.innerHTML =
      '<div id="quizBlurb">wrong blurb</div>';
    quizRunner.setBlurb('correct blurb');
    expect($('#quizBlurb').text()).toBe('correct blurb');
  });
  test("setQuestion", () => {
    document.body.innerHTML =
      '<div id="question">wrong quetion</div>';
    quizRunner.setQuestion('correct quetion');
    expect($('#question').text()).toBe('correct quetion');
  });

});
