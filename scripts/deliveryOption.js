import { cities, deliveryDays } from "../data/cities.js";

const storedData = JSON.parse(localStorage.getItem('doorDeliveryDaysAndPrice'));

// Function to populate cities
export function populateCities() {
  const citySelect = document.querySelector(".city select");
  citySelect.innerHTML = "<option value='' selected>Select your city</option>"; // Reset city options
  cities.forEach((city, index) => {
    const option = document.createElement("option");
    option.value = index; // Use index to map to cities array
    option.textContent = city.name;
    citySelect.appendChild(option);
  });
}

// Function to populate regions based on selected city
export function populateRegions(cityIndex = null) {
  const regionSelect = document.querySelector(".region select");
  const deliveryPrice = document.getElementById("deliveryPrice");
  const deliveryDaysElement = document.getElementById("deliveryDays");

  regionSelect.innerHTML = "<option value='' selected>Select your region</option>"; // Reset region options
  const regions = cityIndex !== null ? cities[cityIndex].regions : cities.flatMap((city) => city.regions);

  regions.forEach((region, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = region.name;
    option.dataset.cityIndex = cityIndex; // Store city index for later
    regionSelect.appendChild(option);
  });

  // Reset delivery price and days if the elements exist
  if (deliveryPrice) deliveryPrice.textContent = "-";
  if (deliveryDaysElement) deliveryDaysElement.textContent = "-";
}

// Function to attach event listeners for city and region selection
export function attachCityRegionEvents() {
  const citySelect = document.querySelector(".city select");
  const regionSelect = document.querySelector(".region select");
  const deliveryPrice = document.getElementById("deliveryPrice");
  const deliveryDaysElement = document.getElementById("deliveryDays");

  // Populate cities and regions
  populateCities();
  populateRegions();

  // Update regions when a city is selected
  citySelect.addEventListener("change", (event) => {
    const cityIndex = event.target.value;
    localStorage.setItem("selectedCity", cityIndex); // Save selected city
    populateRegions(cityIndex === "" ? null : parseInt(cityIndex));
    deliveryPrice.textContent = "-"; // Reset price
    deliveryDaysElement.textContent = "-"; // Reset days
  });

  // Update delivery price and days when a region is selected
  regionSelect.addEventListener("change", () => {
    const regionIndex = regionSelect.selectedIndex - 1;
    const cityIndex = regionSelect.options[regionSelect.selectedIndex]?.dataset?.cityIndex;

    if (regionIndex >= 0 && cityIndex !== undefined) {
      localStorage.setItem("selectedRegion", regionIndex); // Save selected region
      const selectedRegion = cities[cityIndex].regions[regionIndex];
      const pickupPrice = selectedRegion.pricing["pickup-station"];
      const cityName = cities[cityIndex].name;
      const regionName = selectedRegion.name;
      const deliveryDay = deliveryDays[cityName][regionName];

      // Update delivery price and days
      deliveryPrice.textContent = `$${pickupPrice}`;
      deliveryDaysElement.textContent = `(${deliveryDay} day(s))`;
    } else {
      deliveryPrice.textContent = "-";
      deliveryDaysElement.textContent = "-";
    }
  });
}

// Function to update door delivery details dynamically
export function updateDoorDeliveryDetails() {
  const deliveryDaysElement = document.querySelector(".door-delivery-body p b");
  const deliveryPrice = document.getElementById("deliveryPrice");

  const updatedData = JSON.parse(localStorage.getItem('doorDeliveryDaysAndPrice'));

  if (updatedData) {
    if (deliveryDaysElement) deliveryDaysElement.textContent = `${updatedData.Days} day(s)`;
    if (deliveryPrice) deliveryPrice.textContent = `$${updatedData.Price}`;
  }
}

// Render delivery options
export function renderDeliveryOptions() {
  const postDeliveryHTML = document.querySelector(".delivery-options");

  // Load previously selected delivery option
  const savedOption = localStorage.getItem("selectedDeliveryOption");

  // Render the delivery options
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
        }> Door delivery (from $20.00)
      </label>
      <label>
        <input type="radio" name="delivery-method" value="pickup-station" ${
          savedOption === "pickup-station" ? "checked" : ""
        }> Pickup Station (from $5.00)
      </label>
    </div>
    <div class="customer-choice">
      ${savedOption ? getDeliveryDetails(savedOption) : ""}
    </div>
  `;

  // Attach event listeners to radio buttons
  const deliveryChoices = document.querySelectorAll("input[name='delivery-method']");
  deliveryChoices.forEach((choice) => {
    choice.addEventListener("change", (event) => {
      const selectedOption = event.target.value;
      localStorage.setItem("selectedDeliveryOption", selectedOption);

      const customerChoiceDiv = document.querySelector(".customer-choice");
      customerChoiceDiv.innerHTML = getDeliveryDetails(selectedOption);

      if (selectedOption === "door-delivery") {
        updateDoorDeliveryDetails(); // Ensure door delivery details are fresh
      } else if (selectedOption === "pickup-station") {
        attachCityRegionEvents(); // Reattach events for pickup station
      }
    });
  });

  // If pickup-station is preselected, attach events
  if (savedOption === "pickup-station") {
    attachCityRegionEvents();
  }

  // Restore city and region selections if available
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

  if (savedRegion !== null && savedCity !== null) {
    regionSelect.selectedIndex = parseInt(savedRegion) + 1;
    updatePriceAndDays(regionSelect);
  }
}

// Helper function to generate details
function getDeliveryDetails(option) {
  if (option === "door-delivery") {
    return `
      <div class="door-delivery">
        <h5>Door delivery</h5>
        <div class="door-delivery-body">
          <p>Delivery time: 03 December - 06 December 2024 (<b>${storedData?.Days || "0"} day(s)</b>)</p>
          <span id="deliveryPrice">$${storedData?.Price || "0.00"}</span>
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
            <p>Delivery time: 03 December - 06 December 2024 <span id="deliveryDays"></span></p>
            <span id="deliveryPrice">-</span>
          </div>
        </div>
      </div>
    `;
  }
  return "";
}

// Update price and days after restoring city and region selections
function updatePriceAndDays(regionSelect) {
  const regionIndex = regionSelect.selectedIndex - 1;
  const cityIndex = regionSelect.options[regionSelect.selectedIndex]?.dataset?.cityIndex;
  const deliveryPrice = document.getElementById("deliveryPrice");
  const deliveryDaysElement = document.getElementById("deliveryDays");

  if (regionIndex >= 0 && cityIndex !== undefined) {
    const selectedRegion = cities[cityIndex].regions[regionIndex];
    const pickupPrice = selectedRegion.pricing["pickup-station"];
    const cityName = cities[cityIndex].name;
    const regionName = selectedRegion.name;
    const deliveryDay = deliveryDays[cityName][regionName];

    deliveryPrice.textContent = `$${pickupPrice}`;
    deliveryDaysElement.textContent = `(${deliveryDay} day(s))`;
  }
}
