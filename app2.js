const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const mysql = require('mysql');
const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	database : 'tft'
});


app.get("/", function(req, res){
    const q = 'SELECT COUNT(*) AS count FROM p1016'
	const q1 = 'SELECT composition as composition FROM p1016 GROUP BY composition ORDER BY AVG(result) LIMIT 1';
    connection.query(q, function (error, results) {
   		if (error) throw error;
    	//const count = results[0].count;
		connection.query(q1, function(error, results) {
		//const composition = results[0].composition;
    	res.render('home1', {count , composition});	
		});
		
	});
});

app.get("/results", function (req, res){
	const q = "SELECT composition AS composition, AVG(result) AS avg_result FROM p1016 GROUP BY composition ORDER BY avg_result LIMIT 5 ";
	connection.query(q, function (error, results) {
		if (error) throw error;
		//keep the results object and pass it to the results.ejs page
		//we'll use ejs to loop through the output of the query that has 5 array elements (one each for composition and avg_result, respectively)
		res.render('results1', {results});
	});
});
	// res.send('UNDER CONSTRUCTION');

app.post('/submit', function (req, res) {
	const submission = {
		composition : req.body.composition,
		result : req.body.result
	};
	connection.query('INSERT INTO p1016 SET ?', submission, function (err, results) {
		if (err) throw err;
		res.redirect('/');
	});
});

app.listen(5000, function () {
	console.log('App listening on port 5000');
});