'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserTokenMaster', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      expiredOn: {
        type: Sequelize.DATE,
        allowNull: true,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      tokenType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    })

    // Add trigger for `updatedAt`
    await queryInterface.sequelize.query(`
    CREATE TRIGGER update_updated_at_trigger
    BEFORE UPDATE ON "UserTokenMaster"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserTokenMaster')
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS update_updated_at_trigger ON "UserTokenMaster";`)
  },
}
