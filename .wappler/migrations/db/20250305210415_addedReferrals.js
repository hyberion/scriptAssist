
exports.up = function(knex) {
  return knex.schema
    .createTable('referrals', async function (table) {
      table.increments('id');
      table.integer('clientId').unsigned();
      table.foreign('clientId').references('id').inTable('client');
      table.string('firstName');
      table.string('lastName');
      table.integer('relationshipType').unsigned();
      table.foreign('relationshipType').references('id').inTable('relationship_type_lookup');
      table.string('phone');
      table.string('email');
      table.timestamp('createdAt');
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('referrals')
};
