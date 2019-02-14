const $ = require('jquery');

const quizRunner = {};

quizRunner.loadQuiz = function (quizID) {
  const quiz = require('./quizes/testQuiz');
  return quiz;
};
quizRunner.setTitle = function (title) {
  $('#quizTitle').text(title)
}
quizRunner.setBlurb = function (blurb) {
  $('#quizBlurb').text(blurb);
}
quizRunner.setQuestion = function(question) {
  $('#question').text(question);
}

module.exports = quizRunner;
