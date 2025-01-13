// Base URL from hidden input

document.getElementById("templateViewer").addEventListener("click", () => {
    const table_container = document.getElementById("table_container");

    // Toggle visibility of the container
    if (table_container.style.display === "flex") {
        table_container.style.display = "none";
        return; // Stop further execution if hiding the data
    }

    // Fetch data and display it if container is not already visible
    console.log("clicked");
    fetch("/api/v1/getApiTemplates")
        .then((response) => response.json())
        .then((data) => {
            console.log("Data: ", data);

            const tableContainer = document.querySelector(".table-container");
            tableContainer.innerHTML = ""; // Clear previous content
            table_container.style.display = "flex"; // Show the container

            if (data.data && data.data.length === 0) {
                const template = `
                    <h3>No Data Is Available for the APIs</h3>
                    <button class="edit-button">Add APIs</button>
                `;
                tableContainer.innerHTML = template;
            } else {
                if (data.data && data.data.length > 0) {
                    let optional1;
                    // Create child-1
                    const table_container_child1 = document.createElement("div");
                    table_container_child1.classList.add("table-box");
                    const selectElm = document.createElement("select");
                    selectElm.id = "notification-service";
                    selectElm.addEventListener("change", fetchData);

                    data.data.forEach((itm) => {
                        const optionElm = document.createElement("option");
                        optionElm.value = itm.Api_Type;
                        if (itm.Api_Type.toLowerCase() === "sandgrid") {
                            optionElm.selected = true;
                            optional1 = itm;
                        }
                        optionElm.innerText = itm.Api_Type;
                        selectElm.appendChild(optionElm);
                    });
                    table_container_child1.appendChild(selectElm);

                    // Create child-2
                    const table_container_child2 = document.createElement("div");
                    table_container_child2.classList.add("table-box");
                    table_container_child2.id = "api-key-box";
                    let optional2;
                    const h4 = document.createElement("h4");
                    data.data.forEach((itm) => {
                        if (selectElm.value.toLowerCase() === itm.Api_Type.toLowerCase()) {
                            optional2 = {
                                Api_Key: itm.Api_Key,
                                Api_Secret: itm.Api_Secret,
                            };
                        }
                    });
                    console.log("optional2:", optional2);
                    h4.innerText = "API Key";
                    const p1 = document.createElement("p");
                    p1.id = "api-key";
                    p1.innerText = optional1 ? optional1.Api_Key : optional2.Api_Key;
                    table_container_child2.appendChild(h4);
                    table_container_child2.appendChild(p1);

                    // Create child-3
                    const table_container_child3 = document.createElement("div");
                    table_container_child3.classList.add("table-box");
                    table_container_child3.id = "api-secret-box";
                    const h42 = document.createElement("h4");
                    h42.innerText = "API Secret";
                    const p2 = document.createElement("p");
                    p2.id = "api-secret";
                    p2.innerText = optional1 ? optional1.Api_Secret : optional2.Api_Secret;
                    table_container_child3.appendChild(h42);
                    table_container_child3.appendChild(p2);

                    // Create child-4
                    const table_container_child4 = document.createElement("div");
                    table_container_child4.classList.add("table-box-edit");
                    const button_1 = document.createElement("button");
                    button_1.classList.add("edit-button");
                    button_1.id = "editBtn";
                    button_1.innerText = "Edit";
                    table_container_child4.appendChild(button_1);

                    // Append children to container
                    tableContainer.appendChild(table_container_child1);
                    tableContainer.appendChild(table_container_child2);
                    tableContainer.appendChild(table_container_child3);
                    tableContainer.appendChild(table_container_child4);
                }
            }
        })
        .catch((err) => {
            console.log("Error thrown is: ", err);
            document.querySelector(".table-container").innerHTML = "<p>Failed to fetch data</p>";
        });
});



const base_url = document.getElementById("hiddenData").innerText.trim();
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
                            ${item.template}<br><br>
                            <button class="select-template">Selected</button>
                        `;
                        
                        }else{
                            templateCardChild.innerHTML = `
                            ${item.template}<br><br>
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
