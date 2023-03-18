
import './index.css';

const cardsContainer = document.querySelector('.results');
const cardTemplate = document.getElementById('card-template').content;

const form = document.forms.search;
const nameInput = form.elements.name;

form.addEventListener('submit', async (event) => {
    
    event.preventDefault();
    cardsContainer.innerHTML = '';  
    
    const inputValue = nameInput.value;

    if (inputValue) {
        const response = await fetch(`https://api.github.com/search/repositories?q=${inputValue}&per_page=10`);

        if(response.ok) {
            const data = await response.json();

            if(data.items.length === 0) {
                cardsContainer.innerHTML = 'Ничего не найдено.'; 
            }            
            else {
            renderItems(data.items);
            }

            form.reset();
        }

        else {
            alert('что-то пошло не так');
        }
    }

    else {
        cardsContainer.innerHTML = 'Введите хотя бы один символ для поиска'; 
    }
})


function addCard(profileData) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__name').textContent = profileData.name;
    cardElement.querySelector('.card__name').href = profileData.html_url;
    cardElement.querySelector('.field-one').textContent = profileData.description;
    cardElement.querySelector('.field-two').textContent = profileData.language;

    return cardElement;
}


function renderItems(items) {
    items.forEach(item => {
        cardsContainer.append(addCard(item));
    });
}
