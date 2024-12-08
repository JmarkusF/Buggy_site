let zipCodes = [];
const submitBtn = document.getElementById("submit-btn");
const inputEl = document.getElementById("zipcode");
const zipStore = document.getElementById("storedzip");
const saysBuggy = document.getElementById("buggysays")
// const zipcodeFromLocalStorage = JSON.parse(localStorage.getItem("zipCodes"))

// if (zipcodeFromLocalStorage) {
// zipCodes = zipcodeFromLocalStorage
// store(zipCodes)
// }

function store(zipcode) {
  let zipItems = "";
  for (let i = 0; i < zipcode.length; i++) {
    zipItems += `
        <li>
            <a target='_blank' href='${zipcode[i]}'>
                ${zipcode[i]}
            </a>    
        </li>
    `;
  }
  zipStore.innerHTML = zipItems;
}

submitBtn?.addEventListener("click", function () {
  const zipcode = inputEl.value;
  zipCodes.push(zipcode);

  getCoordinates(zipcode)
    .then((coords) => {
      if (coords) {
        getWeather(coords).then((weather) => {
          const buggyResponse = calculateBuggyResponse(weather.current.temperature_2m,weather.current.weather_code)
          saysBuggy.innerText = buggyResponse
          console.log(weather);
        });
      } else {
        zipStore.innerText = "No valid coordinates found.";
      }
    })
    .catch((error) => {
      console.error("Error fetching coordinates:", error);
      zipStore.innerText = "Error fetching coordinates.";
    });

  inputEl.value = "";
});

async function getCoordinates(zipcode) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${zipcode}&count=10&language=en&format=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const resp_object = await response.json();
    if (resp_object.results && resp_object.results.length > 0) {
      for (const city of resp_object.results) {
        console.log(city);
        if (city.country_code === "US") {
          console.log(city.name);
          const location = {
            latitude: city.latitude,
            longitude: city.longitude,
          };

          return location;
        }
      }
    }
    return null;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
async function getWeather(coords) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const resp_object = await response.json();
    console.log(resp_object);
    return resp_object;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
function calculateBuggyResponse(temperature, weather_code) {
  let buggystatement = ""
  if (85 >= temperature && temperature >= 76) {
    buggystatement = "Kind of Hot for me! Maybe a short walk or laying down outside.";
  }
  else if (100 >= temperature && temperature >= 86) {
    buggystatement = 'It is too hot for me. My paws would get burnt by the pavement, and I might get heat stroke if I am out to long. Water and shade help.'
  }
  else if (75 >= temperature && temperature >= 66) {
    buggystatement = "It is nice, but I sure don't want it to get any warmer! Maybe a rest break in 15 to 20."
  }
  else if (65 >= temperature && temperature >= 50) {
    buggystatement = 'Perfect day for a long walk with lots of smells, pets, and treats!!!'
  }
  else if (49 >= temperature && temperature >= 30) {
    buggystatement = 'Kind of Cold for me! Maybe a medium walk, or a jacket. But we should definitely go get coffee!'
  }
  else if (29 >= temperature && temperature >= 15) {
    buggystatement = "If it isn't wet out I should be okay for a medium walk. But if it is wet out my paws won't last more than 5 to 10 minutes."
  }
  else if (14 >= temperature && temperature >= 0) {
    buggystatement = "I would love to just use the bathroom."
  }
  else { 
    buggystatement = "Buggy doesn't know what to think!"
  }
  if (![0,1,2,3,45,48].includes(weather_code)) {
    buggystatement += " " + "Seems to be some percipitation as well, so probably a shorter than normal walk, unfortunately."
  }
  console.log(buggystatement)
  return buggystatement 
}

module.exports = calculateBuggyResponse;
