const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const wTemp = document.querySelector('.temp');
const wimg = document.querySelector('.icon-container');
const wtimg = document.querySelector('.card-top img');
const whetherdp = document.querySelector('.back-card');
const errAlert = document.querySelector('.alert');


const wCondition = document.querySelector('.condition-temp .condition');
const wHLCondition = document.querySelector('.condition-temp');

const wFHCondition = document.querySelector('.card-bottom');


const convertCelsius = (kelvin) => {
	celsius = Math.round(kelvin - 273.15);
	return celsius;
}

const isDayTime = (icon) => {
	if(icon.includes('d')){
		return true;
	}else {
		return false;
	}
};

const savedCity = localStorage.getItem("searchedValue");
if(savedCity){
	requestCity(savedCity).then((data) => {
		updateWhether(data);
	}).catch((error) => {
		console.log(error);
		errAlert.classList.remove('d-none');
	});

}

const updateWhether = (city) => {
	console.log(city);
	const imgName = city.weather[0].icon;
	const iconsrc = `http://openweathermap.org/img/wn/${imgName}@2x.png`
	cityName.textContent = city.name;
	wCondition.textContent = city.weather[0].description;
	wTemp.innerHTML = `<span>${convertCelsius(city.main.temp)}&deg;C</span>`;

	wHLCondition.innerHTML = `<p class="high">${convertCelsius(city.main.temp_max)}&deg;C</p>
								<p class="low">${convertCelsius(city.main.temp_min)}&deg;C</p>
								`;
	wimg.innerHTML = `<img src="${iconsrc}">`;

	wFHCondition.innerHTML = `<div class="col text-center">
								<p>${convertCelsius(city.main.feels_like)}&deg;C</p>
								<span>Feels Like</span>
							</div>
							<div class="col text-center">
								<p>${city.main.humidity}%</p>
								<span>Humidity</span>
							</div>`;

	if(isDayTime(imgName)){
		console.log('day');
		wtimg.setAttribute('src', 'img/day_image.svg');
	}else{
		console.log('night');
		wtimg.setAttribute('src', 'img/night_image.svg');
		cityName.classList.add('text-white')
	}

	whetherdp.classList.remove('d-none');
	
}
searchForm.addEventListener('submit', e => {
	e.preventDefault();
	const citySearched = cityValue.value.trim();
	console.log(citySearched);
	searchForm.reset();

	requestCity(citySearched).then((data) => {
		updateWhether(data);
	}).catch((error) => {
		console.log(error);
		errAlert.classList.remove('d-none');
	});
	localStorage.setItem("searchedValue", citySearched);
});