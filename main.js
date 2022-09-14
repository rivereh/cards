const cards = document.querySelector('.cards');
const createCardContainer = document.querySelector('.create-card-container');
const questionTextArea = document.querySelector('#question');
const answerTextArea = document.querySelector('#answer');
let cardArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
let cardID = 0;

createCardContainer.style.display = 'none'
cardArray.forEach(cardMaker);

function clearCards() {
    localStorage.clear();
    cards.textContent = '';
    cardArray = [];
}

function addCard() {
    if (questionTextArea.value == '' || answerTextArea.value == '')
        return;

    let cardInfo = {
        'id': 0,
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
    cardInfo.id = cardID++;

    let cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    let card = document.createElement('div');
    card.className = 'card';

    let flipButtonFront = document.createElement('i');
    flipButtonFront.setAttribute('class', 'fa-solid fa-arrows-rotate card-flip');

    let flipButtonBack = document.createElement('i');
    flipButtonBack.setAttribute('class', 'fa-solid fa-arrows-rotate card-flip');

    let deleteButtonFront = document.createElement('i');
    deleteButtonFront.setAttribute('class', 'fa-solid fa-trash-can card-delete');

    let deleteButtonBack = document.createElement('i');
    deleteButtonBack.setAttribute('class', 'fa-solid fa-trash-can card-delete');

    flipButtonFront.addEventListener('click', () => {
        card.classList.toggle('flip');
    });

    flipButtonBack.addEventListener('click', () => {
        card.classList.toggle('flip');
    });

    deleteButtonFront.addEventListener('click', () => {
        let cardIndex = cardArray.findIndex(card => card.id === cardInfo.id);

        cardArray.splice(cardIndex, 1);

        localStorage.setItem('items', JSON.stringify(cardArray));
        cards.removeChild(cardContainer);
    });

    deleteButtonBack.addEventListener('click', () => {
        let cardIndex = cardArray.findIndex(cardObj => cardObj.id === cardInfo.id);

        cardArray.splice(cardIndex, 1);

        localStorage.setItem('items', JSON.stringify(cardArray));
        cards.removeChild(cardContainer);
    });
    
    let cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    let question = document.createElement('p');
    question.textContent = cardInfo.question;
    cardFront.appendChild(question);

    let cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    let answer = document.createElement('p');
    answer.textContent = cardInfo.answer;
    cardBack.appendChild(answer);

    cardFront.appendChild(flipButtonFront);
    cardBack.appendChild(flipButtonBack);

    cardFront.appendChild(deleteButtonFront);
    cardBack.appendChild(deleteButtonBack);

    card.appendChild(cardFront);
    card.appendChild(cardBack);
    cardContainer.appendChild(card);

    cards.appendChild(cardContainer);
}

function toggleCreateCardContainer() {
    if (createCardContainer.style.display == 'none')
        createCardContainer.style.display = 'block';
    else
        createCardContainer.style.display = 'none'
}