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

function queryPromise(sql, data) {
  return new Promise((resolve, reject) => {
    connection.query(sql, data, (error, result) => {
      if(error) {
        // TODO: Remove this console.log when making the presentation
        console.log(error);
        let message = "";
        switch(error.errno) {
          case 1062:
            const [, value, key] = error.sqlMessage.match(/^.+'(.+)'.+'.+\.(.+)_.+'$/);
            message = `The ${key} '${value}' is already in use`;
            break;
          default:
            message = error.sqlMessage;
        }

        return reject({message});
      }
      return resolve(result);
    })
  });
}

async function query(sql, data) {
  try {
    const result = await queryPromise(sql, data);
    return {
      success: true,
      result
    };
  } catch(error) {
    return {
      success: false,
      message: error.message
    };
  }
}

const insert = async function(tableName, data) {
  const result = await query(
    "INSERT INTO ??(??) VALUES (?)", 
    [tableName, Object.keys(data), Object.values(data)]
  );
  return result;
}

module.exports = {
  query,
  insert
};