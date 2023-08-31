const cont = document.querySelector("#container")
const cards = Array.from(document.querySelectorAll(".cards"))
const header = document.querySelector("#header")
const form = document.querySelector("form")

const state = {
    puppers: [],
    target: null
}
//  --- Retrieve them doggos --- //
async function getPuppies(){
    const puppyData = await (await fetch ("https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players")).json()
    const puppers = puppyData.data.players
    state.puppers = puppers
    displayPuppers()
}
getPuppies()

async function getBreedImage(breed){
    const imageData = await (await fetch(`https://dog.ceo/api/breed/${breed}/images`)).json()
    return imageData.message
}

//  --- Check for hash changes --- //
window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "")
    state.puppers.forEach(el => {
        if(el.name === hash){
            displaySingle(el)
        } else if (window.location.hash === ""){
            displayPuppers()
        }
    })
})

form.addEventListener("submit", async e => {
    e.preventDefault()
    const newPup = {
        name: e.target.name.value,
        breed: e.target.breed.value,
        imageUrl: null
    }
    let imgs = await getBreedImage(e.target.breed.value)
    newPup.imageUrl = imgs[Math.round(Math.random() * imgs.length - 1)]
    state.puppers.push(newPup)
    displayPuppers()
    e.target.name.value = ""
})

//  --- Display all dogs in state --- //
function displayPuppers(){
    header.hidden = false
    header.innerHTML = "Choose Your Player!"
    const puppyHTML = state.puppers.map((e) =>{
        //  --- Make random RGB for card colors --- //
        const randos = {
            r: Math.round(Math.random() * 255),
            g: Math.round(Math.random() * 255),
            b: Math.round(Math.random() * 255)
        }

        return `<a href="#${e.name}"
            <div class="card" style="background-color:rgb(${randos.r}, ${randos.g}, ${randos.b});">
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

//  --- Display only single dog --- //
function displaySingle(el){
    header.hidden = true
    cont.innerHTML = `
    <div class="target">
        <a href="#"> Back To All Puppies </a>
        <br>
        <div>
            <h1> ${el.name} </h1>
            <h3> ${el.breed} </h3>
            <img src="${el.imageUrl}" >
        </div>
    </div>
    `
}




