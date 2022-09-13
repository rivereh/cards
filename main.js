const cardContainer = document.querySelector('.card-container');
const createCardContainer = document.querySelector('.create-card-container');
const questionTextArea = document.querySelector('#question');
const answerTextArea = document.querySelector('#answer');
let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

contentArray.forEach(cardMaker);

function clearCards() {
    localStorage.clear();
    cardContainer.textContent = '';
    contentArray = [];
}

function addCard() {
    if (questionTextArea.value == '' || answerTextArea.value == '')
        return;

    let cardInfo = {
        'question': questionTextArea.value,
        'answer': answerTextArea.value
    }
    
    contentArray.push(cardInfo);
    localStorage.setItem('items', JSON.stringify(contentArray));
    cardMaker(contentArray[contentArray.length - 1]);
    questionTextArea.value = '';
    answerTextArea.value = '';
}

function cardMaker(cardInfo) {
    let div = document.createElement('div');
    let question = document.createElement('h2');
    let answer = document.createElement('h2');

    div.className = 'card';
    question.classList.add('card-question');
    answer.classList.add('card-answer');
    question.textContent = cardInfo.question;
    answer.textContent = cardInfo.answer;
    answer.style.display = 'none';
    div.appendChild(question);
    div.appendChild(answer);

    div.addEventListener('click', () => {
        if (answer.style.display == 'none')
            answer.style.display = 'block';
        else
            answer.style.display = 'none';
    });

    cardContainer.appendChild(div);
}

function toggleCreateCardContainer() {
    if (createCardContainer.style.display == 'none')
        createCardContainer.style.display = 'block';
    else
        createCardContainer.style.display = 'none'
}