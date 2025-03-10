
exports.up = function(knex) {
  return knex.schema
    .createTable('marital_status_lookup', async function (table) {
      table.increments('id');
      table.string('martialStatus');
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('marital_status_lookup')
};
