const express = require('express');
const cors = require('cors');
const app = express();
var mysql = require('mysql');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// // app.use(cors());
// const corsOptions = {
//   origin: 'https://wallflower.elcexercises.org',
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
// app.use(bodyParser.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://wallflower.elcexercises.org');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Yp64@9T7",
  database: "wallflower"
});
/*
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Yp64@9T7",
  database: "wallflower"
});
*/

//GET request for the root URL
app.get('/', (req, res) => {
  const data = req.body;
  res.send('Wallflower Backend');
});

//Feeling table
app.post('/api/addfeeling', (req, res) => {
  const data = req.body;

  const uuid = uuidv4();
  // Do something with the data
  var sql = "INSERT INTO Feeling (ID, DataOption) VALUES ('" + uuid + "', '" + data.option + "')";
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query(sql, function (err, result) {
      // When done with the connection, release it.
      con.release();
      if (err) throw err;
      console.log("1 record inserted");
    });
    res.send('Data received');
  });
});

app.get('/api/getfeeling', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('SELECT * FROM Feeling', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      var neutral = 0;
      var angry = 0;
      var sad = 0;
      var frustrated = 0;
      var agreeable = 0;
      var happy = 0;
      for (var i = 0; i < results.length; i++) {
        if (results[i].DataOption == "Neutral") neutral++;
        if (results[i].DataOption == "Angry") angry++;
        if (results[i].DataOption == "Sad") sad++;
        if (results[i].DataOption == "Frustrated") frustrated++;
        if (results[i].DataOption == "Agreeable") agreeable++;
        if (results[i].DataOption == "Happy") happy++;

      }
      var total = neutral + angry + sad + frustrated + agreeable + happy;
      neutral = 100 * neutral * 1.0 / total;
      angry = 100 * angry * 1.0 / total;
      sad = 100 * sad * 1.0 / total;
      frustrated = 100 * frustrated * 1.0 / total;
      agreeable = 100 * agreeable * 1.0 / total;
      happy = 100 * happy * 1.0 / total;
      var data_results = "{";
      data_results = data_results + '"neutral":' + neutral + ',' +
        '"angry":' + angry + ',' +
        '"sad":' + sad + ',' +
        '"frustrated":' + frustrated + ',' +
        '"agreeable":' + agreeable + ',' +
        '"happy":' + happy + "}";

      console.log(data_results);
      const data = JSON.parse(data_results);
      res.json(data);
    });
  });
});

app.get('/api/clearfeeling', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('TRUNCATE TABLE Feeling', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      res.json(results);
    });
  });
});

//Overall table
app.post('/api/addoverall', (req, res) => {
  const data = req.body;

  const uuid = uuidv4();
  // Do something with the data
  var sql = "INSERT INTO Overall (ID, DataOption) VALUES ('" + uuid + "', '" + data.option + "')";
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query(sql, function (err, result) {
      // When done with the connection, release it.
      con.release();
      if (err) throw err;
      console.log("1 record inserted");
    });
    res.send('Data received');
  });
});

app.get('/api/getoverall', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('SELECT * FROM Overall', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      var fair = 0;
      var neutral = 0;
      var unfair = 0;
      for (var i = 0; i < results.length; i++) {
        if (results[i].DataOption == "Fair") fair++;
        if (results[i].DataOption == "Neutral") neutral++;
        if (results[i].DataOption == "Unfair") unfair++;

      }
      var total = fair + neutral + unfair;
      fair = 100 * fair * 1.0 / total;
      neutral = 100 * neutral * 1.0 / total;
      unfair = 100 * unfair * 1.0 / total;
      var data_results = "{";
      data_results = data_results + '"fair":' + fair + ',' +
        '"neutral":' + neutral + ',' +
        '"unfair":' + unfair + "}";
      const data = JSON.parse(data_results);
      res.json(data);
    });
  });
});

app.get('/api/clearoverall', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('TRUNCATE TABLE Overall', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      res.json(results);
    });
  });
});

//Influence table
app.post('/api/addinfluence', (req, res) => {
  const data = req.body;

  const uuid = uuidv4();
  // Do something with the data
  var sql = "INSERT INTO Influence (ID, DataOption) VALUES ('" + uuid + "', '" + data.option + "')";
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query(sql, function (err, result) {
      // When done with the connection, release it.
      con.release();
      if (err) throw err;
      console.log("1 record inserted");
    });
    res.send('Data received');
  });
});

