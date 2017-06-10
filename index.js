var express = require('express');
var app = express();

var pool = require('./db');
var dbConfig = require('./dbConfig');

app.get('/', function(req, res) {
    var html = `
    <ol>
      <li><a href="/insert-data">Insert Data</a></li>
      <li><a href="/get-all-data">Get All Data</a></li>
      <li><a href="/get-row-data">Get Row Data</a></li>
      <li><a href="/get-row-count">Get Row Count</a></li>
      <li><a href="/get-sum-column">Get Sum of Column</a></li>
      <li><a href="/get-avg-column">Get Average of Column</a></li>
      <li><a href="/update-data">Update Table Data</a></li>
      <li><a href="/delete-data">Delete Data from Table</a></li>
      <li><a href="/custom-with-result">Get Result from Custom Query</a></li>
      <li><a href="/custom-with-row">Get Row from Custom Query</a></li>
      <li><a href="/custom-with-no-result">Execute Custom Query Without Resultset</a></li>
    </ol>
  `;
    res.send(html);
})

/*Insert Data in Database*/
app.get('/insert-data', function(req, res) {
    var insertData = {
        name: 'test user',
        email: 'abc@gmail.com',
        mobile: 8878220874
    };
    dbConfig.insertData(pool, 'users', insertData, function(err, response) {
        res.send(response);
    });
});

/*Get All Data With Specific Condition or Without Condition*/
app.get('/get-all-data', function(req, res) {
    var tableName = 'users';
    var condition = {
        name: 'test user',
        email: 'abc@gmail.com',
        mobile: 8878220874
    }; // left blank in case of no condition
    var fields = '*',
        orderBy = '',
        offset = 0,
        limit = 0,
        groupBy = '';

    dbConfig.getAll(pool, tableName, condition, fields, orderBy, offset, limit, groupBy, function(err, response) {
        res.send(response);
    });
});

/*Get Row Data With Specific Condition or Without Condition*/
app.get('/get-row-data', function(req, res) {
    var tableName = 'users';
    var condition = {
        name: 'test user',
        email: 'abc@gmail.com',
        mobile: 8878220874
    }; // left blank in case of no condition
    var fields = '*',
        orderBy = '',
        groupBy = '';

    dbConfig.getRow(pool, tableName, condition, fields, orderBy, groupBy, function(err, response) {
        res.send(response);
    });
});

/*Get Row Count With Specific Condition or Without Condition*/
app.get('/get-row-count', function(req, res) {
    var tableName = 'users';
    var condition = {
        name: 'test user',
        email: 'abc@gmail.com',
        mobile: 8878220874
    }; // left blank in case of no condition
    var fields = '*',
        groupBy = '';
    dbConfig.countRows(pool, tableName, condition, fields, groupBy, function(err, response) {
        res.send(response);
    });
});

/*Get Sum of any coulumn With Specific Condition or Without Condition*/
app.get('/get-sum-column', function(req, res) {
    var tableName = 'users';
    var condition = { mobile: 8878220874 }; // left blank in case of no condition
    var field = 'userID'; //can only be one and must be int type
    var groupBy = '';
    dbConfig.sumCloumn(pool, tableName, condition, field, groupBy, function(err, response) {
        res.send(response);
    });
});

/*Get Avg of any coulumn With Specific Condition or Without Condition*/
app.get('/get-avg-column', function(req, res) {
    var tableName = 'users';
    var condition = { mobile: 8878220874 }; // left blank in case of no condition
    var field = 'userID'; //can only be one and must be int type
    var groupBy = '';
    dbConfig.avgCloumn(pool, tableName, condition, field, groupBy, function(err, response) {
        res.send(response);
    });
});

/*Update data in table With Specific Condition or Without Condition*/
app.get('/update-data', function(req, res) {
    var tableName = 'users';
    var condition = { mobile: 8878220874 }; // left blank in case of no condition
    var dataToUpdate = {
        name: 'updated test user',
        email: 'abcUpdated@gmail.com',
    };
    dbConfig.updateData(pool, tableName, condition, dataToUpdate, function(err, response) {
        res.send(response);
    });
});

/*Delete data from table With Specific Condition or Without Condition*/
app.get('/delete-data', function(req, res) {
    var tableName = 'users';
    var condition = { mobile: 8878220874 }; // left blank in case of no condition
    dbConfig.deleteData(pool, tableName, condition, function(err, response) {
        res.send(response);
    });
});

/*Return Result in Response from a custom made query*/
app.get('/custom-with-result', function(req, res) {
    var query = 'select * from users where 1';
    dbConfig.queryWithResult(pool, query, function(err, response) {
        res.send(response);
    });
});

/*Return Row in Response from a custom made query*/
app.get('/custom-with-row', function(req, res) {
    var query = 'select * from users where userID=2';
    dbConfig.queryWithRow(pool, query, function(err, response) {
        res.send(response);
    });
});

/*Return True if query executed successfully !*/
app.get('/custom-with-no-result', function(req, res) {
    var query = 'update users set name="Sonu Bamniya" where userID=2';
    dbConfig.queryWithNoResultSet(pool, query, function(err, response) {
        res.send(response);
    });
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});
