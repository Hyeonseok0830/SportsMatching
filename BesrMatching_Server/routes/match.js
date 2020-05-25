const express = require('express');
const router = express.Router();
const dbConObj = require('../config/db_info');   //디비 정보 import
const dbconn = dbConObj.init(); //sql 실행결과( results(배열 + json 형태)에 저장)
 

router.post('/create', function (req, res) {
    
    console.log('<<match/create>>');
 
    req.on('data', (data) => {
        var input_data_array= [];
        var inputData = JSON.parse(data); // JSON data 받음

        // input_data_array.push(inputData.title);// json->array
        // input_data_array.push(inputData.phonenumber);
        // input_data_array.push(inputData.age_range);
        // input_data_array.push(inputData.level);
        // input_data_array.push(inputData.location);
        // input_data_array.push(inputData.week);
        // input_data_array.push(inputData.comment);

        console.log('input_data : ' + input_data_array); // 회원가입 내용 출력

        var sql_insert = 'INSERT INTO best_matching.match (name, phonenumber, age_range, level, location,week,comment) VALUES(?, ?, ?, ?, ?, ?, ?)';
        dbconn.query(sql_insert, input_data_array, function (err, rows, fields) {//DB connect
            if (!err) {
                console.log('Query insert success');
                res.json({ "result": "Success" });
            } else {
                console.log('Query Error : ' + err);
                res.json({ "result": err });
            }
        });
    });
});
router.post('/search', function (req, res) {
    
    console.log('<<match/search>>');

    req.on('data', (data) => {
        var search_data_array= [];
        var Data = JSON.parse(data); // JSON data 받음
        search_data_array.push("%"+Data.name+"%");
        var sql;
        if(Data.location=="none"){
            sql = 'select * from match where name like ?';
        }
        else{
            search_data_array.push(Data.location);
            sql = 'select * from match where name like ? and location = ?';
        }
        console.log('search_condition : ' + search_data_array); // 회원가입 내용 출력
    
        dbconn.query(sql, search_data_array, function (err, rows, fields) {//DB connect
            if (!err) {
                console.log('Query Select Success');
                res.json({rows});
            } else {
                console.log('Query Select Error : ' + err);
                res.json({ "result": err });
            }
        });
    });
});


module.exports = router;