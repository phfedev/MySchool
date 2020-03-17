const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Course extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        tags: Sequelize.STRING,
      },
      { sequelize }
    );
  }
}

module.exports = Course;
