const _config = {
  mongoDb: process.env.MONGODB_URI,
  dbName: process.env.DB_NAME,
  saltRounds: process.env.SALT_ROUNDS,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailReceiver: process.env.EMAIL_RECEIVER,
};

export const config = Object.freeze(_config);
