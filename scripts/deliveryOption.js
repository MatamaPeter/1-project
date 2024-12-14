
import { cities, deliveryDays } from "../data/cities.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const storedData = JSON.parse(localStorage.getItem('doorDeliveryDaysAndPrice')) || null;

let todayDate = '';
let futureDate = '';
let formattedTodayDate = '';
let formattedFutureDate = '';
let shippingCost = 0;

if (storedData) {
  todayDate = dayjs();
  futureDate = todayDate.add(storedData.Days, 'day');
  formattedTodayDate = todayDate.format('DD MMMM');
  formattedFutureDate = futureDate.format('DD MMMM YYYY');
}

export function populateCities() {
  const citySelect = document.querySelector(".city select");
  citySelect.innerHTML = "<option value='' selected>Select your city</option>";
  cities.forEach((city, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = city.name;
    citySelect.appendChild(option);
  });
}

export function populateRegions(cityIndex = null) {
  const regionSelect = document.querySelector(".region select");
  const deliveryPrice = document.getElementById("deliveryPrice");
  const deliveryDaysElement = document.getElementById("deliveryDays");

  regionSelect.innerHTML = "<option value='' selected>Select your region</option>";
  const regions = cityIndex !== null ? cities[cityIndex].regions : cities.flatMap((city) => city.regions);

  regions.forEach((region, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = region.name;
    option.dataset.cityIndex = cityIndex;
    regionSelect.appendChild(option);
  });

  if (deliveryPrice) deliveryPrice.textContent = "-";
  if (deliveryDaysElement) deliveryDaysElement.textContent = "-";

  const savedRegion = localStorage.getItem("selectedRegion");
  if (savedRegion !== null && cityIndex !== null) {
    regionSelect.selectedIndex = parseInt(savedRegion) + 1;
    updatePriceAndDays(regionSelect);
  }
}

export function saveShippingCost(cost) {
  localStorage.setItem('shippingCost', cost);

  const shippingCostElement = document.querySelector('.shipping-cost');
  if (shippingCostElement) {
    shippingCostElement.textContent = `$${formatCurrency(cost)}`;
  }

  const event = new CustomEvent('shippingCostUpdated', { detail: { shippingCost: cost } });
  document.dispatchEvent(event);
}

export function attachCityRegionEvents() {
  const citySelect = document.querySelector(".city select");
  const regionSelect = document.querySelector(".region select");
  const deliveryPrice = document.getElementById("deliveryPrice");
  const deliveryDaysElement = document.getElementById("deliveryDays");
  const deliveryRange = document.getElementById("deliveryRange");

  populateCities();
  populateRegions();

  citySelect.addEventListener("change", (event) => {
    const cityIndex = event.target.value;
    localStorage.setItem("selectedCity", cityIndex);
    populateRegions(cityIndex === "" ? null : parseInt(cityIndex));

    if (deliveryPrice) deliveryPrice.textContent = "-";
    if (deliveryDaysElement) deliveryDaysElement.textContent = "-";
    if (deliveryRange) deliveryRange.textContent = "-";
  });

  regionSelect.addEventListener("change", () => {
    const regionIndex = regionSelect.selectedIndex - 1;
    const cityIndex = regionSelect.options[regionSelect.selectedIndex]?.dataset?.cityIndex;

    if (regionIndex >= 0 && cityIndex !== undefined) {
      localStorage.setItem("selectedRegion", regionIndex);
      updatePriceAndDays(regionSelect);
    } else {
      if (deliveryPrice) deliveryPrice.textContent = "-";
      if (deliveryDaysElement) deliveryDaysElement.textContent = "-";
    }
  });
}

export function updateDoorDeliveryDetails() {
  const deliveryDaysElement = document.querySelector(".door-delivery-body p b");
  const deliveryPrice = document.getElementById("deliveryPrice");

  const updatedData = JSON.parse(localStorage.getItem('doorDeliveryDaysAndPrice'));

  if (updatedData) {
    const doorDeliveryPrice = updatedData.Price;
    saveShippingCost(doorDeliveryPrice);

    if (deliveryDaysElement) deliveryDaysElement.textContent = `${updatedData.Days} day(s)`;
    if (deliveryPrice) deliveryPrice.textContent = `$${formatCurrency(doorDeliveryPrice)}`;
  }
}

