
exports.up = function(knex) {
  return knex.schema
    .createTable('client_relationships', async function (table) {
      table.increments('id');
      table.integer('client_id_1').unsigned();
      table.foreign('client_id_1').references('id').inTable('client');
      table.integer('client_id_2').unsigned();
      table.foreign('client_id_2').references('id').inTable('client');
      table.integer('relationship_type_id').unsigned();
      table.foreign('relationship_type_id').references('id').inTable('relationship_type_lookup');
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('client_relationships')
};
