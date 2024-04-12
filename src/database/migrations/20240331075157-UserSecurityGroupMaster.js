'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserSecurityGroupMaster', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'UserMaster', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      securityGroupId: {
        type: Sequelize.INTEGER,
        references: { model: 'SecurityGroupMaster', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    BEFORE UPDATE ON "UserSecurityGroupMaster"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserSecurityGroupMaster')
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS update_updated_at_trigger ON "UserSecurityGroupMaster";`)
  },
}
