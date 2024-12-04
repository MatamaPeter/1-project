import { cities } from "../data/cities.js";

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

  regionSelect.innerHTML = "<option value='' selected>Select your region</option>"; // Reset region options
  const regions = cityIndex !== null ? cities[cityIndex].regions : cities.flatMap((city) => city.regions);
  
  regions.forEach((region, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = region.name;
    option.dataset.cityIndex = cityIndex; // Store city index for later
    regionSelect.appendChild(option);
  });

  // Reset delivery price if the element exists
  if (deliveryPrice) {
    deliveryPrice.textContent = "-";
  }
}

// Function to attach event listeners for city and region selection
export function attachCityRegionEvents() {
  const citySelect = document.querySelector(".city select");
  const regionSelect = document.querySelector(".region select");
  const deliveryPrice = document.getElementById("deliveryPrice");

  // Populate cities and regions
  populateCities();
  populateRegions();

  // Update regions when a city is selected
  citySelect.addEventListener("change", (event) => {
    const cityIndex = event.target.value;
    populateRegions(cityIndex === "" ? null : parseInt(cityIndex));
    deliveryPrice.textContent = "-"; // Reset price
  });

  // Update delivery price when a region is selected
  regionSelect.addEventListener("change", () => {
    const regionIndex = regionSelect.selectedIndex - 1;
    const cityIndex = regionSelect.options[regionSelect.selectedIndex]?.dataset?.cityIndex;

    if (regionIndex >= 0 && cityIndex !== undefined) {
      const selectedRegion = cities[cityIndex].regions[regionIndex];
      const pickupPrice = selectedRegion.pricing["pickup-station"];
      deliveryPrice.textContent = `$${pickupPrice}`;
    } else {
      deliveryPrice.textContent = "-";
    }
  });
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
      localStorage.setItem("selectedDeliveryOption", selectedOption); // Save selection
      const customerChoiceDiv = document.querySelector(".customer-choice");
      customerChoiceDiv.innerHTML = getDeliveryDetails(selectedOption);

      // Reattach city/region events if pickup-station is selected
      if (selectedOption === "pickup-station") {
        attachCityRegionEvents();
      }
    });
  });

  // If pickup-station is preselected, attach events
  if (savedOption === "pickup-station") {
    attachCityRegionEvents();
  }
}

// Helper function to generate details
function getDeliveryDetails(option) {
  if (option === "door-delivery") {
    return `
      <div class="door-delivery">
        <h5>Door delivery</h5>
        <div class="door-delivery-body">
          <p>Delivery time: 03 December - 06 December 2024</p>
          <span id="deliveryPrice">$20.00</span>
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
            <p>Delivery time: 03 December - 06 December 2024</p>
            <span id="deliveryPrice">-</span>
          </div>
        </div>
      </div>
    `;
  }
  return "";
}

// Initialize
window.onload = renderDeliveryOptions;
