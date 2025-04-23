import "./style.css";
import { Questions } from "./questions.js";

// DOM elements
//-----------------------------------------------------
//- Main event to start quizz => Click on main button -
//-----------------------------------------------------
const app = document.querySelector("#app");
const button = document.querySelector("#start");
button.addEventListener("click", onClickStartQuizz);

//--------------------------------
//- START QUIZZ => CLOSURE SCOPE -
//--------------------------------
function onClickStartQuizz(event) {
  //Stop event porpagation
  event.stopPropagation();

  //---------------------------
  //- Closure variables scope -
  //---------------------------
  let currentQuestion = 0;
  let score = 0;

  //--------------------
  //- DISPLAY QUESTION -
  //--------------------
  displayQuestion(currentQuestion);

  function displayQuestion(index) {
    // Get question
    const question = Questions[index];

    //-----------------------------
    //- REMOVE ALL CHILD ELEMENTS -
    //-----------------------------
    CleanAppChildren();

    //------------------
    //- FINALIZE QUIZZ -
    //------------------
    if (!question) {
      // Finish quizz
      DisplayEndOfQuizz();

      // End quizz
      return;
    }

    //-----------------------
    //- CREATE PROGRESS BAR -
    //-----------------------
    const progressBar = getProgressBar(currentQuestion, Questions.length);
    app.appendChild(progressBar);

    //-------------------------
    //- CREATE QUESTION TITLE -
    //-------------------------
    const title = getQuestionTitle(question.question);
    app.appendChild(title);

    //------------------------
    //- CREATE MULTI ANSWERS -
    //------------------------
    const multiAnswers = getMultiAnswers(question.answers);
    app.appendChild(multiAnswers);

    //--------------------------------------
    //- DISPLAY SUBMIT BUTTON FOR QUESTION -
    //--------------------------------------
    displaySubmitButtonQuestion();
  }

  // Display end of quizz
  function DisplayEndOfQuizz() {
    const h1 = document.createElement("h1");
    h1.innerText = "Bravo! Tu as fini le quizz";
    const p = document.createElement("p");
    p.innerText = `Tu as eu un score de ${score} sur ${Questions.length} points`;
    app.appendChild(h1);
    app.appendChild(p);
  }

  // clean all app children
  function CleanAppChildren() {
    while (app.firstElementChild) {
      app.firstElementChild.remove();
    }
  }

  // Create progress bar
  function getProgressBar(valueStep, maxStep) {
    const progressBar = document.createElement("progress");

    // Initialize step
    progressBar.setAttribute("value", valueStep);
    progressBar.setAttribute("max", maxStep);

    return progressBar;
  }

  // Create element for title question
  function getQuestionTitle(text) {
    const title = document.createElement("h3");
    title.innerText = text;

    return title;
  }

  // Create mulitple anwsers
  function getMultiAnswers(answers) {
    // const array = textAnswers.map();
    const multiAnswersDiv = document.createElement("div");
    multiAnswersDiv.className = "answers";

    if (!answers) {
      multiAnswers.innerText = "error creation multi answers";
    }

    for (const answer of answers) {
      const item = getAnswerElement(answer);
      multiAnswersDiv.appendChild(item);
    }

    return multiAnswersDiv;
  }

  // Get simple answer element for multiple answer
  function getAnswerElement(text) {
    // Create label
    const label = document.createElement("label");
    label.innerText = text;

    // createfor each label Radio button
    const input = document.createElement("input");
    const id = formatId(text);
    input.id = id;
    label.htmlFor = id;
    input.setAttribute("type", "radio");
    // Same name class to manage exclusive answer
    input.setAttribute("name", "anwser");
    input.setAttribute("value", text);
    label.appendChild(input);
    return label;
  }

  // Format id
  function formatId(id) {
    let idFormated = null;

    // if (!id) {
    // } else {
    idFormated = id
      .replaceAll(" ", "-")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll(".", "")
      .replaceAll("[", "-")
      .replaceAll("]", "-")
      .replaceAll(`"`, "s")
      .replaceAll("0", "id0")
      .replaceAll("1", "id1")
      .toLowerCase();
    // }

    return idFormated;
  }

  function displaySubmitButtonQuestion() {
    // Create submit button
    const submitButton = getSubmitButton();
    app.appendChild(submitButton);
    submitButton.addEventListener("click", onClickSubmitQuestion);
  }

  function getSubmitButton() {
    // Add button
    const submit = document.createElement("button");
    submit.id = "submit";
    submit.innerText = "submit";

    return submit;
  }

  function onClickSubmitQuestion(event) {
    // TODO
    // Get current raddio selected
    const radioChecked = app.querySelector(`input[name = "anwser"]:checked`);

    if (!radioChecked) {
      alert("please select an option");
      return;
    }

    // Check if correct
    const labelChecked = radioChecked.parentElement;
    const answerValue = radioChecked.value;
    const question = Questions[currentQuestion];
    const isCorrect = answerValue === question.correct;
    if (isCorrect)
      // Increment score
      score++;

    // Prepare new question
    displayNextQuestion();

    // Show answer feedbacks
    showAnswserFeedback(isCorrect, question.correct, answerValue);

    // Disable radio button to avoid to click when you have make choice
    DisableRadioButtonAnswers();
  }

  function showAnswserFeedback(isCorrect, questionCorrect, answerValue) {
    // Get correct label (attibute for=id)
    const labelValueId = formatId(answerValue);
    const labelValue = app.querySelector(`label[for=${labelValueId}]`);

    // Get correct answer
    const labelCorrectId = formatId(questionCorrect);
    const labelCorrect = app.querySelector(`label[for=${labelCorrectId}]`);

    if (isCorrect) {
      // Toggle correct answer
      labelValue.classList.toggle("correct");
    } else {
      // Toggle incorrect answer
      labelValue.classList.toggle("incorrect");

      // Toggle correct answer
      labelCorrect.classList.toggle("correct");
    }

    // Append text
    const resultParam = document.createElement("p");
    resultParam.innerText = isCorrect
      ? "Bravo! bien joué"
      : `Desole... La bonne réponse etait ${questionCorrect}`;
    app.appendChild(resultParam);
  }

  function DisableRadioButtonAnswers() {
    const radioButtons = app.querySelectorAll(`input[type = "radio"]`);
    for (const radioButton of radioButtons) {
      radioButton.disabled = true;
    }
  }

  function displayNextQuestion() {
    // Remove button (1 seul bouton)
    app.querySelector("button").remove();

    // variables
    const TIMOUT = 4000;
    let remainingTimeout = 4000;

    function nextLabelButton() {
      return `Next (${remainingTimeout / 1000}s)`;
    }

    // Add new button
    const nextButton = document.createElement("button");
    nextButton.innerText = nextLabelButton();
    app.appendChild(nextButton);

    // Add event listener to close timer if cuser click on button
    nextButton.addEventListener("click", handleNextQuestion);

    const timeOut = setTimeout(() => {
      handleNextQuestion();
    }, TIMOUT);

    const interval = setInterval(() => {
      remainingTimeout -= 1000;
      nextButton.innerText = nextLabelButton();
    }, 1000);

    function handleNextQuestion() {
      // clear timer interval
      clearTimeout(timeOut);
      clearInterval(interval);

      // Increment current question
      currentQuestion++;

      // Display new question
      displayQuestion(currentQuestion);
    }
  }
}
