/*Check for last element*/
function isLast(obj, ele) {
    var keys = Object.keys(obj);
    var last = keys[keys.length - 1];

    return last == ele;
}
/*Check for first element*/
function isFirst(obj, ele) {
    var keys = Object.keys(obj);
    var first = keys[0];

    return first == ele;
}
/*Insert Function*/
function insert(pool, tableName, data, callback) {

    var fields = '';
    var values = '';
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            fields += (isLast(data, key)) ? key : key + ',';
            var temp = (typeof data[key] == 'number') ? data[key] : '"' + data[key] + '"';
            values += (isLast(data, key)) ? temp : temp + ',';
        }
    }

    var _Query = 'insert into ' + tableName + '(' + fields + ') values(' + values + ')';
    pool.query(_Query, function(err, rows, fields) {
        if (err) {
            callback(err);
        } else {
            var response = {
                lastInsertId: rows.insertId
            }

            callback(0, response);
        }
    })
}

/*Get Data With Result*/
function getAllData(pool, tableName, condition = '', fields = '*', orderBy = '', offset = 0, limit = 0, groupBy = '', callback) {
    var field = (fields == '') ? '*' : fields;
    var where = '',
        orderByVar = '',
        limitVar = '',
        groupByVar = '';

    if (condition != '' && typeof condition != 'object') {

        where += ' where ' + condition;

    } else if (typeof condition == 'object') {

        where += ' where '
        for (var key in condition) {
            if (condition.hasOwnProperty(key)) {
                if (isFirst(condition, key)) {
                    where += key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                } else {
                    where += ' and ' + key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                }
            }
        }
    }

    if (orderBy != '') {
        orderByVar = ' order by ' + orderBy;
    }

    if (groupBy != '') {
        groupByVar = ' group by ' + groupBy;
    }

    if (limit != 0 && typeof limit == 'number') {
        limitVar = ' limit ' + offset + ', ' + limit;
    }

    var _Query = 'select ' + field + ' from ' + tableName + '' + where + '' + groupByVar + '' + orderByVar + '' + limitVar;

    pool.query(_Query, function(err, rows, fields) {
        if (err) {
            callback(err);
        } else {
            callback(0, rows);
        }
    });
}

/*Get Data With Row*/
function getRowData(pool, tableName, condition = '', fields = '*', orderBy = '', groupBy = '', callback) {
    var field = (fields == '') ? '*' : fields;
    var where = '',
        orderByVar = '',
        limitVar = '',
        groupByVar = '';

    if (condition != '' && typeof condition != 'object') {

        where += ' where ' + condition;

    } else if (typeof condition == 'object') {

        where += ' where '
        for (var key in condition) {
            if (condition.hasOwnProperty(key)) {
                if (isFirst(condition, key)) {
                    where += key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                } else {
                    where += ' and ' + key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                }
            }
        }
    }

    if (orderBy != '') {
        orderByVar = ' order by ' + orderBy;
    }

    if (groupBy != '') {
        groupByVar = ' group by ' + groupBy;
    }

    var _Query = 'select ' + field + ' from ' + tableName + '' + where + '' + groupByVar + '' + orderByVar;

    pool.query(_Query, function(err, rows, fields) {
        if (err) {
            callback(err);
        } else {
            if (rows.length == 0) {
                callback(0, {});
            } else {
                callback(0, rows[0]);
            }
        }
    });
}

