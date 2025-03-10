
exports.up = function(knex) {
  return knex.schema
    .createTable('address', async function (table) {
      table.increments('id');
      table.string('streetAddress');
      table.string('aptSuite');
      table.string('city');
      table.integer('state');
      table.string('zipCode', 20);
      table.timestamp('createdAt');
      table.timestamp('lastUpdated');
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('address')
};
