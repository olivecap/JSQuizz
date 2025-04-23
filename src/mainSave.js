import "./style.css";
import { Questions } from "./questions.js";

// DOM elements
const app = document.querySelector("#app");
const button = document.querySelector("#start");
button.addEventListener("click", startQuizz);

function startQuizz(event) {
  //Stop event porpagation
  event.stopPropagation();

  let currentQuetion = 0;
  let score = 0;
  console.log("yes");

  console.log(event);

  // Remove all child element
  CleanAppChildren();

  // Display question
  displayQuestion(currentQuetion);
}

// clean all app children
function CleanAppChildren() {
  console.log("CleanAppChildren");
  while (app.firstElementChild) {
    app.firstElementChild.remove();
  }
}

function displayQuestion(index) {
  // Create object if required ??
  const question = Questions[index];

  if (!question) {
    // Finish quizz
  }

  // Create question title
  const title = getQuestionTitle(question.question);
  app.appendChild(title);

  // Create multiple answers
  const multiAnswers = getMultiAnswers(question.answers);
  app.appendChild(multiAnswers);

  // Create submit button
  const submitButton = getSubmitbutton();
  app.appendChild(submitButton);
  submitButton.addEventListener("click", submitQuestion);
}

function submitQuestion(event) {
  alert("submitButton clicked");
}

// Creat element for question
function getQuestionTitle(text) {
  const title = document.createElement("h3");
  title.innerText = text;

  return title;
}

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

function getAnswerElement(text) {
  const label = document.createElement("label");
  label.innerText = text;

  const input = document.createElement("input");
  const id = text.replaceAll(" ", "-").toLowerCase();
  input.id = id;
  label.htmlFor = id;
  input.setAttribute("type", "radio");
  input.setAttribute("name", "anwser");
  input.setAttribute("value", text);
  label.appendChild(input);
  return label;
}

function getSubmitbutton() {
  // Add button
  const submit = document.createElement("button");
  submit.id = "submit";
  submit.innerText = "submit";

  return submit;
}

// let index = 0;
// button.addEventListener("click", () => {
//   // Create object if required ??
//   const question =
//     document.querySelector("#question") ?? document.createElement("p");

//   // Set id
//   question.id = "question";

//   //Insert object
//   // In fact no need to check if object already added
//   // Manage by reference
//   app.insertBefore(question, button);

//   // Set good text
//   question.innerText = Questions[index].question;
//   index++;
//   if (index > Questions.length - 1) {
//     question.remove();
//     index = 0;
//   }
// });
