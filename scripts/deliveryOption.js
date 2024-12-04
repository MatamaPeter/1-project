export function renderDeliveryOptions() {
    const postDeliveryHTML = document.querySelector('.delivery-options');

    // Load previously selected option from localStorage
    const savedOption = localStorage.getItem('selectedDeliveryOption');

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
                    savedOption === 'door-delivery' ? 'checked' : ''
                }> Door delivery (from $20.00)
            </label>
            <label>
                <input type="radio" name="delivery-method" value="pickup-station" ${
                    savedOption === 'pickup-station' ? 'checked' : ''
                }> Pickup Station (from $5.00)
            </label>
        </div>
        <div class="customer-choice">
            ${savedOption ? getDeliveryDetails(savedOption) : ''}
        </div>
    `;

    // Attach event listeners to radio buttons
    const deliveryChoices = document.querySelectorAll('input[name="delivery-method"]');
    deliveryChoices.forEach((choice) => {
        choice.addEventListener('change', (event) => {
            const selectedOption = event.target.value;
            localStorage.setItem('selectedDeliveryOption', selectedOption); // Save to localStorage

            // Display details below
            const customerChoiceDiv = document.querySelector('.customer-choice');
            customerChoiceDiv.innerHTML = getDeliveryDetails(selectedOption);
        });
    });
}

// Helper function to get delivery details
function getDeliveryDetails(option) {
    if (option === 'door-delivery') {
        return `
        <div class="door-delivery">
                <h5>Door delivery</h5>
                <div class="door-delivery-body">
                    <p>Delivery time: 03 December - 06 December 2024 </p>
                    <span>$80.00</span>
                </div>
        </div>
        `;
    } else if (option === 'pickup-station') {
        return `
            <div class="pickup-stn">
            <h5>Pickup Station</h5>
            <div class="pick-up-station-body">
                <div class="pick-up-location">
                    <div class="city">
                        <select name="city" id="">
                            <option value="" selected disabled>Select your city</option>
                            <option value="1">City 1</option>
                            <option value="2">City 2</option>
                            <option value="3">City 3</option>
                            <option value="4">City 4</option>
                            <option value="5">City 5</option>
                            <option value="6">City 6</option>
                        </select>
                    </div>
                    <div class="region">
                        <select name="region" id="">
                            <option value="" selected disabled>Select your region</option>
                            <option value="1">Region 1</option>
                            <option value="2">Region 2</option>
                            <option value="3">Region 3</option>
                            <option value="4">Region 4</option>
                            <option value="5">Region 5</option>
                            <option value="6">Region 6</option>
                        </select>
                    </div>
                </div>
                <div class="pick-up-time-price">
                    <p>Delivery time: 03 December - 06 December 2024 </p>
                    <span>$80.00</span>
                </div>
            </div>
        `;
    }
    return '';
}

// Attach the function to window.onload
window.onload = renderDeliveryOptions;