app.get('/api/getinfluence', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('SELECT * FROM Influence', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      var experience = 0;
      var appearance = 0;
      var culture = 0;
      var bias = 0;
      for (var i = 0; i < results.length; i++) {
        if (results[i].DataOption == "Experience") experience++;
        if (results[i].DataOption == "Appearance") appearance++;
        if (results[i].DataOption == "Culture") culture++;
        if (results[i].DataOption == "Bias") bias++;
      }
      var total = experience + appearance + culture + bias;
      experience = 100 * experience * 1.0 / total;
      appearance = 100 * appearance * 1.0 / total;
      culture = 100 * culture * 1.0 / total;
      bias = 100 * bias * 1.0 / total;
      var data_results = "{";
      data_results = data_results + '"experience":' + experience + ',' +
        '"appearance":' + appearance + ',' +
        '"culture":' + culture + ',' +
        '"bias":' + bias + "}";
      const data = JSON.parse(data_results);
      res.json(data);
    });
  });
});

app.get('/api/clearinfluence', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('TRUNCATE TABLE Influence', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      res.json(results);
    });
  });
});

//Valid table
app.post('/api/addvalid', (req, res) => {
  const data = req.body;

  const uuid = uuidv4();
  // Do something with the data
  var sql = "INSERT INTO Valid (ID, DataOption) VALUES ('" + uuid + "', '" + data.option + "')";
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query(sql, function (err, result) {
      // When done with the connection, release it.
      con.release();
      if (err) throw err;
      console.log("1 record inserted");
    });
    res.send('Data received');
  });
});

app.get('/api/getvalid', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('SELECT * FROM Valid', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      var yes = 0;
      var no = 0;
      for (var i = 0; i < results.length; i++) {
        if (results[i].DataOption == "Yes") yes++;
        if (results[i].DataOption == "No") no++;

      }
      var total = yes + no;
      yes = 100 * yes * 1.0 / total;
      no = 100 * no * 1.0 / total;
      var data_results = "{";
      data_results = data_results + '"yes":' + yes + ',' +
        '"no":' + no + "}";
      const data = JSON.parse(data_results);
      res.json(data);
    });
  });
});

app.get('/api/clearvalid', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('TRUNCATE TABLE Valid', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      res.json(results);
    });
  });
});

//Opinion table
app.post('/api/addopinion', (req, res) => {
  const data = req.body;

  const uuid = uuidv4();
  // Do something with the data
  var sql = "INSERT INTO Opinion (ID, DataOption) VALUES ('" + uuid + "', '" + data.option + "')";
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query(sql, function (err, result) {
      // When done with the connection, release it.
      con.release();
      if (err) throw err;
      console.log("1 record inserted");
    });
    res.send('Data received');
  });
});

app.get('/api/getopinion', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('SELECT * FROM Opinion', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      var yes = 0;
      var no = 0;
      for (var i = 0; i < results.length; i++) {
        if (results[i].DataOption == "Yes") yes++;
        if (results[i].DataOption == "No") no++;

      }
      var total = yes + no;
      yes = 100 * yes * 1.0 / total;
      no = 100 * no * 1.0 / total;
      var data_results = "{";
      data_results = data_results + '"yes":' + yes + ',' +
        '"no":' + no + "}";
      const data = JSON.parse(data_results);
      res.json(data);
    });
  });
});

app.get('/api/clearopinion', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('TRUNCATE TABLE Opinion', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      res.json(results);
    });
  });
});

//USER table
app.post('/api/adduser', (req, res) => {
  const data = req.body;

  const uuid = uuidv4();
  // Do something with the data
  var sql = "INSERT INTO User (ID, Username, Password) VALUES ('" + uuid + "', '" + data.username + "', '" + data.password + "')";
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query(sql, function (err, result) {
      // When done with the connection, release it.
      con.release();
      if (err) throw err;
      console.log("1 record inserted");
    });
    res.send('Data received');
  });
});

app.get('/api/getusers', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('SELECT * FROM User', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      res.json(results);
    });
  });


});

app.get('/api/clearusers', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('TRUNCATE TABLE User', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      res.json(results);
    });
  });
});

