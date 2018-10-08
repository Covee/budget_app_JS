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

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            expenses: [],
            income: []
        },
        totals: {
            expenses: 0,
            income: 0
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
            

            if (type === 'expenses') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'income') {
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;

        },

        calculateBudget: function() {
            // calculate income, expenses
            calculateTotal('income');
            calculateTotal('expenses');
            // income - expenses
            data.budget = data.totals.income - data.totals.expenses;
            // calculate the percentage of income that be spent
            if (data.totals.income > 0){
                data.percentage = Math.round((data.totals.expenses / data.totals.income) * 100);
            } else {
                data.percentage = -1;    // or undefined
            }
            
        },

        getBudget: function() {
            return {
                budget : data.budget,
                totalInc: data.totals.income,
                totalExp: data.totals.expenses,
                percentage: data.percentage,
            }
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
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',


    }
    return {
        getInput: function() {
            return {    // 동시에 3개의 properties를 묶어서 넘기기 위함, so 하나하나 차례로 실행되는 것이 아니라, 동시에 3개가 실행 되게끔
                type        : document.querySelector(DOMstrings.inputType).value,  // +(income), -(expense) 결정
                description : document.querySelector(DOMstrings.inputDescription).value,
                value       : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };  
        },
        addListItem: function(obj, type) {
            var html, newHtml, element;

            if (type === 'income') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'expenses') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";

            });

            fieldsArr[0].focus();   // focus back to the input space after type in
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

    var updateBudget = function() {
        // 1. calculate budget and return it
        budgetController.calculateBudget();
        var budget = budgetController.getBudget();
        console.log(budget);
        // 2. display the budget on UI
    };

    var ctrlAddItem = function() {      // private func.
        var input, newItem;
        // 1. get the input data
        input = UC.getInput();
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. add item to the budgetController
            newItem = BC.addItem(input.type, input.description, input.value);
            
            // 3. add the item to the UI & clear input space
            UIController.addListItem(newItem, input.type);
            UIController.clearFields();

            // 4. calculate & update
            updateBudget();
        }



    }

    return {
        init: function() {
            console.log('앱 시작됨');
            setupEventListeners();
        }
    }
})(budgetController, UIController);


appController.init();