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
        switch(error.errno) {
          case 1062:
            const [, value, key] = error.sqlMessage.match(/^.+'(.+)'.+'.+\.(.+)_.+'$/);
            return reject(`The ${key} '${value}' is already in use`);
          default:
            return reject(error.sqlMessage)
        }
        return reject(error);
      }
      return resolve(result);
    })
  });
}

const insert = async function(tableName, data) {
  try {
    const result = await query("INSERT INTO ??(??) VALUES (?)", [tableName, Object.keys(data), Object.values(data)]);
    return {inserted:true, insertedId:result.insertId};
  } catch(error) {
    return {inserted:false, message:error};
  }
}

module.exports = {
  query,
  insert
};