const submit = document.getElementById("submit");


submit.addEventListener("click", () => {
    const option = {
        description: document.getElementById("description").value,
        templateType: document.getElementById("templateType").value
    };
    console.log("🚀 ~ option:", option)
    
    fetch("/api/v1/createTemplate", {
        body: JSON.stringify(option), 
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    })
    .then((response) => response.json()) 
    .then((data) => {
        console.log("Success:", data);
        window.location.href = "/home";  
    })
    .catch((err) => {
        console.log("Error:", err);
    });
});
