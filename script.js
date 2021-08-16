"use strict";

const button = document.getElementsByClassName("btn")[0];

button.addEventListener("click",searched);

function searched(){

    let link = 'https://covid-api.mmediagroup.fr/v1/vaccines?country=';
    let website = 'https://covid-api.mmediagroup.fr/v1/cases?country=';
    let countryName = document.getElementsByClassName('country_name')[0];
    let image = document.getElementsByClassName('country_flag')[0];
    let population = document.getElementsByClassName('population')[0];
    let infected =document.getElementsByClassName('infected')[0];
    let death = document.getElementsByClassName('death')[0];
    let covidPercentage =document.getElementsByClassName('percentage')[0];
    let deathPercentage = document.getElementsByClassName('death_percentage')[0];
    let vaccinated = document.getElementsByClassName('vaccinated')[0];
    let input = document.getElementsByClassName("input")[0].value;

    input = input.toLowerCase();
    input = input.charAt(0).toUpperCase() + input.slice(1);
    website+=input;

    if(input.length >=4){                   
            async function getISS() {
                
                const response = await fetch(website);
                const data = await response.json();
                
                countryName.innerText= data.All.country + ' ' + data.All.abbreviation;
                image.src = 'https://www.countryflags.io/' + data.All.abbreviation + '/flat/64.png';
                population.innerText = 'population: ' + data.All.population;
                infected.innerText = 'Total infected: ' + data.All.confirmed;
                death.innerText = 'Total deaths: ' + data.All.deaths;
                covidPercentage.innerText = 'Covid %: ' + ((Number(data.All.confirmed)/Number(data.All.population))*100).toPrecision(2) + '%';
                deathPercentage.innerText = 'Covid death %: ' + ((Number(data.All.deaths)/Number(data.All.confirmed))*100).toPrecision(2) + '%' ;

                const getting = await fetch(link + data.All.country);
                const file = await getting.json();
                let totalVaccinated = Number(file.All.people_partially_vaccinated)
                vaccinated.innerText = 'Vaccinated: ' + totalVaccinated;

            }
            getISS()            
    }
    else{
        countryName.innerText= 'Check your spelling please!'
    }    
        
}
