// require modules
var inquirer = require('inquirer');

var mysql = require('mysql');


// ask how many units of the product they would like to buy.


// connection object
var connection = mysql.createConnection({
	host: 'localhost', 
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon'
});

// function to connect to the bamazon database
connection.connect(function(err) {
	if (err) throw err;
	console.log('connected as id ' + connection.threadId);	
});


// display all of the items available for sale. Include the ids, names, and prices of products for sale.
var printTable = function() {
  connection.query('SELECT * FROM Products', function(err, res) {
      console.log("");
      console.log("----------------------------------------------------");
      for (var i = 0; i < res.length; i++) {
          console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("----------------------------------------------------");
      questions();
  });
};
printTable();


// ask/prompt them the ID of the product they would like to buy.
function questions() {
inquirer.prompt([
	{
	type: "input",
	message: "Hello. Thank you for visiting Melissa's Fine Jewelry. Please select which item you wish to purchase.",
	name: "id"
},{


	// ask/prompt how many units of the product they would like to buy.
	type: "input",
	message: "How many would you like?",
	name: "quantity"

}]).then(function (answers) {


// check if your store has enough of the product to meet the customer's request. If not, log "Insufficient quantity!", and then prevent the order from going through.
var productNumber = answers.id 

connection.query('SELECT * FROM products WHERE ?', {item_id: productNumber}, function(err, data) {
	if (err) throw err;

	var item = data[0];

	console.log(answers.quantity);
	console.log(item);

	if (answers.quantity < item.inventory) {


	// if your store does have enough of the product, you should fulfill the customer's order.Update the SQL database to reflect the remaining quantity.
	connection.query('Update products SET inventory =' + answers.quantity + ' WHERE inventory = '+ (item.inventory - answers.quantity), function(err, data1) {
		if (err) throw err;

		console.log(data1);
	});
   }
   else {
  	console.log("We're sorry. There isn't enough of this item in stock. Please enter a different quanity.")
   }
  });
 });
};
// Once the update goes through, show the customer the total cost of their purchase.