import jwt from 'jsonwebtoken';

import Utility from 'utility';
import config from 'config';

export default class AuthService {
    constructor(model, logger) {
        this.model = model;
        this.logger = logger;
    }

    /*
        Creates a new doc.
        Returns newly created doc on success.
        Returns null by default.
    */

    async create(username, email, password) {
        try {
            password = await Utility.auth.setPassword(password);

            const doc = await this.model.create({
                username: username,
                email: email,
                password: password
            });

            if (doc) return Utility.modifiers.user(doc);

            return null;
        } catch (error) {
            this.logger.debug(error.stack);
            this.logger.error(error.message);
            return null;
        }
    }

    /*
        Updates doc by find query.
        Returns updated doc on success.
        Returns null by default.
    */

    async update(query, updateQuery) {
        try {
            const updated = await this.model.findOneAndUpdate(query, updateQuery, {
                new: true
            });
            if (updated) return Utility.modifiers.user(updated);
            return null;
        } catch (error) {
            this.logger.debug(error.stack);
            this.logger.error(error.message);
            return null;
        }
    }

    /*
        Updates docs by find query.
        Returns true on success.
        Returns null by default.
    */

    async updateMany(query, updateQuery) {
        try {
            const updated = await this.model.updateMany(query, updateQuery);
            if (updated) return true;
            return null;
        } catch (error) {
            this.logger.debug(error.stack);
            this.logger.error(error.message);
            return null;
        }
    }

    /*
        Fetches doc by query, returns specified fields.
        Returns doc with specified fields on success.
        Returns null by default.
        Returns error upon error.
    */

    async fetch(query, fields) {
        try {
            const user = await this.model.findOne(query).select(fields);
            if (user) return Utility.modifiers.user(user);
            return null;
        } catch (error) {
            this.logger.debug(error.stack);
            this.logger.error(error.message);
            return error;
        }
    }

    /*
        Returns array if documents are found.
        Returns empty array if no documents are found.
        Returns null if query fails.
    */

    async get(query, limit, sort, fields) {
        try {
            const docs = await this.model.find(query).limit(limit).sort(sort).select(fields).lean();

            const users = docs.map((doc) => Utility.modifiers.user(doc));

            return users;
        } catch (error) {
            this.logger.debug(error.stack);
            this.logger.error(error.message);
            return null;
        }
    }

    /*
        Deletes doc by query.
        Returns true if doc is deleted.
        Returns null by default.
    */

    async delete(query) {
        try {
            const deleted = await this.model.deleteOne(query);
            if (deleted) return true;
            return null;
        } catch (error) {
            this.logger.debug(error.stack);
            this.logger.error(error.message);
            return null;
        }
    }

    /*
        Deletes docs by find query.
        Returns true on success.
        Returns null by default.
    */

    async deleteMany(query) {
        try {
            const deleted = await this.model.deleteMany(query);
            if (deleted) return true;
            return null;
        } catch (error) {
            this.logger.debug(error.stack);
            this.logger.error(error.message);
            return null;
        }
    }

    /*
       Returns jwt token.
    */

    generateJwt(user) {
        const token = jwt.sign(
            {
                id: user.id
            },
            config.app.jwtSecret,
            { expiresIn: config.app.jwtExpiry }
        );

        return { token };
    }
}
