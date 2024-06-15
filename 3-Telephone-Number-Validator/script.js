
const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

userInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
        checkInput();
    }
})

checkBtn.addEventListener("click", checkInput);

clearBtn.addEventListener("click", () => {
    resultsDiv.style.overflowY = "auto";   
    resultsDiv.innerHTML = "";
} )

function checkInput() {
    const inputValue = userInput.value.trim();
    const regex = /^1?[ -]?(\(\d{3}\)|\d{3})[ -]?\d{3}[ -]?\d{4}$/;
    if (!inputValue) {
        alert("Please provide a phone number");
    } else {
        if (resultsDiv.offsetHeight > 250) {
            resultsDiv.style.height = "25rem";
            console.log("ok");
            resultsDiv.style.overflowY = "scroll";   
        }
        const resultAnswer = document.createElement("div");
        resultsDiv.appendChild(resultAnswer);
        if (inputValue.match(regex)) {
            resultAnswer.style.color = "#00471B";
            resultAnswer.innerText += `Valid US number: ${inputValue}\n\n`;
        } else {
            resultAnswer.style.color = "#4D3800;";
            resultAnswer.innerText += `Invalid US number: ${inputValue}\n\n`;
        }
        userInput.value = "";
    }
    

}
