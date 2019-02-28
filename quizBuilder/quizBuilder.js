
const quizBuilder = {};

quizBuilder.resultsCount    = 0;

quizBuilder.newResultNode   = (resultID)     => {
  let node = $(
    `<div class="result" data-resultID="${resultID}">
    <input type="text" class="rName">
    <button class="removeResult">X</button>
    <textarea name="" id="" cols="30" rows="10" class="rBlurb"></textarea>
    </div>`
  );
  node.find('.removeResult').click(quizBuilder.removeResult);
  return node;
};
quizBuilder.newAnswerNode   = ()             => {
  let newNode = $(
    `<tr class="answer">
    <td class="questionText">Test</td>
    </tr>`

  );
  return newNode;
};
quizBuilder.newVoteHeader   = (resultID)     => {
  return(`
    <td class="voteHeader" data-resultid=${resultID}>
      ${resultID}
    </td>
  `);
};
quizBuilder.newQuestionNode = ()             => {
  const button = $(`<button>New Answer</button>`)
    .click(quizBuilder.addNewAnswer);
  const node = $( `<div class="question">
    <textarea class=questionText></textarea>
    <div class="answers">
    <table>
      <thead>
        <tr class="qAnswersHeader">
          <td class="answers">Answers</td>
        </tr>
      </thead>
      <tbody class="qAnswersList">

      </tbody>
    </table>
    </div>
  </div>`);
  node.prepend(button);
  return node;
};

quizBuilder.inializeBuilder = ()             => {
  //add event to the #newResult button
  $('#newResult').click(quizBuilder.addNewResult);
  //add event to the #newQuestion button.
  $('#newQuestion').click(quizBuilder.addNewQuestion);
};
quizBuilder.addNewResult    = (e)            => {
  e.preventDefault();
  quizBuilder.resultsCount = quizBuilder.resultsCount + 1;
  const resultID = `resultid${quizBuilder.resultsCount}`;
  const resultNode = quizBuilder.newResultNode(resultID);
  $('#qResultsList').append(resultNode);
  // For each question...
  $('.question').each((i, e) => {
    //Add result to the #qQuestionsHeader
    $(e).find('.qAnswersList').append(quizBuilder.newVoteHeader(resultID));
    // Add new votebox to each answer
    $(e).find('.answer').each((i,e) =>{
      quizBuilder.addVoteBox(resultID, $(e));
    });
  });
};
quizBuilder.addNewAnswer    = (e)            => {
  e.preventDefault();
  const newNode = quizBuilder.newAnswerNode();
  const answerList = $(e.target).parent().find('.qAnswersList');
  answerList.append(newNode);
  $('.result').each((i,e) => quizBuilder.addVoteBox($(e).data('resultid'),newNode));
};
quizBuilder.addNewQuestion  = (e)            => {
  e.preventDefault();
  const newQuestion = quizBuilder.newQuestionNode;
  $('#qQuestions').append(newQuestion);
};
quizBuilder.addVoteBox      = (id, question) => {
  const resultID = id || 'none';
  question.append( $(
    `<td>
      <input
        type="checkbox"
         data-resultid="${resultID}"
      >
    </td>`
  ) );
};
quizBuilder.removeVoteBox   = (id, question) => {
  $(question).find(`[data-resultid = ${id}]`).parent().remove();
};
quizBuilder.removeResult    = (e)       => {
  e.preventDefault();
  let result = $(e.target).parent();
  let resultID = result.data('resultid');
  result.remove();
  $('.question').each((i,q) => quizBuilder.removeVoteBox(resultID, q));
  $('#qQuestionsHeader').find(`[data-resultid = "${resultID}"]`).remove();
};
quizBuilder.removeQuestion  = (e)       => {
  e.preventDefault();
  console.log(e.target);
  // TODO: quizBuilder.removeQuestion
};


if(typeof module !== 'undefined') module.exports = quizRunner;
