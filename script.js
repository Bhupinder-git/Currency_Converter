// Currency-Converter API
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// Selecting elements
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector('form button');
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector('.msg');

// function to update flag whenever the select change
const updateFlag = (element) => {
  // getting the currCode using the value attribute
  let currCode = element.value;
  // fetching the corresponding country code 
  let countryCode = countryList[currCode];
  // new src for image
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  // fetching the image element
  let img = element.parentElement.querySelector("img");
  // updating the src attribute
  img.src = newSrc;
};

// Traversing the select containers
for (let select of dropdowns) {
  // Appending the options(currency codes) for each country
  for (currCode in countryList) {
    // creating a option
    let newOption = document.createElement("option");
    // appending the currency code
    newOption.innerText = currCode;
    newOption.value = currCode;

    // setting the default currency code for select containers
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    // Appending the options in select container
    select.append(newOption);
  }
  // updating flag whenever the select changes
  select.addEventListener("change", (evt) => {
    // sending that particular option using the target property
    updateFlag(evt.target);
  });
}

// function to calculate the exchange rate
const updateExchangeRate = async() => {
    // fetching the amount element
    let amount = document.querySelector('.amount input');
    // extracting the amount entered
    let amtVal = amount.value;

    // Adding checks for invalid value
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    // modifying the url acc to current from and to select values
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;
    // fetching the response
    let response = await fetch(URL);
    // parsing the response
    let data = await response.json();
    // getting the exchange rate
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // calculating the final amt
    let finalAmount = amtVal * rate;
    // appending the resultant string
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

button.addEventListener('click', (event) => {
    // preventing the default submit action
    event.preventDefault();

    updateExchangeRate();
});

// default msg to be displayed when the converter loads
window.addEventListener('load',() => {
    updateExchangeRate();
})

