
exports.up = function(knex) {
  return knex.schema
    .table('script', async function (table) {
      table.integer('version').defaultTo(1);
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('script', async function (table) {
      table.dropColumn('version');
    })
};
