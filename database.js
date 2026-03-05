const prismaClient = require('@prisma/Client');

const database = new prismaClient();

module.exports = {
    database,
}