/*Count Rows*/
function getRowsCount(pool, tableName, condition = '', fields = '*', groupBy = '', callback) {
    var field = (fields == '') ? '*' : fields;
    var where = '',
        orderByVar = '',
        limitVar = '',
        groupByVar = '';

    if (condition != '' && typeof condition != 'object') {

        where += ' where ' + condition;

    } else if (typeof condition == 'object') {

        where += ' where '
        for (var key in condition) {
            if (condition.hasOwnProperty(key)) {
                if (isFirst(condition, key)) {
                    where += key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                } else {
                    where += ' and ' + key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                }
            }
        }
    }

    if (groupBy != '') {
        groupByVar = ' group by ' + groupBy;
    }

    var _Query = 'select ' + field + ' from ' + tableName + '' + where + '' + groupByVar + '' + orderByVar;

    pool.query(_Query, function(err, rows, fields) {
        if (err) {
            callback(err);
        } else {
            var response = {
                length: rows.length
            }
            callback(0, response);
        }
    });
}
/*Sum of Column*/
function getSumOfCoulmn(pool, tableName, condition = '', fields, groupBy = '', callback) {
    var field = (fields == '') ? '*' : fields;
    var where = '',
        orderByVar = '',
        limitVar = '',
        groupByVar = '';

    if (condition != '' && typeof condition != 'object') {

        where += ' where ' + condition;

    } else if (typeof condition == 'object') {

        where += ' where '
        for (var key in condition) {
            if (condition.hasOwnProperty(key)) {
                if (isFirst(condition, key)) {
                    where += key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                } else {
                    where += ' and ' + key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                }
            }
        }
    }

    if (groupBy != '') {
        groupByVar = ' group by ' + groupBy;
    }

    var _Query = 'select sum(' + field + ') as res from ' + tableName + '' + where + '' + groupByVar + '' + orderByVar;

    pool.query(_Query, function(err, rows, fields) {
        if (err) {
            callback(err);
        } else {
            var response = {
                sum: (rows[0].res == null) ? 0 : rows[0].res
            }
            callback(0, response);
        }
    });
}
/*Avg of Column*/
function getAvgOfCoulmn(pool, tableName, condition = '', fields, groupBy = '', callback) {
    var field = (fields == '') ? '*' : fields;
    var where = '',
        orderByVar = '',
        limitVar = '',
        groupByVar = '';

    if (condition != '' && typeof condition != 'object') {

        where += ' where ' + condition;

    } else if (typeof condition == 'object') {

        where += ' where '
        for (var key in condition) {
            if (condition.hasOwnProperty(key)) {
                if (isFirst(condition, key)) {
                    where += key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                } else {
                    where += ' and ' + key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                }
            }
        }
    }

    if (groupBy != '') {
        groupByVar = ' group by ' + groupBy;
    }

    var _Query = 'select Avg(' + field + ') as res from ' + tableName + '' + where + '' + groupByVar + '' + orderByVar;

    pool.query(_Query, function(err, rows, fields) {
        if (err) {
            callback(err);
        } else {
            var response = {
                avg: (rows[0].res == null) ? 0 : rows[0].res
            }
            callback(0, response);
        }
    });
}

/*Update table with or without conidiition*/
function updateData(pool, tableName, condition = '', data, callback) {
    var update = '',
        where = '';
    if (condition != '' && typeof condition != 'object') {

        where += ' where ' + condition;

    } else if (typeof condition == 'object') {

        where += ' where '
        for (var key in condition) {
            if (condition.hasOwnProperty(key)) {
                if (isFirst(condition, key)) {
                    where += key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                } else {
                    where += ' and ' + key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                }
            }
        }
    }

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            update += key + ' = ';
            var temp = (typeof data[key] == 'number') ? data[key] : '"' + data[key] + '"';
            update += (isLast(data, key)) ? temp : temp + ',';
        }
    }
    var _Query = 'update ' + tableName + ' set ' + update + ' ' + where;

    pool.query(_Query, function(err, rows, fields) {
        if (err) {
            callback(err);
        } else {
            var response = {
                affectedRows: rows.affectedRows
            }
            callback(0, response);
        }
    });
}

/*Delete Data from Database*/
function deleteData(pool, tableName, condition = '', callback) {
    var update = '',
        where = '';
    if (condition != '' && typeof condition != 'object') {

        where += ' where ' + condition;

    } else if (typeof condition == 'object') {

        where += ' where '
        for (var key in condition) {
            if (condition.hasOwnProperty(key)) {
                if (isFirst(condition, key)) {
                    where += key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                } else {
                    where += ' and ' + key + '=';
                    var temp = (typeof condition[key] == 'number') ? condition[key] : '"' + condition[key] + '"';

                    where += temp;
                }
            }
        }
    }

    var _Query = 'delete from ' + tableName + ' ' + where;

    pool.query(_Query, function(err, rows, fields) {
        if (err) {
            callback(err);
        } else {
            var response = {
                affectedRows: rows.affectedRows
            }
            callback(0, response);
        }
    });
}

/*Return Result in Response from a custom made query*/
function queryWithResult(pool, _Query, callback) {
	pool.query(_Query, function(err, rows, fields) {
        if (err) {
            callback(err);
        } else {
            callback(0, rows);
            
        }
    });
}

/*Return Row in Response from a custom made query*/
function queryWithRow(pool, _Query, callback) {
	pool.query(_Query, function(err, rows, fields) {
        if (err) {
            callback(err);
        } else {
            if (rows.length == 0) {
                callback(0, {});
            } else {
                callback(0, rows[0]);
            }
        }
    });
}

/*Return True if query executed successfully !*/
function queryWithNoResultSet(pool, _Query, callback) {
	pool.query(_Query, function(err, rows, fields) {
        if (err) {
            callback(err);
        } else {
            callback(0, true);
        }
    });
}

var data = {
    insertData: insert,
    getAll: getAllData,
    getRow: getRowData,
    countRows: getRowsCount,
    sumCloumn: getSumOfCoulmn,
    avgCloumn: getAvgOfCoulmn,
    updateData: updateData,
    deleteData : deleteData,
    queryWithResult: queryWithResult,
    queryWithRow: queryWithRow,
    queryWithNoResultSet: queryWithNoResultSet
}

module.exports = data;
