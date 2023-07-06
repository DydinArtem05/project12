// Declare variables which are responsible for creating new elements and getting ui elements
let newOptionField = document.createElement("option");
let sendFormDataButton = document.querySelector("#sendDataButton");
let fromUnit = document.querySelector("#fromUnit");
let toUnit = document.querySelector("#toUnit");
let distanceValue = document.querySelector("#distance");
let resultField = document.querySelector("#resultField");

// Put listener to call result function
sendFormDataButton.addEventListener('click', getMeasureResult)

// Give data from JSON file
let conversionRules = {};
fetch("measureSystem.json")
    .then(response => response.json())
    .then(data => {
        conversionRules = data;
        for (const key in conversionRules) {
            if (conversionRules.hasOwnProperty(key)) {
                newOptionField.innerHTML = key;
                newOptionField.value = key;
                fromUnit.innerHTML += newOptionField.outerHTML;
                toUnit.innerHTML += newOptionField.outerHTML;
            }
        }
    })
    .catch(error => console.log(error));

// Function which convert data to the right value
function convert(inputData) {
    let distance = inputData.distance.value;
    let unitFrom = inputData.distance.unit;
    let unitTo = inputData.convertTo;

    let result = distance * conversionRules[unitFrom][unitTo].toFixed(4);
    console.log({unit: unitTo, value: result});
    return result;
}

// Function which calls on click and call another function to get result of measure
function getMeasureResult(){
    if(fromUnit.value === toUnit.value){
        resultField.innerHTML = 'Choose another metric setting.';
        return ;
    }
    let inputData = { distance: { unit: fromUnit.value, value: distanceValue.value }, convertTo: toUnit.value };
    let outputData = convert(inputData);
    resultField.innerHTML = outputData;
}