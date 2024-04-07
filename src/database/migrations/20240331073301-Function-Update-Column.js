'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW."updatedAt" = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql';`)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS update_updated_at_column;`)
  },
}
