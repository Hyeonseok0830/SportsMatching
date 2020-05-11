const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const dbConObj = require('../config/db_info');	//디비 정보 import
const dbconn = dbConObj.init(); //sql 실행결과( results(배열 + json 형태)에 저장)
 

router.post('/', function (req, res) {
    console.log('<<Login>>');

    req.on('data', (data) => {
        inputData = JSON.parse(data);
        var login_id = inputData.id;
        var login_pwd = inputData.pw;
        console.log('로그인 시도 아이디 : ' + login_id);
        var sql = 'select * from user ';
        var result= 'error';
        dbconn.query(sql, function (err, rows, fields) {
            var find_pw = false;
            if (err) {
                console.log(err);
            } else {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].id === login_id) {
                        find_pw=true;
                        var salt = rows[i].salt.toString('base64');
                        //console.log('salt ' + rows[i].salt);
                        //console.log('pw ' + inputData.pw);
                        //console.log('row_pw ' + rows[i].pw);
                        var pw = rows[i].pw;
                       // var code;
                        crypto.randomBytes(64, (err, buf) => {
                            
                            crypto.pbkdf2(inputData.pw, salt, 100000, 64, 'sha512', (err, key) => {
                                //crypto.pbkdf2(inputData.pw, buf.toString('base64'), 9000, 64, 'sha512', (err, key) => {
                                var code;
                                if (key.toString('base64')=== pw) {
                                    code = 'Success';
                                    message = '로그인 성공! ' + login_id + '님 환영합니다!';
                                    console.log(message);
                                }
                                else {
                                    code = 'No find'
                                    console.log(message);
                                    message = '비밀번호가 틀렸습니다!';
                                }
                                res.json({
                                    'result': code
                                });
                            });
                        });
                        //result = crypto;
                        break;
                    }
                    else {
                        result = 'No find'
                        message = '존재하지 않는 계정입니다!';
                        console.log(message);
                        
                    }
                }
               
                if(!find_pw){
                    res.json({
                        'result': result
                    });
                    console.log(result);
                }
                
                // res.json({
                //     'result': result
                // });
            }
        })
    });
});
    

module.exports = router;