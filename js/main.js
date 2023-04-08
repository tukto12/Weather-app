'use strict';

const apiKey = 'secret';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';

const city = document.querySelector('.city');
const url = baseUrl + 'appid=' + apiKey + '&q=';

const btn = document.querySelector('.location-btn');

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

const imgDescription = {
	Thunderstorm: 'thunderstorm',
	Drizzle: 'drizzle',
	Rain: 'rain',
	Snow: 'snow',
	Clear: 'clear',
	Clouds: 'clouds',
};

let today = new Date();
let day = String(dayNames[today.getDay()]);
let mm = String(monthNames[today.getMonth()]);
let dd = String(today.getDate());

today = dd + ' ' + mm;

function convertTemp(temp) {
	return Math.ceil(temp - 273.15);
}

function convertSpeed(speed) {
	return Math.ceil((speed * 3600) / 1000);
}

async function checkWeather(city) {
	const response = await fetch(url + city);
	var data = await response.json();
	try {
		document.querySelector('.date-day').innerHTML = day + ', &nbsp;';
		document.querySelector('.date-month').innerHTML = today;
		document.querySelector('.temperature').innerHTML = convertTemp(
			data.main.feels_like
		);
		document.querySelector('.weather-description').classList.remove('error');
		document.querySelector('.weather-description').innerHTML =
			data.weather[0].description;
		document.querySelector('.wind').innerHTML =
			convertSpeed(data.wind.speed) + ' km/h';
		document.querySelector('.humidity').innerHTML = data.main.humidity + ' %';
		document.querySelector('.pressure').innerHTML = data.main.pressure + ' hPa';
		if (imgDescription.hasOwnProperty(data.weather[0].main)) {
			document.getElementById('image-id').src =
				'img/app/' + data.weather[0].main + '.png';
		}
		// console.log(data);
	} catch (err) {
		document.querySelector('.weather-description').classList.add('error');
		document.querySelector('.weather-description').innerHTML = 'Error';
	}
}

btn.addEventListener('click', () => {
	checkWeather(city.value);
});

// TODO '
// ADD CHANGING IMAGE DEPEND ON THE WEATHER DESCRIPTION
//
