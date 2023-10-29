const api_Key = '87a6f1d5b34b89e5cc4e995f9054419d';
let t = document.querySelector('#temper');
let h = document.querySelector('#humid');
let c = document.querySelector('#cld');
let u = document.querySelector('#uv');
let w = document.querySelector('#wind')

let city = document.querySelector('.cityName');
let mausam = document.querySelector('.mausamType');
let mausamDes = document.querySelector('.mausamDescription');



async function fetchWeather(cordinates) {
  activateLoaderClass();
    
 
  const{lat,lon} = cordinates
  

   const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_Key}`
    )

    const response2 = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_Key}&units=metric`
      );

    const data = await response.json();
    const data2 = await response2.json();

    let city = document.querySelector('.cityName');
    let mausam = document.querySelector('.mausamType');
    let mausamDes = document.querySelector('.mausamDescription');
 

    
    t.textContent = `${parseFloat(data?.current?.temp-273.15).toFixed(1)}°C`;
    h.textContent = data?.current?.humidity;
    c.textContent = data?.current?.clouds;
    u.textContent = data?.current?.uvi;
    w.textContent = data?.current?.wind_speed;
    city.textContent = data2?.name;
    mausam.textContent = data2?.weather[0]?.main;
    mausamDes.textContent = data2?.weather[0]?.description;

    deactiveLoaderClass();
}

function activateLoaderClass() {
  const l = document.querySelector('.loaderclass');
  l.style.visibility = 'visible';
  l.style.height = '100vh';
  l.style.width = '100vw';
}

function deactiveLoaderClass() {
  const l = document.querySelector('.loaderclass');
  l.style.visibility = 'hidden';
  l.style.height = '0vh';
  l.style.width = '0vw';

}

async function fetchWeatherbySearching() {

 
  

 

  try {
    activateLoaderClass();

    let obj = document.querySelector('.search');

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${obj.value}&appid=${api_Key}`
    )

  const data = await response.json();
  const hidclass = document.querySelector('.heroClass').style.display = 'flex';
  const error = document.querySelector('.errorClass').style.display='none'
  t.textContent = `${parseFloat(data?.main?.feels_like-273.15).toFixed(1)}°C`;
  h.textContent = data?.main?.humidity;
  c.textContent = data?.clouds?.all;
  w.textContent = data?.wind?.speed;
  city.textContent = data?.name;
  mausam.textContent = data?.weather[0]?.main;
  mausamDes.textContent = data?.weather[0]?.description;

 
  const changeh2 = document.querySelector('#uvheading');
  changeh2.textContent = 'Pressure';
  const changeImg = document.querySelector('#uvimg').src = 'images/icons8-pressure-96.png';
  u.textContent = data?.main?.pressure;

  deactiveLoaderClass();



  }

  catch(err) {

    activateLoaderClass();

    
    const hidclass = document.querySelector('.heroClass').style.display = 'none';
    const error = document.querySelector('.errorClass').style.display='flex';
     deactiveLoaderClass();



    
    

  }
  
 



  
}

function addGrantClass() {
  const activeGrantAccess = document.querySelector('.grantAccess');
      activeGrantAccess.style.display = 'flex';
      const hidclass = document.querySelector('.heroClass').style.display = 'none';


}



function getLocation() {

  navigator.geolocation.getCurrentPosition(showPosition,addGrantClass);
  
}
  
  function showPosition(position) {
        const cordinates = {
            lat : position.coords.latitude,
            lon : position.coords.longitude,
        }

        const hero = document.querySelector('.heroClass').style.display = 'flex';
        const grant =  document.querySelector('.grantAccess').style.display = 'none';

    
        
        fetchWeather(cordinates);
  }


getLocation();


