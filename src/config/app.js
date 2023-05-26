export const env = process.env.NODE_ENV;

export const url = process.env.HOST + ":" + process.env.PORT;

export const port = parseInt(process.env.PORT, 10);

export const prefix = process.env.PREFIX;

export const jwtSecret = process.env.JWT_SECRET;

export const jwtExpiry = process.env.JWT_EXPIRY;
