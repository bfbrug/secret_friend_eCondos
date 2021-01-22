import Sequelize, { Model } from 'sequelize';

class Friend extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        secret_name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Friend;
