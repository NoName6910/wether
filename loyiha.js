const contener = document.querySelector('.contener');
const datee = document.querySelector('.datee');
const selsi = document.querySelector('.selsi');
const decor = document.querySelector('.decor');
const droplet = document.querySelector('.droplet');
const wind = document.querySelector('.wind');
const myform = document.querySelector('.myform');
const search = document.querySelector('.search');
const weatherinfo = document.querySelector('.weather-info');
const cityname = document.querySelector('.cityname');
const imgshow = document.querySelector('.imgshow');
const citysearch = document.querySelector('.citysearch');
const notfound = document.querySelector('.notfound');
const block = document.querySelector('.block');
const blocklist = document.querySelector('.block_list');
// const newday1 = document.querySelector('.newday1');
// const img1= document.querySelector('.img1');
// const selsi1 = document.querySelector('.selsi1');
// const newday2 = document.querySelector('.newday2');
// const img2= document.querySelector('.img2');
// const selsi2 = document.querySelector('.selsi2');
// const newday3 = document.querySelector('.newday3');
// const img3= document.querySelector('.img3');
// const selsi3 = document.querySelector('.selsi3');
myform.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = myform.search.value;
    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e918be63dd00519a2d576e91faf28504`)
            .then(response => response.json())
            .then(data => {
                citysearch.classList.add('none');
                notfound.classList.add('none');
                weatherinfo.classList.remove('none');
                cityname.textContent = `${data.city.name}, ${data.city.country}`;
                datee.textContent = new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
                selsi.textContent = `${Math.round(data.list[0].main.temp - 273.15)} °C`;
                decor.textContent = data.list[0].weather[0].main;
                droplet.textContent = `Humidity: ${data.list[0].main.humidity}%`;
                wind.textContent = `Wind Speed: ${data.list[0].wind.speed} km/h`;
                imgshow.src = `img/${data.list[0].weather[0].main}.svg`;
                const forecast = data.list.slice(1, 4);
                block.innerHTML=""
                forecast.forEach((day, index) => {
                    block.innerHTML += `
                    <div class="block_list">
                        <h4>${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</h4>
                        <img src="img/${day.weather[0].main}.svg" alt="">
                        <h5>${Math.round(day.main.temp - 273.15)} °C</h5>
                    </div>
                    `
                });
                myform.reset();
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                notfound.classList.remove('none');
                weatherinfo.classList.add('none');
                myform.reset();
            });
    } else {
        alert('Please enter a city name.');
    }
});




































