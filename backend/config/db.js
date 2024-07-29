const {Sequelize} = require("sequelize")

const sequelize = new Sequelize({
    dialect : 'sqlite',
    storage : './data/test_db.sqlite',
    logging : false

})

module.exports = sequelize;

// dialect ------
// Purpose: Specifies the type of database you are connecting to.
// Example Values: 'mysql', 'postgres', 'sqlite', 'mssql', etc.
// Usage: It helps Sequelize understand how to communicate with the specific database management system (DBMS).

// Storage -------
// Purpose: Specifies the file path for SQLite databases.
// Usage: Only relevant for SQLite, indicating where the SQLite database file should be stored.

// Logging
// Purpose: Controls whether SQL queries are logged to the console. This can help in debugging or understanding the queries being executed.
// Options: Can be set to true, false, or a function. Setting it to false disables logging. Setting it to a function allows you to customize log output.