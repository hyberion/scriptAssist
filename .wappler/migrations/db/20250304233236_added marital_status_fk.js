
exports.up = function(knex) {
  return knex.schema
    .table('client', async function (table) {
      table.integer('marital_status').unsigned();
      table.foreign('marital_status').references('id').inTable('marital_status_lookup');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('client', async function (table) {
      table.dropForeign('marital_status');
      table.dropColumn('marital_status');
    })
};
