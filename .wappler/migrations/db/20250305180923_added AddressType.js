
exports.up = function(knex) {
  return knex.schema
    .createTable('address_type_lookup', async function (table) {
      table.increments('id');
      table.string('addressType');
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('address_type_lookup')
};
