// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('apiForm');
    const apiKeyInput = document.getElementById('apiKey');
    const apiSecretInput = document.getElementById('apiSecret');
    const successMessageDiv = document.getElementById('successMessage');
    const apiKeyErrorDiv = document.getElementById('apiKeyError');

    form.addEventListener('submit', function (e) {
        
        e.preventDefault(); 
        apiKeyErrorDiv.textContent = '';
        successMessageDiv.textContent = '';

        const type = document.getElementById('type').value;
        const apiKey = apiKeyInput.value;
        const apiSecret = apiSecretInput.value;

        // Basic validation for API Key (example)
        if (!apiKey) {
            apiKeyErrorDiv.textContent = 'API Key is required.';
            return;
        }

        // Prepare data to send
        const data = {
            Api_Type: type.toLowerCase(),
            Api_Key: apiKey.toLowerCase(),
            Api_Secret: apiSecret.toLowerCase()
        };

        // Send a POST request using Fetch API
        fetch('/api/v1/updateCreds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json()) 
            .then(responseData => {
                if (responseData.success) {
                    successMessageDiv.textContent = 'API Key updated successfully! Redirecting...';

                    setTimeout(() => {
                        window.location.href = '/home'; 
                    }, 2000);
                } else {
                    if (responseData.error) {
                        apiKeyErrorDiv.textContent = responseData.error;
                    } else {
                        apiKeyErrorDiv.textContent = 'An error occurred. Please try again.';
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                apiKeyErrorDiv.textContent = 'Failed to update API Key. Please try again later.';
            });
    });
});
