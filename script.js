let zipCodes = []
const submitBtn = document.getElementById("submit-btn")
const inputEl = document.getElementById("zipcode")
const zipStore = document.getElementById("storedzip")
const zipcodeFromLocalStorage = JSON.parse( localStorage.getItem("zipCodes"))

if (zipcodeFromLocalStorage) {
    zipCodes = zipcodeFromLocalStorage
    store(zipCodes)
}

function store(zipcode) {
    let zipItems = ""
    for (let i = 0; i < zipcode.length; i++) {
        zipItems += `
        <li>
            <a target='_blank' href='${zipcode[i]}'>
                ${zipcode[i]}
            </a>    
        </li>
    `
}
zipStore.innerHTML = zipItems
}

submitBtn.addEventListener("click", function() {
    zipCodes.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("zipCodes", JSON.stringify(zipCodes))
    store(zipCodes)
} )

async function getCoordinates(zipcode) {
const url =`https://geocoding-api.open-meteo.com/v1/search?name=${zipcode}&count=10&language=en&format=json`;
try {
    const response = await fetch(url);
    if(!response.ok) {
    throw new Error(`Response status: ${response.status}`);    
    }

const json = await response.json();
console.log(json);
} catch (error) {
    console.error(error.message)
}
}