//APPLICATION CHOICE table
app.post('/api/addapplicationchoice', (req, res) => {
  const data = req.body;

  const uuid = uuidv4();
  // Do something with the data
  var sql = "INSERT INTO ApplicationChoice (ID, TopChoice, BottomChoice) VALUES ('" + uuid + "', '" + data.topchoice + "', '" + data.bottomchoice + "')";
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query(sql, (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (err) throw err;
      console.log("1 record inserted");
      res.send('Data received');
    });
  });
});

app.get('/api/getvideochoices', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('SELECT * FROM VideoChoice', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      var TopChoiceCountKaleb = 0;
      var BottomChoiceCountKaleb = 0;

      var TopChoiceCountVanessa = 0;
      var BottomChoiceCountVanessa = 0;

      var TopChoiceCountGary = 0;
      var BottomChoiceCountGary = 0;

      var TopChoiceCountCorinne = 0;
      var BottomChoiceCountCorinne = 0;

      var TopChoiceCountReagan = 0;
      var BottomChoiceCountReagan = 0;

      for (var i = 0; i < results.length; i++) {

        if (results[i].TopChoice == "Kaleb") TopChoiceCountKaleb++;
        if (results[i].BottomChoice == "Kaleb") BottomChoiceCountKaleb++;

        if (results[i].TopChoice == "Vanessa") TopChoiceCountVanessa++;
        if (results[i].BottomChoice == "Vanessa") BottomChoiceCountVanessa++;

        if (results[i].TopChoice == "Gary") TopChoiceCountGary++;
        if (results[i].BottomChoice == "Gary") BottomChoiceCountGary++;

        if (results[i].TopChoice == "Corinne") TopChoiceCountCorinne++;
        if (results[i].BottomChoice == "Corinne") BottomChoiceCountCorinne++;

        if (results[i].TopChoice == "Reagan") TopChoiceCountReagan++;
        if (results[i].BottomChoice == "Reagan") BottomChoiceCountReagan++;

      }
      var data_results = "[";

      data_results += '{ "name": "Kaleb", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountKaleb + ",";
      data_results = data_results + '"bottomchoice": ' + BottomChoiceCountKaleb;
      data_results = data_results + "},";

      data_results += '{ "name": "Vanessa", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountVanessa + ",";
      data_results = data_results + '"bottomchoice": ' + BottomChoiceCountVanessa;
      data_results = data_results + "},";

      data_results += '{ "name": "Gary", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountGary + ",";
      data_results = data_results + '"bottomchoice": ' + BottomChoiceCountGary;
      data_results = data_results + "},";

      data_results += '{ "name": "Corinne", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountCorinne + ",";
      data_results = data_results + '"bottomchoice": ' + BottomChoiceCountCorinne;
      data_results = data_results + "},";

      data_results += '{ "name": "Reagan", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountReagan + ",";
      data_results = data_results + '"bottomchoice": ' + BottomChoiceCountReagan;
      data_results = data_results + "}";

      data_results = data_results + "]";

      const data = JSON.parse(data_results);
      res.json(data);
    });
  });

});

app.get('/api/clearapplicationchoices', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('TRUNCATE TABLE ApplicationChoice', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      res.json(results);
    });
  });
});

//VIDEO CHOICE table
app.post('/api/addvideochoice', (req, res) => {
  const data = req.body;

  const uuid = uuidv4();
  // Do something with the data
  var sql = "INSERT INTO VideoChoice (ID, TopChoice, BottomChoice) VALUES ('" + uuid + "', '" + data.topchoice + "', '" + data.bottomchoice + "')";
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query(sql, function (err, result) {
      // When done with the connection, release it.
      con.release();
      if (err) throw err;
      console.log("1 record inserted");
    });
    res.send('Data received');
  });
});

/*
{
  name: 'Arizona',
  topchoice: 4,
  bottomchoice: 7
}
*/

