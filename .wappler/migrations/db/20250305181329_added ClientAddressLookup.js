
exports.up = function(knex) {
  return knex.schema
    .createTable('client_address_lookup', async function (table) {
      table.increments('id');
      table.integer('clientID').unsigned();
      table.foreign('clientID').references('id').inTable('client');
      table.integer('addressID').unsigned();
      table.foreign('addressID').references('id').inTable('address');
      table.integer('addressType').unsigned();
      table.foreign('addressType').references('id').inTable('address_type_lookup');
      table.boolean('isPrimary').defaultTo(1);
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('client_address_lookup')
};
