import { happyGif, sadGif } from "./giphy.js"
import { getData } from "./getData.js"

const treasure = document.querySelector("#treasure")
const input = document.querySelector("input")
const comment = document.querySelector('small')

const clue = document.querySelector('#clue')
let correct = 0;

function renderHTML(json){

    input.value = ""
    comment.innerText =""
    
    const h2 = document.querySelector('#h2')//Category
    const h3 = document.querySelector('#h3')//Question
    const hidden = document.querySelector('#hidden-answer')

    let random = Math.floor(Math.random() * json.clues.length)
    //Category and Question:
    h2.innerHTML = `${JSON.stringify(json.clues[random].category.title)}`
    h3.innerHTML = `${JSON.stringify(json.clues[random].question)}`
    
    let span = document.createElement("span")
    span.textContent = "Hover below to see answer:"
    comment.append(span);
    //"Hidden" answer (for testing)
    hidden.innerHTML = `${JSON.stringify(json.clues[random].answer).replace(/['"\)\(\/\\]/g, '')}`
    hidden.style.backgroundColor = "#eee"
    hidden.style.width= "20%"
    hidden.style.margin ="0 auto"
    hidden.style.marginBottom = "2px";
    let actAnswer = hidden.innerText.toLowerCase()
    
    function checkForEnter(event){
        if(event.key === "Enter"){
            
            let yourAnswer = input.value.toLowerCase()
            let renderCount = document.querySelector("#count");
            
            if( actAnswer === yourAnswer ){
                correct+=1
               
                renderCount.innerText = correct;
                renderCount.style.backgroundColor = "limegreen";
                renderCount.style.color= "#fff";
            
                input.value = ""
                getData() //next question
                happyGif()
                
                if(correct === 10){
                    clue.innerHTML = `<img src ="./assets/dragon.gif">`
                    // const main = document.querySelector('main')
                    // main.style.backgroundImage = "url(./assets/dragon.gif)"
                    // main.style.backgroundSize = "300px";
                }
            }
            else{
                function wrongAnswer(){
                    renderCount.innerText = correct;
                    renderCount.style.backgroundColor = "orange";
                    renderCount.style.color= "#fff";

                    input.value = ""
                    getData()
                    sadGif()
                }
                if(correct !== 0){ //Disallowing negative points
                    correct-=1
                    wrongAnswer()
                }
                if(correct === 0){
                    wrongAnswer()
                    renderCount.style.backgroundColor = "red";
                }
            }
        }
    }
    input.onkeyup = checkForEnter
}
treasure.addEventListener('click', function(){
    if (correct < 10){
        clue.innerText = "Reach 10 to meet a dragon"
        clue.style.fontFamily = "Comic Sans MS, cursive"
    }  
})
function playSound() {
    let audio = document.querySelector("audio");
    audio.play();
}
let play = document.querySelector('#playSound')
play.addEventListener('click', playSound)

export { renderHTML }