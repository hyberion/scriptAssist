
exports.up = function(knex) {
  return knex.schema
    .createTable('agent', async function (table) {
      table.increments('id');
      table.string('firstName');
      table.string('lastName');
      table.string('email');
      table.string('password');
      table.string('phone');
      table.enum('status', ["active","inactive","suspended"]);
      table.timestamp('lastLogin');
      table.datetime('createdAt');
      table.timestamp('updatedAt');
      table.integer('agency').unsigned();
      table.foreign('agency').references('id').inTable('agency');
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('agent')
};
