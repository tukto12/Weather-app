'use strict';
// ===========================================================
// variables to make API call
const apiKey = 'secret';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const baseUrlHourly = 'http://api.openweathermap.org/data/2.5/forecast?';

const city = document.querySelector('.city');
const url = baseUrl + 'appid=' + apiKey + '&q=';
const urlHourly = baseUrlHourly + 'appid=' + apiKey + '&q=';
// ===========================================================

// ===========================================================
// variables to change the data on screen
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const weatherDescription = document.querySelector('.weather-description');
const temperature = document.querySelector('.temperature');
const dateDay = document.querySelector('.date-day');
const dateMonth = document.querySelector('.date-month');

// const mainScreen = document.querySelector('.current');
// const secondScreen = document.querySelector('.forecast');

const todayArray = ['one', 'two', 'three', 'four'];
// ===========================================================

const btn = document.querySelector('.location-btn');
// const btnNextDays = document.querySelector('.next-days');
// const btnReturnMain = document.querySelector('.return-to-main');

// ===========================================================
// arrays to get the name of month, day and to get the proper image
const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const dayNames = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

const imgDescription = [
	'Thunderstorm',
	'Drizzle',
	'Rain',
	'Snow',
	'Clear',
	'Clouds',
	'Mist',
];
// ===========================================================

// ===========================================================
// get the acutall month, day
let today = new Date();
let day = String(dayNames[today.getDay()]);
let mm = String(monthNames[today.getMonth()]);
let dd = String(today.getDate());

today = dd + ' ' + mm;
// ===========================================================

function convertTemp(temp) {
	return Math.ceil(temp - 273.15);
}

function convertSpeed(speed) {
	return Math.ceil((speed * 3600) / 1000);
}

function findTime(text) {
	var timeRegex = /[0-2][0-9]:[0][0]/;

	return text.match(timeRegex);
}

// function to check actuall weather
async function checkWeather(city) {
	const response = await fetch(url + city);
	var data = await response.json();
	try {
		dateDay.innerHTML = day + ', &nbsp;';
		dateMonth.innerHTML = today;
		temperature.innerHTML = convertTemp(data.main.feels_like);
		weatherDescription.classList.remove('error');
		weatherDescription.innerHTML = data.weather[0].description;
		windSpeed.innerHTML = convertSpeed(data.wind.speed) + ' km/h';
		humidity.innerHTML = data.main.humidity + ' %';
		pressure.innerHTML = data.main.pressure + ' hPa';
		if (imgDescription.includes(data.weather[0].main)) {
			document.getElementById('image-id').src =
				'img/app/' + data.weather[0].main + '.png';
		}
	} catch (err) {
		console.log(err);
		weatherDescription.classList.add('error');
		weatherDescription.innerHTML = 'Error';
	}
}

// function to check 3 hour forecast
async function checkWeatherHourly(city) {
	const response = await fetch(urlHourly + city);
	var data = await response.json();

	try {
		for (let i = 0; i < todayArray.length; i++) {
			document.querySelector('.temp' + '-' + todayArray[i]).innerHTML =
				convertTemp(data.list[i].main.temp) + '°';
			document.querySelector('.time' + '-' + todayArray[i]).innerHTML =
				findTime(data.list[i].dt_txt)[0];

			if (imgDescription.includes(data.list[i].weather[0].main)) {
				document.getElementById('image-id' + '-' + todayArray[i]).src =
					'img/app/' + data.list[i].weather[0].main + '.png';
			}
		}
	} catch (err) {
		console.log(err);
	}
}

btn.addEventListener('click', () => {
	checkWeather(city.value);
	checkWeatherHourly(city.value);
});

// btnNextDays.addEventListener('click', () => {
// 	mainScreen.classList.add('non-active');
// 	secondScreen.classList.remove('non-active');
// });

// btnReturnMain.addEventListener('click', () => {
// 	checkWeather(city.value);
// 	mainScreen.classList.remove('non-active');
// 	secondScreen.classList.add('non-active');
// });
