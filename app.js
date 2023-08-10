// Toggle button

const toggleBtn = document.querySelector('.toggle-btn')
const linksContainer = document.querySelector('.links-container')
const links = document.querySelector('.links')

toggleBtn.addEventListener('click', () => {
    const linksContainerHeight = linksContainer.getBoundingClientRect().height
    const linksHeight = links.getBoundingClientRect().height

    if (linksContainerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`
    }
    else {
        linksContainer.style.height = 0
    }
})

// Date for footer

const date = document.querySelector('.date')
date.innerHTML = new Date().getFullYear()


//Scroll Behavior
window.addEventListener('scroll', () => {
    const scrollBtnTop = document.querySelector('.scroll-top')
    const navbar = document.querySelector('.nav')
    const linksHeight = links.getBoundingClientRect().height
    const pageHeight = window.scrollY
    if (pageHeight > linksHeight) {
        navbar.classList.add('fixed-nav')
    }
    else {
        navbar.classList.remove('fixed-nav')
    }

    //For the Scroll top button display
    if (pageHeight > 1000) {
        scrollBtnTop.classList.add('show-scroll-top')
    }
    else {
        scrollBtnTop.classList.remove('show-scroll-top')
    }
})


//Links Controls
const scrollLinks = document.querySelectorAll('.scroll-links')

scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // e.preventDefault()
        linksContainer.style.height = 0;
    })
})
// ==================================
//CARDS AND SERVICE
// =================================

//Import module from data.js

import {data} from './data.js'
const cardsContainer = document.querySelector('.cards-ctn')
const cardBtnsContainer = document.querySelector('.card-btns')
window.addEventListener('DOMContentLoaded', () => {

    displayCards(data)
    displayButtons()
})


// Displays all cards in html
function displayCards(array){

    const cards = array.map(item => {
        return `<div class="card">
        <div class="card-img">
            <img src="${item.image}" alt="logo">
        </div>
        <div class="card-details">
            <h4 class="program">${item.program}</h4>
            <p>${item.description}</p>
            <div class="pricing">
                <p class="in-word">pricing <span class="right-arrow"><i class="bx bxs-right-arrow"></i></span></p>
                <p class="in-figure">$${item.price}</p>
            </div>
        </div>
    </div>`
    }).join('')
    cardsContainer.innerHTML = cards
}


// Button display and functionality
function displayButtons() {
    //Getting available buttons from data
function programButtons() {
    const subjects = data.map(item=> item.subject)
    const buttons = ['all']
    subjects.filter(subject => {
        if (!buttons.includes(subject)){
            buttons.push(subject)
        }
    })
    return buttons
}

//display all buttons in html
const availableButtons = programButtons().map(button => {
    return `<button class="card-btn" data-subject="${button}">${button}</button>`
}).join('')
cardBtnsContainer.innerHTML = availableButtons
const cardBtns = document.querySelectorAll('.card-btn')


// Filter Card Buttons
cardBtns.forEach(cardBtn => {
    cardBtn.addEventListener('click', (ev) => {
        const subject = ev.currentTarget.dataset.subject
        //filtering cards by subjects
        const filteredCards = data.filter(card => {
            if (card.subject === subject) {
                return card
            }
        })
        if (subject === 'all') {
            displayCards(data)
        }
        else {
            displayCards(filteredCards)
        }
    })
    
})

}

