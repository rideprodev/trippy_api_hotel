"use strict";

const table = "cms";
const listArray = [
  { page_key: "how_it_works", page_name: "How It Works" },
  { page_key: "terms_conditions", page_name: "Terms & Conditions" },
  { page_key: "privacy_policy", page_name: "Privacy Policy" },
];
const data = listArray.map((element, index) => ({
  page_key: element.page_key,
  page_name: element.page_name,
  created_at: new Date(),
  updated_at: new Date(),
}));
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(table, data, {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete(table, null, {}),
};
