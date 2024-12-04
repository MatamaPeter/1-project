export function shippingDtls() {
    const shippingInfo = document.querySelector('.shipping-form');

    // Function to render either the form or the shipping details
    const renderShippingDetails = () => {
        const shippingDetails = JSON.parse(localStorage.getItem('shippingDetails'));

        if (shippingDetails) {
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
                        <strong>Region:<p></strong> ${shippingDetails.customerRegion || "Not Provided"}<br>
                        <hr>
                    </div>
                    
                    
                </div>
                <button class="reset-form">Edit Details</button>
            `;
            attachResetListener();
        } else {
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
                        <select name="city" required>
                            <option value="" selected disabled>Select your city</option>
                            <option value="City 1">City 1</option>
                            <option value="City 2">City 2</option>
                            <option value="City 3">City 3</option>
                            <option value="City 4">City 4</option>
                            <option value="City 5">City 5</option>
                            <option value="City 6">City 6</option>
                        </select>
                    </div>
                    <div class="region">
                        <select name="region" required>
                            <option value="" selected disabled>Select your region</option>
                            <option value="Region 1">Region 1</option>
                            <option value="Region 2">Region 2</option>
                            <option value="Region 3">Region 3</option>
                            <option value="Region 4">Region 4</option>
                            <option value="Region 5">Region 5</option>
                            <option value="Region 6">Region 6</option>
                        </select>
                    </div>
                </div>
                <div class="additional-info">
                    <textarea name="additional-info" placeholder="Additional Information"></textarea>
                </div>
                <button class="shipping-dtls-submit">Submit</button>
            `;
            attachSubmitListener();
        }
    };

    // Attach listener to submit the form
    const attachSubmitListener = () => {
        const shippingDtlsBtn = document.querySelector('.shipping-dtls-submit');
        if (shippingDtlsBtn) {
            shippingDtlsBtn.addEventListener('click', (event) => {
                event.preventDefault();

                const custName = document.querySelector('.customer-name input').value;
                const custEmail = document.querySelector('.customer-email input').value;
                const custPhone = document.querySelector('.customer-phone input').value;
                const custAddress = document.querySelector('.address input').value;
                const custCity = document.querySelector('.city select').value;
                const custRegion = document.querySelector('.region select').value;
                const custAddInfo = document.querySelector('.additional-info textarea').value;

                if (!custName || !custEmail || !custPhone || !custAddress || !custCity || !custRegion) {
                    document.querySelector('.field-error').innerHTML = `
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

                // Save to localStorage
                localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));

                // Re-render shipping details
                renderShippingDetails();
            });
        }
    };

    // Attach listener to reset the form
    const attachResetListener = () => {
        const resetBtn = document.querySelector('.reset-form');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                localStorage.removeItem('shippingDetails');
                renderShippingDetails();
            });
        }
    };

    // Initial render
    renderShippingDetails();
}

// Attach the function to window.onload
window.onload = shippingDtls;
