const btnDark = document.querySelector(".toggle"),
  body = document.querySelector("body"),
  flag = document.querySelector(".box"),
  cardsBg = document.querySelector(".cards"),
  filterByRegion = document.querySelector(".filter-by-region"),
  searchInput = document.querySelector(".search-container input");

let loc = "white";

btnDark.addEventListener("click", (e) => {
  if (body.style.background == loc) {
    body.style.background = "hsl(207, 26%, 17%)";
    btnDark.style.background = "hsl(207, 26%, 17%)";
    btnDark.style.color = "white";
    body.style.color = "white";
    cardsBg.style.background = "hsl(209, 23%, 22%)";
  } else {
    body.style.background = "white";
    body.style.color = "black";
    btnDark.style.background = "white";
    btnDark.style.color = "black";
  }
});

let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

function renderCountries(data) {
  flag.innerHTML = "";
  data.forEach((country) => {
    const countryBox = document.createElement("a");
    countryBox.classList.add("cards");
    countryBox.href = `/country.html?name=${country.name.common}`;
    countryBox.innerHTML = `<img src="${country.flags.png}" 
    alt="${country.name.common} flag">
    <div class="card-text">
     <h3 class="card-title">${country.name.common}</h3>
     <p><b>Population: </b>${country.population}</p>
     <p><b>Region:</b>${country.region}</p>
     <p><b>Capital:</b>${country.capital}</p>
    </div>`;

    flag.append(countryBox);
  });
}

searchInput.addEventListener("input", (e) => {
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filteredCountries);
});
