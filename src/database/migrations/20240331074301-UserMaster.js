'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserMaster', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
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
    BEFORE UPDATE ON "UserMaster"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserMaster')
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS update_updated_at_trigger ON "UserMaster";`)
  },
}
