const api_Key = '87a6f1d5b34b89e5cc4e995f9054419d';



async function fetchWeather(cordinates) {
    
 
  const{lat,lon} = cordinates
  

   const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_Key}`
    )

    const response2 = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_Key}&units=metric`
      );

    const data = await response.json();
    const data2 = await response2.json();

    let t = document.querySelector('#temper');
    let h = document.querySelector('#humid');
    let c = document.querySelector('#cld');
    let u = document.querySelector('#uv');
    let w = document.querySelector('#wind')

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
 



    

    
    


}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
  
  function showPosition(position) {
        const cordinates = {
            lat : position.coords.latitude,
            lon : position.coords.longitude,
        }
    
        
        fetchWeather(cordinates);
  }


getLocation();