function updatePriceAndDays(regionSelect) {
  const regionIndex = regionSelect.selectedIndex - 1;
  const cityIndex = regionSelect.options[regionSelect.selectedIndex]?.dataset?.cityIndex;
  const deliveryPrice = document.getElementById("deliveryPrice");
  const deliveryDaysElement = document.getElementById("deliveryDays");
  const deliveryRange = document.getElementById("deliveryRange");

  if (regionIndex >= 0 && cityIndex !== undefined) {
    const selectedRegion = cities[cityIndex].regions[regionIndex];
    const pickupPrice = selectedRegion.pricing["pickup-station"];
    const cityName = cities[cityIndex].name;
    const regionName = selectedRegion.name;
    const deliveryDay = deliveryDays[cityName][regionName];

    saveShippingCost(pickupPrice);

    if (deliveryPrice) deliveryPrice.textContent = `$${formatCurrency(pickupPrice)}`;
    if (deliveryDaysElement) deliveryDaysElement.textContent = `(${deliveryDay} day(s))`;

    // Calculate and set the delivery range
    const today = dayjs();
    const futureDate = today.add(deliveryDay, 'day');
    const formattedDeliveryRange = `${today.format('DD MMMM')} - ${futureDate.format('DD MMMM YYYY')}`;
    if (deliveryRange) deliveryRange.textContent = formattedDeliveryRange;
  }
}

export function renderDeliveryOptions() {
  const postDeliveryHTML = document.querySelector(".delivery-options");
  const savedOption = localStorage.getItem("selectedDeliveryOption");

  postDeliveryHTML.innerHTML = `
    <div class="Delivery-option-heading">
      <p>2</p>
      Delivery Option
    </div>
    <hr>
    <div class="delivery-choice">
      <label>
        <input type="radio" name="delivery-method" value="door-delivery" ${
          savedOption === "door-delivery" ? "checked" : ""
        } checked> Door delivery 
      </label>
      <label>
        <input type="radio" name="delivery-method" value="pickup-station" ${
          savedOption === "pickup-station" ? "checked" : ""
        }> Pickup Station
      </label>
    </div>
    <div class="customer-choice">
      ${savedOption ? getDeliveryDetails(savedOption) : ""}
    </div>
  `;

  const deliveryChoices = document.querySelectorAll("input[name='delivery-method']");
  deliveryChoices.forEach((choice) => {
    choice.addEventListener("change", (event) => {
      const selectedOption = event.target.value;
      localStorage.setItem("selectedDeliveryOption", selectedOption);

      const customerChoiceDiv = document.querySelector(".customer-choice");
      customerChoiceDiv.innerHTML = getDeliveryDetails(selectedOption);

      if (selectedOption === "door-delivery") {
        updateDoorDeliveryDetails();
      } else if (selectedOption === "pickup-station") {
        attachCityRegionEvents();
      }
    });
  });

  if (savedOption === "pickup-station") {
    attachCityRegionEvents();
  } else if (savedOption === "door-delivery") {
    updateDoorDeliveryDetails();
  }

  const savedCity = localStorage.getItem("selectedCity");
  const savedRegion = localStorage.getItem("selectedRegion");
  const citySelect = document.querySelector(".city select");
  const regionSelect = document.querySelector(".region select");

  if (savedCity !== null) {
    citySelect.value = savedCity;
    populateRegions(parseInt(savedCity));

    if (savedRegion !== null) {
      regionSelect.selectedIndex = parseInt(savedRegion) + 1;
      updatePriceAndDays(regionSelect);
    }
  }
}

function getDeliveryDetails(option) {
  if (option === "door-delivery") {
    return `
      <div class="door-delivery">
        <h5>Door delivery</h5>
        <div class="door-delivery-body">
          <p>Delivery between: ${formattedTodayDate} - ${formattedFutureDate} (<b>${storedData?.Days || "0"} day(s)</b>)</p>
          <span id="deliveryPrice">$${formatCurrency(storedData?.Price) || "0.00"}</span>
        </div>
      </div>
    `;
  } else if (option === "pickup-station") {
    return `
      <div class="pickup-stn">
        <h5>Pickup Station</h5>
        <div class="pick-up-station-body">
          <div class="pick-up-location">
            <div class="city">
              <select class="city" name="city"></select>
            </div>
            <div class="region">
              <select class="region" name="region"></select>
            </div>
          </div>
          <div class="pick-up-time-price">
            <div class="time-frame">
              <p id="deliveryRange"></p>
              <span id="deliveryDays"></span>
            </div>
            <span id="deliveryPrice">-</span>
          </div>
        </div>
      </div>
    `;
  }
  return "";
}

export default {
  populateCities,
  populateRegions,
  attachCityRegionEvents,
  updateDoorDeliveryDetails,
  renderDeliveryOptions,
  saveShippingCost
};