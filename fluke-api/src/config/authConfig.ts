export default {
  jwt: {
    secret: process.env?.TOKEN_SECRET || '',
    expiration: process.env?.TOKEN_EXPIRATION || '',
  },
};
