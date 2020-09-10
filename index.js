const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_api'
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});

//tampilkan semua data bis
app.get('/api/bus', (req, res) => {
  let sql = "SELECT bus_id, bus_name, schedule_day, schedule_depature, schedule_arrival, bus_station_from, bus_station_to FROM tb_bus JOIN tb_schedule ON tb_bus.schedule_id=tb_schedule.schedule_id JOIN tb_bus_station ON tb_bus.bus_station_id=tb_bus_station.bus_station_id";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//tampilkan data bis berdasarkan id
app.get('/api/bus/:id', (req, res) => {
  let sql = "SELECT bus_id, bus_name, schedule_day, schedule_depature, schedule_arrival, bus_station_from, bus_station_to FROM tb_bus JOIN tb_schedule ON tb_bus.schedule_id=tb_schedule.schedule_id JOIN tb_bus_station ON tb_bus.bus_station_id=tb_bus_station.bus_station_id WHERE bus_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//tampilkan semua data jadwal
app.get('/api/bus_schedule', (req, res) => {
  let sql = "SELECT * FROM tb_schedule";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//tampilkan data jadwal berdasarkan id
app.get('/api/bus_schedule/:id', (req, res) => {
  let sql = "SELECT * FROM tb_schedule where schedule_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//tampilkan semua data terminal
app.get('/api/bus_station', (req, res) => {
  let sql = "SELECT * FROM tb_bus_station";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//tampilkan data terminal berdasarkan id
app.get('/api/bus_station/:id', (req, res) => {
  let sql = "SELECT * FROM tb_bus_station where bus_station_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//tampilkan data bis berdasarkan hari
app.get('/api/bus_day/:day', (req, res) => {
  let sql = "SELECT bus_id, bus_name, schedule_day, schedule_depature, schedule_arrival, bus_station_from, bus_station_to FROM tb_bus JOIN tb_schedule ON tb_bus.schedule_id=tb_schedule.schedule_id JOIN tb_bus_station ON tb_bus.bus_station_id=tb_bus_station.bus_station_id WHERE schedule_day='" + req.params.day + "'";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//Tambahkan data bis baru
app.post('/api/bus_add', (req, res) => {
  let cek = "SELECT count(*) AS total FROM tb_bus JOIN tb_schedule ON tb_bus.schedule_id=tb_schedule.schedule_id JOIN tb_bus_station ON tb_bus.bus_station_id=tb_bus_station.bus_station_id WHERE bus_name='" + req.body.bus_name + "' AND tb_bus.schedule_id='" + req.body.schedule_id + "'";
  let query1 = conn.query(cek, (err, results) => {
    if (err) throw err;
    var cek_status = JSON.stringify(results[0].total);
    if (cek_status > 0) {
      res.send(JSON.stringify({
        "status": 406,
        "error": "Failed",
        "response": "Jadwal Sudah Ada"
      }));
    } else {
      let data = {
        bus_name: req.body.bus_name,
        bus_img: req.body.bus_img,
        schedule_id: req.body.schedule_id,
        bus_station_id: req.body.bus_station_id
      };
      let sql = "INSERT INTO tb_bus SET ?";
      let query = conn.query(sql, data, (err, iresults) => {
        if (err) throw err;
        res.send(JSON.stringify({
          "status": 200,
          "error": null,
          "response": iresults
        }));
      });
    }
  });
});

//Tambahkan data jadwal baru
app.post('/api/schedule_add', (req, res) => {
  let data = {
    schedule_day: req.body.schedule_day,
    schedule_depature: req.body.schedule_depature,
    schedule_arrival: req.body.schedule_arrival
  };
  let sql = "INSERT INTO tb_schedule SET ?";
  let query = conn.query(sql, data, (err, iresults) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": iresults
    }));
  });
});

//Tambahkan data terminal baru
app.post('/api/bus_station_add', (req, res) => {
  let data = {
    bus_station_from: req.body.bus_station_from,
    bus_station_to: req.body.bus_station_to
  };
  let sql = "INSERT INTO tb_bus_station SET ?";
  let query = conn.query(sql, data, (err, iresults) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": iresults
    }));
  });
});

//Edit data bus berdasarkan id
app.put('/api/bus_edit/:id', (req, res) => {
  let sql = "UPDATE tb_bus SET bus_name='" + req.body.bus_name + "', bus_img='" + req.body.bus_img + "', schedule_id='" + req.body.schedule_id + "', bus_station_id='" + req.body.bus_station_id + "' WHERE bus_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//Edit data jadwal berdasarkan id
app.put('/api/schedule_edit/:id', (req, res) => {
  let sql = "UPDATE tb_schedule SET schedule_day='" + req.body.schedule_day + "', schedule_depature='" + req.body.schedule_depature + "', schedule_arrival='" + req.body.schedule_arrival + "' WHERE schedule_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//Edit data terminal berdasarkan id
app.put('/api/bus_station_edit/:id', (req, res) => {
  let sql = "UPDATE tb_bus_station SET bus_station_from='" + req.body.bus_station_from + "', bus_station_to='" + req.body.bus_station_to + "' WHERE bus_station_id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//Delete data bus berdasarkan id
app.delete('/api/bus_delete/:id', (req, res) => {
  let sql = "DELETE FROM tb_bus WHERE bus_id=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//Delete data jadwal berdasarkan id
app.delete('/api/schedule_delete/:id', (req, res) => {
  let sql = "DELETE FROM tb_schedule WHERE schedule_id=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//Delete data terminal berdasarkan id
app.delete('/api/bus_station_delete/:id', (req, res) => {
  let sql = "DELETE FROM tb_bus_station WHERE bus_station_id=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//Server listening
app.listen(5000, () => {
  console.log('Server started on port 5000...');
});