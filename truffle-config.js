const path = require("path");

module.exports = {
  migrations_directory: "./client/src/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  }
};
