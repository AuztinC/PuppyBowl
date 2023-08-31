const cont = document.querySelector("#container")
const cards = Array.from(document.querySelectorAll("a"))

const state = {
    puppers: [],
    target: null
}

async function getPuppies(){
    const puppyData = await (await fetch ("https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players")).json()
    const puppers = puppyData.data.players
    state.puppers = puppers
    console.log(state)
    displayPuppers()
}
getPuppies()
window.addEventListener("hashchange", event => {
    const hash = window.location.hash.replace("#", "")
    state.puppers.forEach(el => {
        if(el.name === hash){
            displaySingle(el)
        } else if (window.location.hash === ""){
            displayPuppers()
        }
    })
})
function displayPuppers(){
    const puppyHTML = state.puppers.map((e) =>{
        return `<a href="#${e.name}"
            <div class="card">
            <h2>${e.name}</h2>
            <hr>
            <h3>${e.breed}</h3>
            </div>
        </a>`
    })
    cont.innerHTML = puppyHTML.join('')
    cards.forEach((el) => {
        el.addEventListener("click", event =>{
            event.preventDefault()
        })
    })
}
function displaySingle(el){
    console.log("single")
    cont.innerHTML = `
    <div>
        <a href="#">Back To All Puppies<a>
        <h2>${el.name}</h2>
        <h3>${el.breed}</h3>
        <img src="${el.imageUrl}" >
    </div>
    `
}




