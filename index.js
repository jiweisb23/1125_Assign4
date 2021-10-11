var express = require('express')
var app     = express();
var mysql = require('mysql2');
//var math = require('Math')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MyNewPass',
  database: 'contacts'
});



// used to serve static files from public directory
app.use(express.static('public'));


app.get('/', function(req, res){
   res.send('Hello');
});

// test with curl 'http://localhost:3000/add?firstName=peter'

app.get('/add', function(req, res){
   //console.log('firstName: ', req.query.firstName);
   //res.send(`echoing: ${req.query.firstName}`);
   connection.query(
     "INSERT INTO `contacts` VALUES('"+req.query.firstName+"','" + req.query.lastName+ "','"+ req.query.phoneNumber+"','" + req.query.email+"','" + req.query.university+"','" + req.query.major+"')",//   //'${req.query.firstName}'
     function(err, results, fields) {
       console.log(results);
       res.send(results);
     }
   );

});

app.get('/random', function(req,res){
	entries = 5
	for(let j = 0; j<entries; j++){
		RfirstName = String.fromCharCode(Math.floor(65+26*Math.random()));
		for(let i = 0; i<10*Math.random(); i++){
			RfirstName = RfirstName+String.fromCharCode(Math.floor(97+26*Math.random()))
		};

		RlastName = String.fromCharCode(Math.floor(65+26*Math.random()));
		for(let i = 0; i<10*Math.random(); i++){
			RlastName = RlastName+String.fromCharCode(Math.floor(97+26*Math.random()))
		};

		RphoneNumber = "";
		for(let i = 0; i<10; i++){
			RphoneNumber = RphoneNumber+Math.floor(10*Math.random())
		};

		var Unis = ["MIT", "BU", "Tufts", "BC", "Harvard"];

		Runiversity = Unis[Math.floor(Math.random()*5)];


		Remail = RfirstName + '.' + RlastName + '@' + Runiversity +'.edu';

		var Majors = ["CEE", "EECS", "BIOE", "MSE", "ChemE", "IE", "ME", "AERO" ];

		Rmajor = Majors[Math.floor(Math.random()*8)];

		 connection.query(
	     "INSERT INTO `contacts` VALUES('"+RfirstName+"','" + RlastName+ "','"+ RphoneNumber+"','" + Remail+"','" + Runiversity+"','" + Rmajor+"')",//   //'${req.query.firstName}'
	     function(err, results, fields) {
	       console.log(results);
	       //res.send(results);
	     });
	};	
	res.send(entries + " random contacts added!");

});


app.get('/read', function(req, res){

   connection.query(
     'SELECT * FROM `contacts`',
     function(err, results, fields) {
       console.log(results);
       res.send(results);
     }
   );

});



app.listen(3000, function(){
   console.log('Running on port 3000!')
});

