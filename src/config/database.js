module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'secret_friend',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
