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
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            

            if (type === 'expense') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'income') {
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;

        },
        testing: function() {
            console.log(data);
        }
    };

})();

// UI controller
var UIController = (function() {
    var DOMstrings = {      // private, so be able to update the things at once
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',

    }
    return {
        getInput: function() {
            return {    // 동시에 3개의 properties를 묶어서 넘기기 위함, so 하나하나 차례로 실행되는 것이 아니라, 동시에 3개가 실행 되게끔
                type        : document.querySelector(DOMstrings.inputType).value,  // +(income), -(expense) 결정
                description : document.querySelector(DOMstrings.inputDescription).value,
                value       : document.querySelector(DOMstrings.inputValue).value
            };  
        },
        addListItem: function(obj, type) {
            var html;

            if (type === 'income') {
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'expense') {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            

            
        },

        getDOMstrings: function() {     // pass DOMstrings to the app controller
            return DOMstrings;
        }
    }
})();

// app controller
var appController = (function(BC, UC) {

    var setupEventListeners = function() {      // private func.
        var DOM = UC.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {  // keycode를 받아올 때, 브라우저별로 event.KeyCode가 안될 수 있어서 event.which 를 같이 써 줘서 모든 브라우저에서 13을 인식 할 수 있게 함.
                ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function() {      // private func.
        var input, newItem;
        // 1. get the input data
        input = UC.getInput();
        console.log(input);
        // 2. add item to the budgetController
        newItem = BC.addItem(input.type, input.description, input.value);
        // 3. add the item to the UI
        // 4. calculate budget
        // 5. display the budget on UI
    }

    return {
        init: function() {
            console.log('앱 시작됨');
            setupEventListeners();
        }
    }
})(budgetController, UIController);


appController.init();