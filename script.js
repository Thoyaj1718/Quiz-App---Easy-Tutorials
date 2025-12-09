const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { Text: "Shark", correct: false },
      { Text: "Elephant", correct: false },
      { Text: "Giraffe", correct: false },
      { Text: "Blue Whale", correct: true }
    ]
  },
  {
    question: "Which is the tallest mountain in the world?",
    answers: [
      { Text: "K2", correct: false },,
      { Text: "Kangchenjunga", correct: false },
      { Text: "Mount Everest", correct: true },
      { Text: "Lhotse", correct: false }
    ]
  },
  {
    question: "What is the capital of India?",
    answers: [
      { Text: "Mumbai", correct: false },
      { Text: "New Delhi", correct: true },
      { Text: "Kolkata", correct: false },
      { Text: "Chennai", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { Text: "Mars", correct: true },
      { Text: "Venus", correct: false },
      { Text: "Jupiter", correct: false },
      { Text: "Mercury", correct: false }
    ]
  },
  {
    question: "Who wrote the theory of relativity?",
    answers: [
      { Text: "Isaac Newton", correct: false },
      { Text: "Albert Einstein", correct: true },
      { Text: "Galileo Galilei", correct: false },
      { Text: "Nikola Tesla", correct: false }
    ]
  },
  {
    question: "Which continent is the Sahara Desert located on?",
    answers: [
      { Text: "Asia", correct: false },
      { Text: "Australia", correct: false },
      { Text: "South America", correct: false },
      { Text: "Africa", correct: true }
    ]
  },
  {
    question: "Which is the longest river in the world?",
    answers: [
      { Text: "Amazon River", correct: false },
      { Text: "Nile River", correct: true },
      { Text: "Yangtze River", correct: false },
      { Text: "Ganges River", correct: false }
    ]
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: [
      { Text: "Carbon Dioxide", correct: true },
      { Text: "Oxygen", correct: false },
      { Text: "Nitrogen", correct: false },
      { Text: "Hydrogen", correct: false }
    ]
  },
  {
    question: "Which is the smallest continent by land area?",
    answers: [
      { Text: "Europe", correct: false },
      { Text: "Antarctica", correct: false },
      { Text: "South America", correct: false },
      { Text: "Australia", correct: true }
    ]
  },
  {
    question: "Which instrument is used to measure temperature?",
    answers: [
      { Text: "Barometer", correct: false },
      { Text: "Hygrometer", correct: false },
      { Text: "Thermometer", correct: true },
      { Text: "Anemometer", correct: false }
    ]
  }
];

const questionElement = document.getElementById("Question");
const answerButton = document.getElementById("answer-bottons");
const nextButton = document.getElementById("Next-btn");

let currentQuestionIndex = 0;
let score = 0;

function StartQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("button");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedbutton = e.target;
    const isCorrect = selectedbutton.dataset.correct === "true";
    if(isCorrect){
        selectedbutton.classList.add("correct");
        score++;
    }else{
        selectedbutton.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        StartQuiz();
    }
})

StartQuiz();
