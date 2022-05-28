const mysql = require("mysql2");
const {
  dbHost,
  dbPort,
  dbUser,
  dbPassword,
  dbName
} = require("../config");

const connection = mysql.createPool({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  dateStrings: true
});

const query = function(sql, data) {
  return new Promise((resolve, reject) => {
    connection.query(sql, data, (error, result) => {
      if(error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    })
  });
}

const insert = async function(tableName, data) {
  try {
    const result = await query("INSERT INTO ??(??) VALUES (?)", [tableName, Object.keys(data), Object.values(data)]);
    return {inserted:true, result};
  } catch(error) {
    return {inserted:false};
  }
}

module.exports = {
  query,
  insert
};