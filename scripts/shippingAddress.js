import { renderDeliveryOptions } from "./deliveryOption.js"
import { cities } from "../data/cities.js"

export let doorDeliveryPrice = ''
function initializeShippingForm() {
    const shippingInfo = document.querySelector('.shipping-form');
    
    if (!shippingInfo) {
        console.error('Shipping form element not found');
        return;
    }

    function renderShippingDetails() {
        const shippingDetails = JSON.parse(localStorage.getItem('shippingDetails'));

       if (shippingDetails && Object.keys(shippingDetails).length > 0) {
   

            shippingInfo.innerHTML = `
                <div class="customer-dtls">
                    ${shippingDetails.customerName || "Not Provided"}<br>
                    <div class="contact-dtls">
                        <strong>Email:</strong>  ${shippingDetails.customerEmail || "Not Provided"}<br>
                        <hr>
                        <strong>Phone:</strong> ${shippingDetails.customerPhone || "Not Provided"}<br>
                        <hr>
                        <strong>Address:</strong> ${shippingDetails.customerAddress || "Not Provided"}<br>
                        <hr>
                        <strong>City:</strong> ${shippingDetails.customerCity || "Not Provided"}<br>
                        <hr>
                        <strong>Region:</strong> ${shippingDetails.customerRegion || "Not Provided"}<br>
                        <hr>
                        <strong>Additional Info:</strong> ${shippingDetails.customerAddInfo || "None"}<br>
                    </div>
                </div>
                <button class="reset-form">Edit Details</button>
            `;
            attachResetListener();
            renderDeliveryOptions();
        } else {
            renderForm();
        }
    }

    function renderForm() {
        shippingInfo.innerHTML = `
            <div class="field-error"></div>
            <div class="shipping-info">
                <div class="customer-name">
                    <input type="text" name="first-name" placeholder="Name" required>
                </div>
                <div class="customer-phone">
                    <input type="text" name="customer-phone" placeholder="Phone" required>
                </div>
                <div class="customer-email">
                    <input type="email" name="customer-email" placeholder="Email" required>
                </div>
                <div class="address">
                    <input type="text" name="address" placeholder="Address" required>
                </div>
                <div class="city">
                    <select id="city" name="city" required>
                        <option value="" selected disabled>Select your city</option>
                    </select>
                </div>
                <div class="region">
                    <select id="region" name="region" required disabled>
                        <option value="" selected disabled>Select your region</option>
                    </select>
                </div>
                <div id="pricing"></div>
            </div>
            <div class="additional-info">
                <textarea name="additional-info" placeholder="Additional Information"></textarea>
            </div>
            <button class="shipping-dtls-submit">Submit</button>
        `;

        const citySelect = shippingInfo.querySelector("#city");
        const regionSelect = shippingInfo.querySelector("#region");
        const pricingDiv = shippingInfo.querySelector("#pricing");

        populateCityDropdown(citySelect, regionSelect, pricingDiv);
        attachSubmitListener();
    }
    
    function populateCityDropdown(citySelect, regionSelect, pricingDiv) {
        if (!citySelect) {
            console.error('City select not found');
            return;
        }

        cities.forEach((city) => {
            const option = document.createElement("option");
            option.value = city.name;
            option.textContent = city.name;
            citySelect.appendChild(option);
        });

        citySelect.addEventListener("change", function () {
            const selectedCity = citySelect.value;

            regionSelect.innerHTML = '<option value="" selected disabled>Select your region</option>';
            regionSelect.disabled = false;
            pricingDiv.innerHTML = "";

            if (selectedCity) {
                const selectedCityData = cities.find((city) => city.name === selectedCity);

                selectedCityData.regions.forEach((region) => {
                    const option = document.createElement("option");
                    option.value = region.name;
                    option.textContent = region.name;
                    regionSelect.appendChild(option);
                });
            }
        });

        regionSelect.addEventListener("change", function () {
            const selectedCity = citySelect.value;
            const selectedRegion = regionSelect.value;

            pricingDiv.innerHTML = "";

            if (selectedCity && selectedRegion) {
                const selectedCityData = cities.find((city) => city.name === selectedCity);
                const selectedRegionData = selectedCityData.regions.find(
                    (region) => region.name === selectedRegion
                );

                doorDeliveryPrice = selectedRegionData.pricing["door-delivery"];

                
            }
        });
    }

    function attachSubmitListener() {
        const shippingDtlsBtn = shippingInfo.querySelector('.shipping-dtls-submit');
        if (shippingDtlsBtn) {
            shippingDtlsBtn.addEventListener('click', (event) => {
                event.preventDefault();

                const custName = shippingInfo.querySelector('.customer-name input').value;
                const custEmail = shippingInfo.querySelector('.customer-email input').value;
                const custPhone = shippingInfo.querySelector('.customer-phone input').value;
                const custAddress = shippingInfo.querySelector('.address input').value;
                const custCity = shippingInfo.querySelector('.city select').value;
                const custRegion = shippingInfo.querySelector('.region select').value;
                const custAddInfo = shippingInfo.querySelector('.additional-info textarea').value;

                if (!custName || !custEmail || !custPhone || !custAddress || !custCity || !custRegion) {
                    shippingInfo.querySelector('.field-error').innerHTML = `
                     <i class="material-icons">close</i>
                     Please fill in all required fields.
                    `;
                    return;
                }

                const shippingDetails = {
                    customerName: custName,
                    customerEmail: custEmail,
                    customerPhone: custPhone,
                    customerAddress: custAddress,
                    customerCity: custCity,
                    customerRegion: custRegion,
                    customerAddInfo: custAddInfo,
                };

                localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
                renderShippingDetails();

            });
        }
    }

    function attachResetListener() {
        const resetBtn = shippingInfo.querySelector('.reset-form');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                localStorage.removeItem('shippingDetails');
                renderShippingDetails();
            });
        }
    }

    renderShippingDetails();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeShippingForm);
} else {
    initializeShippingForm();
}