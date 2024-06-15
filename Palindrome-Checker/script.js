
const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

textInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter")
        if(!textInput.value) {
            alert("Please input a value");
        }
        else {
            checkPalindrome();
        }
    });

checkBtn.addEventListener("click", () => {
    if (!textInput.value) {
        alert("Please input a value");
    } else {
        checkPalindrome();
    }
})

function checkPalindrome() {
    const regex = /[^a-z0-9]/g;
    const newStr = textInput.value.toLowerCase().replace(regex, "");
    
    let isPalindrome = false;
    if (newStr.split("").toString() === newStr.split("").reverse().toString()) {
        isPalindrome = true;
    } else {
        isPalindrome = false;
    }

    resultDiv.innerHTML = `<span id="bold-text">${textInput.value}</span>`;
    let resultText = isPalindrome ? ` is a palindrome` : ` is not a palindrome`;
    resultDiv.innerHTML += resultText;

    textInput.value = "";
    

}