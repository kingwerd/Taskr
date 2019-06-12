const { db } = require('../../pgAdaptor');
const { UserType } = require('../types/userType');

exports.UserQueries = {
    user: async (parent, args, context, info) => {
        const query = `SELECT first_name, last_name, user_name, email FROM "users" WHERE id=${args.id}`;
        return await db.conn.one(query);
    },
    users: async (parent, args, context, info) => {
        const query = `SELECT first_name, last_name, user_name, email FROM "users"`;
        return await db.conn.many(query);
    }
}
