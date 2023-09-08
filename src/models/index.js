import fs from "fs";
import Sequelize from "sequelize";
import path from "path";
import config from "../config";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const dbConfig = config.database.mysql;

const db = {};
let sequelize;
sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  timezone: dbConfig.timezone,
  logging: false,
  dialect: "mysql",
});

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach((file) => {
    //const model = sequelize.import(path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  if (db[modelName].seedData) {
    db[modelName].seedData(config);
  }
  if (db[modelName].loadScopes) {
    db[modelName].loadScopes(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
