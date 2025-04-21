alert("please trun on your location");
import { address } from "./2.js";
const weatherform = document.querySelector('form');
const card=document.querySelector('.card');
const cityinput=document.querySelector('.input');
const apikey="30fc240ac4189daf7927484c85a2b10c";
weatherform.addEventListener('submit', async event => {
    event.preventDefault();
    const city=address;

    if(city) {
        try{
            const weatherdata=await getweathredata(city);
            displayweatherdata(weatherdata);
        }
        catch(error) {
            console.error(error);
            displayerror('Failed to fetch the data');
        }
    }
    else {
        displayerror('Please enter a city name');
    }
});
async function getweathredata(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
    if(!response.ok)
    {
        throw new Error('Failed to fetch the data');
    }
    else{
        return await response.json();
    }
}
function displayweatherdata(data) {
    const {
        name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data;
        card.textContent="";
        card.style.display='flex';

        const dispalycity=document.createElement("h1");
        const displaytemp=document.createElement("p");
        const displayhumidity=document.createElement("p");
        const displayweather=document.createElement("p");
        const displayweatheremoje=document.createElement("p");



        dispalycity.textContent=city;
        displaytemp.textContent=`Temperature: ${(temp-271.15).toFixed(1)}°C`;
        displayhumidity.textContent=`Humidity: ${humidity}%`;
        displayweather.textContent=`Weather: ${description}`;
        displayweatheremoje.textContent=getweatheremoje(id);


        dispalycity.classList.add('p');
        displaytemp.classList.add('p');
        displayhumidity.classList.add('p');
        displayweather.classList.add('p');
        displayweatheremoje.classList.add('emojestyle');

        card.appendChild(dispalycity);
        card.appendChild(displaytemp);
        card.appendChild(displayhumidity)
        card.appendChild(displayweather);
        card.appendChild(displayweatheremoje);

        
    }
    

function getweatheremoje(weatherid){
    if(weatherid>=200 && weatherid<=232) {
        return '⛈️';
    }
    if(weatherid>=300 && weatherid<=321) {
        return '🌧️';
    }
    if(weatherid>=500 && weatherid<=531) {
        return '🌧️';
    }
    if(weatherid>=600 && weatherid<=622) {
        return '❄️';
    }
    if(weatherid>=701 && weatherid<=781) {
        return '🌫️';
    }
    if(weatherid===800) {
        return '☀️';
    }
    if(weatherid>=801 && weatherid<=804) {
        return '☁️';
    }
    return '🤷';

}
function displayerror(error) {
    const err=error;
    const display=document.createElement('p');
    display.textContent=err;
    card.textContent="";
    card.style.display='flex';
    card.classList.add('card');
    card.appendChild(display);
}