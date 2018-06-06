var mysql = require("mysql");
var inquirer = require("inquirer");

//Connecting JS to MySql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
})

//initializing the JS and MySql connection
connection.connect(function (error) {
    if (error) throw error;
    console.log("good connection!");
    makeTable();
})

//makeTable function to collect data from MySql and print it on the screen
var makeTable = function () {
    connection.query("SELECT * FROM products", function (error, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " || " + res[i].product_name + " || " +
                res[i].department_name + " || " + res[i].price + " || " + res[i].
                    stock_quantity + "\n");
        }
        promptCustomer(res);
    })
}
//Prompts the customer so that they can purchase an item 
//takes in response object from connection query
//allows user to have all items as choices
var promptCustomer = function (res) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What do you want to buy?"
    }])
        .then(function (answer) {
            var correct = false;
            //allows user to type choice and loops through choice items 
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name == answer.choice) {
                    correct = true;
                    var product = answer.choice;
                    var id = i;
                    //to ask users how many items they want
                    inquirer.prompt({
                        type: "input",
                        name: "quant",
                        message: "How many?",
                        validate: function (value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    })
                    //subtracts purchases items from stock quantity
                        .then(function (answer) {
                            if ((res[id].stock_quantity-answer.quant)>0) {
                                connection.query("UPDATE product SET stock_quantity='" + (res[id].stock_quantity-answer.quant) + '" WHERE product_name="' + product
                                    + "'", function (error, res2) {
                                    console.log("You made the purchase!");
                                    makeTable();
                                })
                            } else {
                                console.log("Not a valid purchase!");
                                promptCustomer(res);
                         }
                    })
                }
            }
            if (i == res.length && correct == false) {
            console.log("Not a valid item!");
            promptCustomer(res);
         }
    })
}