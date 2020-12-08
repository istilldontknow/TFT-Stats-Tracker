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
    const q = 'SELECT COUNT(*) AS count FROM p1016';
    connection.query(q, function (error, results) {
   		if (error) throw error;
    	const count = results[0].count;
    	res.render('home', {count: count});
	});
});
app.get("/results", function (req, res){
	const q1 = 'SELECT AVG(result) AS results FROM p1016 GROUP BY composition ORDER BY results LIMIT 1';
	//const q = "SELECT composition AS composition, AVG(result) AS avg_result FROM p1016 GROUP BY composition ORDER BY avg_result LIMIT 5 ";
	connection.query(q1, function (error, results) {
		if (error) throw error;
		const composition = results[0].composition;
		const avg_result = results[0].results;
		res.render('results', {composition : composition}, {avg_result : avg_result });
	});
	//res.send('UNDER CONSTRUCTION');

});


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

app.listen(3000, function () {
	console.log('App listening on port 3000');
});

