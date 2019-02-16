
const util = {};
util.objectToArray = function (obj) {
  let arr = [];
  for(let i in obj) {
    arr.push(obj[i]);
  }
  return arr;
};

let quiz;

const quizRunner = {};
quizRunner.clickAnswer      =       function (e)            {
  const results  = $(e.target).data('results') ? $(e.target).data('results').split(',') : [];
  results.forEach((item) => {
    quiz.results[item].score = quiz.results[item].score + 1;
  });
  quizRunner.nextQuestion();
};
quizRunner.getQuizID        =       function ()             {
  return window.location.search.split('?')[1];
};
quizRunner.setDocTitle      =       function (title)        {
  document.title = title;
};
quizRunner.setTitle         =       function (title)        {
  $('#quizTitle').text(title);
};
quizRunner.setBlurb         =       function (blurb)        {
  $('#quizBlurb').text(blurb);
};
quizRunner.setQuestionText  =       function (question)     {
  $('#questionText').text(question);
};
quizRunner.createAnswer     =       function (text,results) {
  let answer = $(`<div>${text}</div>`)
    .addClass('answer')
    .attr('data-results',results)
    .click(quizRunner.clickAnswer);
  return answer;
};
quizRunner.populateAnswers  =       function (answers)      {
  answers.forEach(answer => {
    const element = quizRunner.createAnswer(answer.answer, answer.results.join(","));
    $('#answers').append(element);
  });
};
quizRunner.clearAnswers     =       function ()             {
  $('#answers').children().remove();
};
quizRunner.displayQuestion  =       function (question)     {
  quizRunner.setQuestionText(question.question);
  quizRunner.clearAnswers();
  quizRunner.populateAnswers(question.answers);
};
quizRunner.initializeScores =       function ()             {
  for(let i in quiz.results){
    quiz.results[i].score = 0;
  }
};
quizRunner.nextQuestion     =       function ()             {
  quiz.currentQuestion = quiz.currentQuestion + 1;
  if (quiz.currentQuestion === quiz.questions.length) {
    quizRunner.displayResults();
    return;
  }
  else {
    quizRunner.displayQuestion(quiz.questions[quiz.currentQuestion]);
  }
};
quizRunner.loadQuiz         = async function (quizID)       {
  const quiz = await fetch(`quizes/${quizID}.json`).then(res =>res.json());
  return quiz;
};
quizRunner.populateQuiz     = async function (quizID)       {
  quiz = await quizRunner.loadQuiz(quizID);
  quiz.currentQuestion = 0;
  quizRunner.initializeScores();
  quizRunner.setTitle(quiz.title);
  quizRunner.setDocTitle(quiz.title);
  quizRunner.setBlurb(quiz.blurb);
  quizRunner.displayQuestion(quiz.questions[quiz.currentQuestion]);
  quizRunner.startButtonOn();
};
quizRunner.startButtonOn   =       function ()              {
  $('#start').prop('disabled', false);
  $('#start').click(quizRunner.startQuiz);
};
quizRunner.fillInResults    =       function (results)      {
  const array = util.objectToArray(results);
  const sortedArray = [...array].sort((a, b) => b.score - a.score);
  const resultTitle = sortedArray[0].name;
  const resultBlurb =  sortedArray[0].description;
  $('#resultTitle').text(resultTitle);
  $('#resultBlurb').text(resultBlurb);
};
quizRunner.displayResults   =       function ()             {
  $('#question').addClass('hide');
  quizRunner.fillInResults(quiz.results);
  $('#result').removeClass('hide');
};
quizRunner.startQuiz        =       function ()             {
  $("#introduction").addClass('hide');
  $("#question").removeClass('hide');
};


const quizID = quizRunner.getQuizID();
quizRunner.populateQuiz(quizID);
