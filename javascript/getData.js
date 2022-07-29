import { renderHTML } from "./renderHTML.js"

const timer = document.querySelector('#timer')
const newQuestion = document.getElementById("new-question")
let seconds = 30
let count = document.querySelector('#count')

let ticking = setInterval(clockTick, 1000)
function clockTick(){
        if(seconds !== 0){
            timer.innerHTML = `You have ${seconds} seconds to answer
                                <br>before your score resets` 
            seconds -= 1
        }
        else if(seconds === 0){
            timer.innerText = "Next Question..."
            seconds = 30
            document.location.reload()
        }
}
function getData(){
    seconds = 30 //reset timer for every new category
    const baseURL = "https://jservice.kenzie.academy";

    let random = Math.floor(Math.random() * 40950)
    let category = `${baseURL}/api/clues?category=${random}`;  
    console.log(`Category ID = ${random}, ${category}`)
    fetch(category)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            renderHTML(json)
            if(count.innerText === '10'){
                clearInterval(ticking)
                timer.innerText = "Congratulations. Reaching at least 10 removes timer."
            }
    })
} 
window.addEventListener('load', getData)
newQuestion.addEventListener('click', getData)

export { getData }