app.get('/api/getapplicationchoices', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('SELECT * FROM ApplicationChoice', (error, results, fields) => {
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }

      var TopChoiceCountArizona = 0;
      var BottomChoiceCountArizona = 0;

      var TopChoiceCountCalPoly = 0;
      var BottomChoiceCountCalPoly = 0;

      var TopChoiceCountCalDavis = 0;
      var BottomChoiceCountCalDavis = 0;

      var TopChoiceCountWashington = 0;
      var BottomChoiceCountWashington = 0;

      var TopChoiceCountOregon = 0;
      var BottomChoiceCountOregon = 0;

      for (var i = 0; i < results.length; i++) {

        if (results[i].TopChoice == "Arizona") TopChoiceCountArizona++;
        if (results[i].BottomChoice == "Arizona") BottomChoiceCountArizona++;

        if (results[i].TopChoice == "Cal Poly") TopChoiceCountCalPoly++;
        if (results[i].BottomChoice == "Cal Poly") BottomChoiceCountCalPoly++;

        if (results[i].TopChoice == "Cal Davis") TopChoiceCountCalDavis++;
        if (results[i].BottomChoice == "Cal Davis") BottomChoiceCountCalDavis++;

        if (results[i].TopChoice == "Washington") TopChoiceCountWashington++;
        if (results[i].BottomChoice == "Washington") BottomChoiceCountWashington++;

        if (results[i].TopChoice == "Oregon") TopChoiceCountOregon++;
        if (results[i].BottomChoice == "Oregon") BottomChoiceCountOregon++;

      }
      var data_results = "[";

      data_results += '{ "name": "Arizona", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountArizona + ",";
      data_results = data_results + '"bottomchoice": ' + BottomChoiceCountArizona;
      data_results = data_results + "},";

      data_results += '{ "name": "Cal Poly", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountCalPoly + ",";
      data_results = data_results + '"bottomchoice": ' + BottomChoiceCountCalPoly;
      data_results = data_results + "},";

      data_results += '{ "name": "Cal Davis", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountCalDavis + ",";
      data_results = data_results + '"bottomchoice": ' + BottomChoiceCountCalDavis;
      data_results = data_results + "},";

      data_results += '{ "name": "Washington", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountWashington + ",";
      data_results = data_results + '"bottomchoice": ' + BottomChoiceCountWashington;
      data_results = data_results + "},";

      data_results += '{ "name": "Oregon", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountOregon + ",";
      data_results = data_results + '"bottomchoice": ' + BottomChoiceCountOregon;
      data_results = data_results + "}";

      data_results = data_results + "]";

      const data = JSON.parse(data_results);
      res.json(data);

    });
  });

});

app.get('/api/clearvideochoices', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('TRUNCATE TABLE VideoChoice', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      res.json(results);
    });
  });
});

//PREFERRED CHOICE table
app.post('/api/addpreferredchoice', (req, res) => {
  const data = req.body;

  const uuid = uuidv4();
  // Do something with the data
  var sql = "INSERT INTO PreferredChoice (ID, Choice) VALUES ('" + uuid + "', '" + data.choice + "')";
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query(sql, function (err, result) {
      // When done with the connection, release it.
      con.release();
      if (err) throw err;
      console.log("1 record inserted");
    });
    res.send('Data received');
  });
});

app.get('/api/getpreferredchoices', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('SELECT * FROM PreferredChoice', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      var TopChoiceCountKaleb = 0;

      var TopChoiceCountVanessa = 0;

      var TopChoiceCountGary = 0;

      var TopChoiceCountCorinne = 0;

      var TopChoiceCountReagan = 0;

      for (var i = 0; i < results.length; i++) {

        if (results[i].Choice == "Arizona") TopChoiceCountKaleb++;

        if (results[i].Choice == "Cal Poly") TopChoiceCountVanessa++;

        if (results[i].Choice == "Cal Davis") TopChoiceCountGary++;

        if (results[i].Choice == "Washington") TopChoiceCountCorinne++;

        if (results[i].Choice == "Oregon") TopChoiceCountReagan++;

      }
      var data_results = "[";

      data_results += '{ "name": "Kaleb", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountKaleb;
      data_results = data_results + "},";

      data_results += '{ "name": "Vanessa", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountVanessa;
      data_results = data_results + "},";

      data_results += '{ "name": "Gary", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountGary;
      data_results = data_results + "},";

      data_results += '{ "name": "Corinne", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountCorinne;
      data_results = data_results + "},";

      data_results += '{ "name": "Reagan", ';
      data_results = data_results + '"topchoice": ' + TopChoiceCountReagan;
      data_results = data_results + "}";

      data_results = data_results + "]";

      const data = JSON.parse(data_results);
      res.json(data);
    });
  });
});

app.get('/api/clearpreferredchoices', (req, res) => {
  pool.getConnection(function (err, con) {
    if (err) throw err; // not connected!
    con.query('TRUNCATE TABLE PreferredChoice', (error, results, fields) => {
      // When done with the connection, release it.
      con.release();
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Error executing MySQL query');
        return;
      }
      res.json(results);
    });
  });

});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});