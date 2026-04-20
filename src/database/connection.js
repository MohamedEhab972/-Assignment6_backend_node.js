import mysql2 from "mysql2";

const dataBaseConnection = () => {
  return mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shop",
  });
};

const connection = dataBaseConnection();

export default connection;
