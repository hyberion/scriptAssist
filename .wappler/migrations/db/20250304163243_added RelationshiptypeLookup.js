
exports.up = function(knex) {
  return knex.schema
    .createTable('relationship_type_lookup', async function (table) {
      table.increments('id');
      table.string('relationship_Type');
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('relationship_type_lookup')
};
