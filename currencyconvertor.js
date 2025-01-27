const BASE_URL ="https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/USD_EUR.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  element.parentElement.querySelector("img").src = newSrc;
};

const updateexchangerate = async ()=>{
    let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // Corrected URL format based on the migration guide
  const URL = `https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/${tocurr.value}_${fromcurr.value}.json`;  
  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);
  // Accessing the exchange rate correctly
  let rate = data.rate;

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateexchangerate();
});

window.addEventListener("load" , ()=>{
    updateexchangerate();
})


