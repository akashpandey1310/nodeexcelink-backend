module.exports = {
    HOST: "database-1.ci5o8gpnlfmy.ap-south-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "Akashamsreport1",
    DB: "ams",
    PORT: "3306",
    dialect: "mysql", 
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
    }
};
