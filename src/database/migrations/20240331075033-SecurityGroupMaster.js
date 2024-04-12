'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SecurityGroupMaster', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
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
    BEFORE UPDATE ON "SecurityGroupMaster"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SecurityGroupMaster')
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS update_updated_at_trigger ON "SecurityGroupMaster";`)
  },
}
