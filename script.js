const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
	{
		question: "Quale numero naturale ha come multiplo solo se stesso e infiniti divisori?",
		answers: [
			{ text: "1", correct: false },
			{ text: "21", correct: false },
			{ text: "0", correct: true },
			{ text: "3", correct: false },
		],
	},

	{
		question: "Se un numero naturale $n$ è divisibile per 7 e per 3, allora è divisibile per:",
		answers:
			[
				{ text: "$3+7$", correct: false },
				{ text: "\\(3 \\cdot 7 \\)", correct: true },
				{ text: "$37$", correct: false },
				{ text: "$3^{7}$", correct: false },
			],
	},

	{
		question: "Calcola il valore dell'espressione $3a^{2} -2b$ per $a=2$ e $b=5$. Il risultato corretto è:",
		answers:
			[
				{ text: "10", correct: false },
				{ text: "6", correct: false },
				{ text: "2", correct: true },
				{ text: "12", correct: false },
			],
	},

	{
		question: "Fra le seguenti coppie di operazioni, individua quella in cui entrambe non godono della proprietà commutativa:",
		answers:
			[
				{ text: "addizione e sottrazione", correct: false },
				{ text: "moltiplicazione e divisione", correct: false },
				{ text: "addizione e moltiplicazione", correct: false },
				{ text: "divisione e sottrazione", correct: true },
			],
	},

	{
		question: "Vero o falso? $a^n \\cdot a^m = a^{n-m}$",
		answers:
			[
				{ text: "Vero", correct: false },
				{ text: "Falso", correct: true },
			],
	},

	{
		question: "Vero o falso? $a^n + a^m = a^{n+m}$",
		answers:
			[
				{ text: "Vero", correct: false },
				{ text: "Falso", correct: true },
			],
	},

	{
		question: "Vero o falso? $a^n \\cdot a^0 = a^n$",
		answers:
			[
				{ text: "Vero", correct: true },
				{ text: "Falso", correct: false },
			],
	},

	{
		question: "Una sola delle seguenti espressioni è equivalente a $6^2 + 6^3$. Quale?",
		answers:
			[
				{ text: "$(2 \\cdot 3)^3 + (2 \\cdot 3)^2$", correct: true },
				{ text: "$6^6$", correct: false },
				{ text: "$2 \\cdot (3^2 + 3^3)$", correct: false },
				{ text: "$2 \\cdot (2^2 + 2^3)$", correct: false },
			],
	},

	{
		question: "All'espressione $(5 \\cdot a^3 \\cdot b^2 \\cdot c)^2$ viene applicata una proprietà delle potenze. Qual è l'espressione equivalente ottenuta?",
		answers:
		[
			{
				text: "$25 \\cdot a^3 \\cdot b^2 \\cdot c^2$",
				correct: false
			},
			{
				text: "$25 \\cdot a^6 \\cdot b^4 \\cdot c^2$",
				correct: true
			},
			{
				text: " $25 \\cdot a^6 \\cdot b^2 \\cdot c$",
				correct: false,
			},
			{
				text: " $5 \\cdot a^3 \\cdot b^2 \\cdot c^2$",
				correct: false
			}
		]
	},

	{
		question: "Vero o falso? I simboli che si possono usare in base 16 sono 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15.",
		answers:
		[
			{
				text: "Vero",
				correct: false
			},
			{
				text: "Falso",
				correct: true
			}
		]
	}
]

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerHTML = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
   MathJax.typesetPromise();
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1)
  {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct)
	{
      score++;
	}
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex)
	{
      setNextQuestion();
    }
	else
	{
      endQuiz();
    }
  }
  else
  {
    alert("Inserisci una risposta.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Il tuo risultato finale: ${score} / ${shuffledQuestions.length}`;
}