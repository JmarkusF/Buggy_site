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