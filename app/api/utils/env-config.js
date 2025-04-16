const _config = {
  mongoDb: process.env.MONGODB_URI,
  dbName: process.env.DB_NAME,
  saltRounds: process.env.SALT_ROUNDS,
};

export const config = Object.freeze(_config);
