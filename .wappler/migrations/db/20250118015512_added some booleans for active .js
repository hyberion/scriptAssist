
exports.up = function(knex) {
  return knex.schema
    .table('script', async function (table) {
      table.boolean('active').defaultTo(1);
    })
    .table('section', async function (table) {
      table.boolean('active');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('section', async function (table) {
      table.dropColumn('active');
    })
    .table('script', async function (table) {
      table.dropColumn('active');
    })
};
