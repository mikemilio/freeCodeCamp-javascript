
const inputText = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const output = document.getElementById("output");
const root = document.querySelector(":root");
let msgType = "";

inputText.addEventListener( "keyup", (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
        updateResult(inputText.value);
    }
} )

convertButton.addEventListener( "click", () => updateResult(inputText.value) );

const styleObject = {
    "wrong": 
    {
        display: "block",
        backgroundColor: getComputedStyle(root).getPropertyValue('--msg-wrong-background-color'),
        color: getComputedStyle(root).getPropertyValue('--msg-wrong-font-color'),
        borderColor: getComputedStyle(root).getPropertyValue('--msg-wrong-font-color'),
        fontSize: "3.2rem"
    },
    "right":
    {
        display: "block",
        backgroundColor: getComputedStyle(root).getPropertyValue('--msg-right-background-color'),
        color: getComputedStyle(root).getPropertyValue('--font-color'),
        borderColor: getComputedStyle(root).getPropertyValue('--font-color'),
        fontSize: "4rem"
    }
}

function updateStyle(name) {
    output.style.display = styleObject[name].display;
    output.style.backgroundColor = styleObject[name].backgroundColor;
    output.style.color = styleObject[name].color;
    output.style.borderColor =styleObject[name].borderColor;
    output.style.fontSize = styleObject[name].fontSize;
}


function updateResult (num) {
    if (!num || num > 3999 || num < 1) {
        msgType = "wrong";
        updateStyle(msgType);
    }
    if (!num) {
        output.textContent = "Please enter a valid number";
        return;
    } else if (num > 3999) {
        output.textContent = "Please enter a number less than or equal to 3999";
        return;
    } else if (num < 1) {
        output.textContent = "Please enter a number greater than or equal to 1";
    } 
    else {
        msgType = "right";
        updateStyle(msgType);
        output.textContent = toRoman(num);
    }
}

function toRoman(number) {

    const romans =  {
        0: ["","I","II","III","IV","V","VI","VII","VIII","IX"],
        1: ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],
        2: ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],
        3: ["", "M", "MM", "MMM"]
    }

    const text = number;
    const newText = " ".repeat(4 - text.length) + text;
    const textArr = newText.split("").map( el => Number(el) ).reverse();

    let romansText = ""
    for (let i = 3; i > -1; i--) {
        romansText += romans[i][textArr[i]];
    } 
    return romansText;
}




