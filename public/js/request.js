const key = 'ad996983c2d1eb953786d3ff9bea4829';

// const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Kwara&appid=ad996983c2d1eb953786d3ff9bea4829'

// fetch(apiUrl).then((data) => {
// 	console.log('response', data.json())
// }).catch((error) =>{
// 	console.log(error);
// })

const requestCity = async (city) => {
	const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
	const query = `?q=${city}&appid=${key}`;

	const response = await fetch(apiUrl + query);

	const data = await response.json()
	return data;

} 

