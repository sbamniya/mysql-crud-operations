# mysql-crud-operations
An NPM package for mySQL operation.

There are total 11 methods are availible with this package.
Add module:
<pre>var pool = require('./db');</pre>
<pre>var dbConfig = require('./dbConfig');</pre>

# 1. Insert Data:
<p>Returns last inserted id</p>
<pre>
  dbConfig.insertData(pool, tableName, insertData, function(err, response) {
        res.send(response);
    });
</pre>

# 2. Get All Data

<p>Returns an array of objects</p>
<pre>
  dbConfig.getAll(pool, tableName, condition, fields, orderBy, offset, limit, groupBy, function(err, response) {
        res.send(response);
    });
</pre>
<strong>Note:-</strong> 
<pre>
condition ='' //in case of no condition or you want to get all data from table can be an object too.
fields ='field1, field2, field3' or '*' // 
orderBy = 'field desc' //blank in case don't you want to order
offset = 0 //any number
limit = 5 //any number
groupBy = 'field' //blank in case don't you want to group
</pre>

# 3. Get Row Data

<p>Returns an objects</p>
<pre>
  dbConfig.getRow(pool, tableName, condition, fields, orderBy, groupBy, function(err, response) {
        res.send(response);
    });
</pre>
<strong>Note:-</strong> 
<pre>
condition ='' //in case of no condition, can be an object too.
fields ='field1, field2, field3' or '*' // 
orderBy = 'field desc' //blank in case don't you want to order
groupBy = 'field' //blank in case don't you want to group
</pre>

# 4. Get Row Count

<p>Returns total count</p>
<pre>
  dbConfig.countRows(pool, tableName, condition, fields, groupBy, function(err, response) {
        res.send(response);
    });
</pre>
<strong>Note:-</strong> 
<pre>
condition ='' //in case of no condition, can be an object too.
fields ='field1, field2, field3' or '*' // 
groupBy = 'field' //blank in case don't you want to group
</pre>

# 5. Get Sum of Column

<p>Returns Sum of column</p>
<pre>
    dbConfig.sumCloumn(pool, tableName, condition, field, groupBy, function(err, response) {
        res.send(response);
    });
</pre>
<strong>Note:-</strong> 
<pre>
condition ='' //in case of no condition, can be an object too.
fields ='field' //can only be one and must be int type
groupBy = 'field' //blank in case don't you want to group
</pre>

# 6.Get Average of Column

<p>Returns Sum of column</p>
<pre>
    dbConfig.avgCloumn(pool, tableName, condition, field, groupBy, function(err, response) {
        res.send(response);
    });
</pre>
<strong>Note:-</strong> 
<pre>
condition ='' //in case of no condition, can be an object too.
fields ='field' //can only be one and must be int type
groupBy = 'field' //blank in case don't you want to group
</pre>

# 7. Update data in table

<p>Returns numbers of affetced rows</p>
<pre>
    dbConfig.updateData(pool, tableName, condition, dataToUpdate, function(err, response) {
        res.send(response);
    });
</pre>
<strong>Note:-</strong> 
<pre>
condition ='' //in case of no condition, can be an object too.
dataToUpdate ={fieldName1: value1, fieldName2: value2} //object with 
</pre>

# 8. Delete data from table

<p>Returns numbers of affetced rows</p>
<pre>
    dbConfig.deleteData(pool, tableName, condition, function(err, response) {
        res.send(response);
    });
</pre>
<strong>Note:-</strong> 
<pre>
condition ='' //in case of no condition, can be an object too.
</pre>

# 9. Get Result in Response from a custom made query

<p>Returns an array of objects</p>
<pre>
    dbConfig.queryWithResult(pool, query, function(err, response) {
        res.send(response);
    });
</pre>
<strong>Note:-</strong> 
<pre>
query ='' //a valid sql to get Results
</pre>

# 10. Get Row in Response from a custom made query

<p>Returns an objects</p>
<pre>
    dbConfig.queryWithRow(pool, query, function(err, response) {
        res.send(response);
    });
</pre>
<strong>Note:-</strong> 
<pre>
query ='' //a valid sql to get Rows
</pre>

# 11. Execute Custom Query Without Resultset

<p>Return True if query executed successfully</p>
<pre>
    dbConfig.queryWithNoResultSet(pool, query, function(err, response) {
        res.send(response);
    });
</pre>
<strong>Note:-</strong> 
<pre>
query ='' //a valid sql to get Rows
</pre>