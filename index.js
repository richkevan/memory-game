header = document.getElementById('header')
timerDiv= document.getElementById('timer')
reset = document.getElementById('reset')
root = document.getElementById('root')
let cardColors = ['#FF0000', '#FF8700', '#FFD300', '#DEFF0A', '#A1FF0A', '#0AFF99', '#0AEFFF', '#147DF5', '#580AFF', '#BE0AFF']
let matchArr = []
let time = 0
var timer
let timerStart = false
// Helper Functions

// Generates a random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Game timer function
const gameTimer = () => {
    timerStart = true
    timerDiv.innerHTML = `<h3>Timer: ${time}</h3>`
    console.log(time)
    time += 1
    timer = setTimeout(gameTimer, 1000)
}
// Checks to see if cards match and if winning conditions are met
const matchCards = (event) => {
        if (timerStart == false) {
            gameTimer()
        }
        let selectedCard = event.target
        matchArr.push(selectedCard.parentElement)
        selectedCard.style.visibility = 'hidden'
        console.log(matchArr.length, matchArr)
        if (matchArr.length == 2) {
            if (matchArr[0].style.backgroundColor == matchArr[1].style.backgroundColor) {
                console.log('match')
                matchArr[0].className = 'matched'
                matchArr[1].className = 'matched'
                matchArr = []
            }
            else if (matchArr[0].style.backgroundColor != matchArr[1].style.backgroundColor) {
                console.log('no match')
            setTimeout(() => {
                matchArr[0].firstElementChild.style.visibility = 'visible'
                matchArr[1].firstElementChild.style.visibility = 'visible'
                matchArr = []
            }, 1000)
            
            }
            
        }
        let matchClass = document.getElementsByClassName('matched')
        if (matchClass.length == 36) {
            clearTimeout(timer)
            setTimeout(alert("You've Won", time),3000)
            
        }
    }



// Game creation routine
const createCards =() => {
    for (x=0;x<6;x++) {
        let newDiv = document.createElement('div')
        newDiv.className = 'columns'
        newDiv.id = `column${x}`
        newDiv.style.display = 'flex'
        newDiv.style.flexFlow = 'column'
        newDiv.style.height = '90vh'
        newDiv.style.width = '15%'
         for (y=0; y<6; y++) {
            let outerCard = document.createElement('div')
            outerCard.className = "card"
            outerCard.id = `card${x}${y}`
            outerCard.style.height = "20%"
            outerCard.style.width = "50%"
            outerCard.style.margin = "2.5%"
            let innerCard = document.createElement('div')
            innerCard.style.height = "100%"
            innerCard.style.width = "100%"
            innerCard.style.background = 'white'
            innerCard.style.border = '2px solid black'
            innerCard.style.boxShadow = '5px 5px 3px'
            innerCard.addEventListener('click', (event) => {
                matchCards(event)
            })
            outerCard.appendChild(innerCard)
            newDiv.appendChild(outerCard)
         }
        root.appendChild(newDiv)
    }
}

// Card shuffle program
const cardShuffle = () => {
    // Create a collection of all card elements
    let cards = document.getElementsByClassName('card')

    // Select 2 cards at a time apply a background color making them a matching pair 
    // then apply an overlay to hide the color.
    while (cards.length > 0) {
        let card1 = cards[getRandomInt(cards.length-1)]
        let card2 = cards[getRandomInt(cards.length-1)]
        if (card1.id == card2.id) {
            card1 = cards[0]
            card2 = cards[1]
        }
            let backgroundColor = cardColors[getRandomInt(cardColors.length-1)]
            card1.style.backgroundColor = backgroundColor
            card2.style.backgroundColor = backgroundColor
            card1.className = 'coloredCard'
            card2.className = 'coloredCard'
            cards = document.getElementsByClassName('card')
    }
}

// resets the game board    
reset.addEventListener('click', (e) => {
    e.stopPropagation()
    clearTimeout(timer)
    timerStart = false
    time = 0
    timerDiv.innerHTML = `<h3>Timer: ${time}</h3>`
    root.innerHTML = ''
    createCards()
    cardShuffle()
})
    
createCards()
cardShuffle()
    