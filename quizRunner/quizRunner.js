
const quizRunner = {};

quizRunner.populateQuiz     = async function ()             {
  const quizID = quizRunner.getQuizID();
  quizRunner.quiz = await quizRunner.loadQuiz(quizID);
  quizRunner.quiz.currentQuestion = 0;
  quizRunner.initializeScores();
  quizRunner.setTitle(quizRunner.quiz.title);
  quizRunner.setDocTitle(quizRunner.quiz.title);
  quizRunner.setBlurb(quizRunner.quiz.blurb);
  quizRunner.displayQuestion(quizRunner.quiz.questions[quizRunner.quiz.currentQuestion]);
  quizRunner.startButtonOn();
};
quizRunner.getQuizID        =       function ()             {
  return window.location.search.split('?')[1];
};
quizRunner.loadQuiz         = async function (quizID)       {
  const quiz = await fetch(`quizes/${quizID}.json`).then(res =>res.json());
  return quiz;
};
quizRunner.initializeScores =       function ()             {
  for(let i in quizRunner.quiz.results){
    quizRunner.quiz.results[i].score = 0;
  }
};
quizRunner.objectToArray    =       function (obj)          {
  let arr = [];
  for(let i in obj) {
    arr.push(obj[i]);
  }
  return arr;
};
quizRunner.setTitle         =       function (title)        {
  $('#quizTitle').text(title);
};
quizRunner.setDocTitle      =       function (title)        {
  document.title = title;
};
quizRunner.setBlurb         =       function (blurb)        {
  $('#quizBlurb').text(blurb);
};
quizRunner.displayQuestion  =       function (question)     {
  quizRunner.setQuestionText(question.question);
  quizRunner.clearAnswers();
  quizRunner.populateAnswers(question.answers);
};
quizRunner.nextQuestion     =       function ()             {
  quizRunner.quiz.currentQuestion = quizRunner.quiz.currentQuestion + 1;
  if (quizRunner.quiz.currentQuestion === quizRunner.quiz.questions.length) {
    quizRunner.displayResults();
    return;
  }
  else {
    quizRunner.displayQuestion(quizRunner.quiz.questions[quizRunner.quiz.currentQuestion]);
  }
};
quizRunner.startButtonOn    =       function ()             {
  $('#start').prop('disabled', false);
  $('#start').click(quizRunner.startQuiz);
};
quizRunner.setQuestionText  =       function (question)     {
  $('#questionText').text(question);
};
quizRunner.clearAnswers     =       function ()             {
  $('#answers').children().remove();
};
quizRunner.populateAnswers  =       function (answers)      {
  answers.forEach(answer => {
    const element = quizRunner.createAnswer(answer.answer, answer.results.join(","));
    $('#answers').append(element);
  });
};
quizRunner.createAnswer     =       function (text,results) {
  let answer = $(`<div>${text}</div>`)
    .addClass('answer')
    .attr('data-results',results)
    .click(quizRunner.clickAnswer);
  return answer;
};
quizRunner.fillInResults    =       function (results)      {
  const array = quizRunner.objectToArray(results);
  const sortedArray = [...array].sort((a, b) => b.score - a.score);
  const resultTitle = sortedArray[0].name;
  const resultBlurb =  sortedArray[0].description;
  $('#resultTitle').text(resultTitle);
  $('#resultBlurb').text(resultBlurb);
};
quizRunner.displayResults   =       function ()             {
  $('#question').addClass('hide');
  quizRunner.fillInResults(quizRunner.quiz.results);
  $('#result').removeClass('hide');
};
quizRunner.clickAnswer      =       function (e)            {
  const results  = $(e.target).data('results') ? $(e.target).data('results').split(',') : [];
  results.forEach((item) => {
    quizRunner.quiz.results[item].score = quizRunner.quiz.results[item].score + 1;
  });
  quizRunner.nextQuestion();
};
quizRunner.startQuiz        =       function ()             {
  $("#introduction").addClass('hide');
  $("#question").removeClass('hide');
};
