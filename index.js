// // create const set to url
// //const url = 'https://www.googleapis.com/calendar/v3';
// const url = 'https://official-joke-api.appspot.com/random_joke'
// // fetch calendar api onload
// document.addEventListener('DOMContentLoaded', () => {
//   // make AJAX call here....
//   const newResponse = fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       // invoke call to iterate through obj
//       displayResponse(data);
//     });
// });

// const calendarDisplay = document.createElement('div');
// // calendarDisplay.setAttribute("id", "calendar");
// document.body.appendChild(calendarDisplay);
// // create display response that displays calendar
// function displayResponse(referenceData) {
//   console.log(referenceData);
// }

// select button to listen for click
const textInput = document.querySelector('.text-input');
const toDoButton = document.querySelector(".add-button");
const list = document.querySelector('.list');

function addToList() {
  const newDiv = document.createElement("p");
  newDiv.innerText = textInput.value;
  textInput.value = ''
  list.prepend(newDiv);
  newDiv.style.cursor = 'pointer'

  newDiv.addEventListener('click', () => {
      if(newDiv.style.textDecoration === 'line-through') {
          newDiv.style.textDecoration = 'none'
      } else {
        newDiv.style.textDecoration = 'line-through'
      }
  })
}
// listen for click
toDoButton.addEventListener("click", addToList);
  // create paragraph element and set to the content of input
  // append to list div
textInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addToList();
  }
})


fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => console.error(err))

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});
