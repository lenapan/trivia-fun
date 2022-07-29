const apiKey = "6CLhov4T4L7uKTCXMMoSiz0FEzEaz1lf";
const img = document.querySelector('img')
const result = document.querySelector('#result')

function happyGif(){
    let happy = "https://api.giphy.com/v1/gifs/search?q=happy&api_key=" + apiKey + "&limit=20"; 
    fetch(happy)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            let random = Math.floor(Math.random() * json.data.length)
            img.src = json.data[random].images.fixed_height.url
            result.innerText = "OH YEAAHH!"
        })
}
function sadGif(){
    let sad = "https://api.giphy.com/v1/gifs/search?q=sad&api_key=" + apiKey + "&limit=20"; 
    fetch(sad)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            let random = Math.floor(Math.random() * json.data.length)
            img.src = json.data[random].images.fixed_height.url
            result.innerText = "Oh no... better luck next question"
        })
}
export { happyGif, sadGif }