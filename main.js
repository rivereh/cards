const cardContainer = document.querySelector('.card-container');
const createCardContainer = document.querySelector('.create-card-container');
const questionTextArea = document.querySelector('#question');
const answerTextArea = document.querySelector('#answer');
let cardArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
let cardID = -1;

cardArray.forEach(cardMaker);

function clearCards() {
    localStorage.clear();
    cardContainer.textContent = '';
    cardArray = [];
}

function addCard() {
    if (questionTextArea.value == '' || answerTextArea.value == '')
        return;

    let cardInfo = {
        'id': cardID++,
        'question': questionTextArea.value,
        'answer': answerTextArea.value
    }
    
    cardArray.push(cardInfo);
    localStorage.setItem('items', JSON.stringify(cardArray));
    cardMaker(cardArray[cardArray.length - 1]);
    questionTextArea.value = '';
    answerTextArea.value = '';
}

function cardMaker(cardInfo) {
    let div = document.createElement('div');
    let question = document.createElement('h2');
    let answer = document.createElement('h2');
    let deleteButton = document.createElement('p');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('card-delete');

    deleteButton.addEventListener('click', () => {
        let cardIndex = cardArray.findIndex(card => {
            return card.id = cardInfo.id;
        });

        cardArray.splice(cardIndex, 1);

        localStorage.setItem('items', JSON.stringify(cardArray));
        cardContainer.removeChild(div);
    });

    div.appendChild(deleteButton);

    div.className = 'card';
    question.classList.add('card-question');
    answer.classList.add('card-answer');
    question.textContent = cardInfo.question;
    answer.textContent = cardInfo.answer;
    answer.style.display = 'none';
    div.appendChild(question);
    div.appendChild(answer);
    

    question.setAttribute('contenteditable', 'true');

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