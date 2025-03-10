
exports.up = function(knex) {
  return knex.schema
    .table('slide', async function (table) {
      table.text('slideContent');
      table.json('customerData');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('slide', async function (table) {
      table.dropColumn('slideContent');
      table.dropColumn('customerData');
    })
};
