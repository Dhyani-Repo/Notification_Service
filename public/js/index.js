// Base URL from hidden input
const base_url = document.getElementById("hiddenData").innerText;
console.log("base_url", base_url);
const template = document.getElementById("template-card")
// Function to fetch API credentials
function fetchData() {
    console.log("🚀 ~ fetchData ~ base_url:", base_url);
    const service = document.getElementById('notification-service').value;
    const apiKeyBox = document.getElementById('api-key-box');
    const apiSecretBox = document.getElementById('api-secret-box');
    const apiKeyElement = document.getElementById('api-key');
    const apiSecretElement = document.getElementById('api-secret');
    const queryParams = new URLSearchParams({ service }).toString();
    const featUrl = `${base_url}/api/v1/getCreds?${queryParams}`;
    const templateCard = document.getElementById("template-card");
    console.log("🚀 ~ fetchData ~ URL:", featUrl);

    fetch(featUrl)
        .then(response => response.json())
        .then(data => {
            console.log(templateCard);
            templateCard.style.display = "none"
            console.log(`data: ${JSON.stringify(data)}`);
            apiKeyBox.style.display = 'none';
            apiSecretBox.style.display = 'none';

            if (data.Api_Key) {
                apiKeyElement.textContent = data.Api_Key;
                apiKeyBox.style.display = 'block';
            }
            if (data.Api_Secret) {
                apiSecretElement.textContent = data.Api_Secret;
                apiSecretBox.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            apiKeyElement.textContent = 'Error fetching data.';
            apiSecretElement.textContent = 'Please try again later.';
        });
}

function changeContent(boxId) {
    const service = document.getElementById('notification-service').value;
    const queryParams = new URLSearchParams({ service }).toString();
    const featUrl = `${base_url}/api/v1/getTemplate?${queryParams}`;
    const templateCard = document.getElementById("template-card");
    console.log("🚀 ~ changeContent ~ URL:", featUrl);

    fetch(featUrl)
        .then(response => response.json())
        .then(data => {
            templateCard.innerHTML = ''; 
            console.log("Printing values1",data.length)
            if(data.data.length == 0){
                console.log("Printing values2",data.data.length)
                const templateCardChild = document.createElement('div');
                        templateCardChild.classList.add('template-card-childs');
                        templateCardChild.innerHTML = `
                                <p>No Templates are available for ${service}</p>
                                <button class="create-template">Add Template</button>    
                            `;
                            const button = templateCardChild.querySelector('.create-template');
                            button.addEventListener('click', () => {
                                // fetch(`/api/v1/createTemplate`)
                                //     .then(response => response.json())
                                //     .then(data => {
                                //         if(data.data == true){
                                //             console.log("Working",JSON.stringify(data))
                                //         }else{
                                //             console.log("not working",JSON.stringify(data))
                                //         }
                                //     })
                                //     .catch(err => {
                                //         console.log(err)
                                //     })
                                window.location.href = "./template.html";
                            });
                        templateCard.appendChild(templateCardChild);
                        console.log("🚀 ~ changeContent ~ templateCard:", templateCard)
            }
            else{
                console.log("Printing values3",data)
                if (data.data && data.data.length > 0) {
                    data.data.forEach(item => {
                        const templateCardChild = document.createElement('div');
                        templateCardChild.classList.add('template-card-childs');
                        if(item.selected){
                            templateCardChild.innerHTML = `
                            ${item.template}
                            <button class="select-template">Selected</button>
                        `;
                        
                        }else{
                            templateCardChild.innerHTML = `
                            ${item.template}
                            <button class="select-template">Select</button>
                        `;
                        }

                        const button = templateCardChild.querySelector('.select-template');
                        button.addEventListener('click', () => {
                            fetch(`/api/v1/test/${item.id}`)
                                .then(response => response.json())
                                .then(data => {
                                    console.log("Testing:",data)
                                    if(data.data.status== "selected"){
                                        console.log("Working",JSON.stringify(data))
                                        button.textContent = "selected";
                                    }else{
                                        button.textContent = "select";
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        });

                        templateCard.appendChild(templateCardChild);
                    });
                }
                
            }
            console.log(templateCard);
            if (templateCard.style.display === "none" || templateCard.style.display === "") {
                console.log("🚀 ~ changeContent ~ templateCard.style.display == ", templateCard.style.display);
                templateCard.style.display = "flex"; 
            } else {
                console.log("🚀 ~ changeContent ~ templateCard.style.display == ", templateCard.style.display);
                templateCard.style.display = "none"; 
            }

        })
        .catch(error => {
            console.error('Error fetching template data:', error);
            alert('Error fetching template. Please try again later.');
        });
}

document.getElementById("editBtn").addEventListener('click', () => {
    const service = document.getElementById("notification-service").value;
    window.location.href = `/update_api_key?type=${service}`;
});
document.querySelector('.toggle-button').addEventListener('click', () => {
    const navList = document.querySelector('nav ul');
    navList.classList.toggle('show');
});
window.addEventListener('load', fetchData);
