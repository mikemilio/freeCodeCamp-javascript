let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const changeDue = document.getElementById("change-due");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeInDrawer = document.getElementById("change-in-drawer");
const boldLetters = document.getElementById("bold-letters");
const changeCurrencyUnits = document.getElementById("change-currency-units");
const showTotal = document.getElementById("show-total");

const changeInDrawerNames = {
  "PENNY": "Pennies",
  "NICKEL": "Nickels",
  "DIME": "Dimes",
  "QUARTER": "Quarters",
  "ONE": "One",
  "FIVE": "Fives",
  "TEN": "Tens",
  "TWENTY": "Twenties",
  "ONE HUNDRED": "Hundreds"
};

const updateChangeInDrawer = () => {
  changeCurrencyUnits.innerHTML = "";
  cid.forEach( (list) => {
    changeCurrencyUnits.innerHTML += `
      ${changeInDrawerNames[list[0]]}: $${list[1]} <br>
    `;
  } )
}

cashInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    if (!cashInput.value) {
      alert("Please insert a value");
      return;
    }
    updateDrawer(parseFloat(cashInput.value));
  }
});

purchaseBtn.addEventListener("click", () => {
  if (!cashInput.value) {
    alert("Please insert a value");
    return;
  }
  updateDrawer(parseFloat(cashInput.value));
})

showTotal.textContent = `Total: $${price}`;

const amount = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

updateChangeInDrawer();

function updateDrawer(cash) {
  const cidUnchanged = cid.map( (list) => list.slice() );
  let change = cash - price;
  change = Number(change.toFixed(2));
  const cashDue = {};
  if (!change) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  } else if (change < 0) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else {
    for (let i = cid.length - 1; i >=0; i--) {
      if (Math.floor(change / amount[i])) {
        if (cid[i][1] > change) {
          const unitsOfCurrency = Math.floor(change / amount[i]);
          cashDue[cid[i][0]] = Number((amount[i] * unitsOfCurrency).toFixed(2));
          change -= amount[i] * unitsOfCurrency;
          change = Number(change.toFixed(2));
          cid[i][1] -= amount[i] * unitsOfCurrency;
          cid[i][1] = Number(cid[i][1].toFixed(2));
        } else if (cid[i][1] <= change) {
            cashDue[cid[i][0]] = Number(cid[i][1].toFixed(2));
            change -= cid[i][1];
            change = Number(change.toFixed(2));
            cid[i][1] = 0; 
        }
      } else {
        cashDue[cid[i][0]] = 0;
      }
    }

    if (change !== 0) {
      changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
      cid = cidUnchanged.map( (list) => list.slice() );
      return;
    }

    if (cid.every( (list) => list[1] === 0 )) {
      changeDue.innerHTML = "Status: CLOSED <br>";
    } else {
      changeDue.innerHTML = "Status: OPEN <br>";
    }
  
    for (const [key, value] of Object.entries(cashDue) ) {
      if (value) {
        changeDue.innerHTML += ` ${key}: $${value}<br>`;
      }
    }

    updateChangeInDrawer();

  }
}


  
