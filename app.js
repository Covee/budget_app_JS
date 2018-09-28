/* using camelCase
UI Module
    get input value
    add new item to UI
    update UI
Data Module
    add the new item to data structure
    calculate budget
Controller Module
    add Event handler
*/

// budget controller
var budgetController = (function() {

})();

// UI controller
var UIController = (function() {
    var DOMstrings = {      // private, so be able to update the things at once
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value'

    }
    return {
        getInput: function() {
            return {    // 동시에 3개의 properties를 묶어서 넘기기 위함, so 하나하나 차례로 실행되는 것이 아니라, 동시에 3개가 실행 되게끔
                type        : document.querySelector(DOMstrings.inputType).value,  // +(income), -(expense) 결정
                description : document.querySelector(DOMstrings.inputDescription).value,
                value       : document.querySelector(DOMstrings.inputValue).value
            };  
        },
        getDOMstrings: function() {     // pass DOMstrings to the app controller
            return DOMstrings;
        }
    }
})();

// app controller
var appController = (function(BC, UC) {
    var DOM = UC.getDOMstrings();

    var ctrlAddItem = function() {
        // 1. get the input data
        var input = UC.getInput();
        console.log(input);
        // 2. add item to the budgetController
        // 3. add the item to the UI
        // 4. calculate budget
        // 5. display the budget on UI
        console.log("yeah");
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 || event.which === 13) {  // keycode를 받아올 때, 브라우저별로 event.KeyCode가 안될 수 있어서 event.which 를 같이 써 줘서 모든 브라우저에서 13을 인식 할 수 있게 함.
            ctrlAddItem();
        }
    });
})(budgetController, UIController);
