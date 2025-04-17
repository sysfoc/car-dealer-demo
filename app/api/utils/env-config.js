const _config = {
  mongoDb: process.env.MONGODB_URI,
  dbName: process.env.DB_NAME,
  saltRounds: process.env.SALT_ROUNDS,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
};

export const config = Object.freeze(_config);
