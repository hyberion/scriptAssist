
exports.up = function(knex) {
  return knex.schema
    .table('slide', async function (table) {
      table.string('slideType', 50);
      table.timestamp('createdAt');
      table.timestamp('updatedAt');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('slide', async function (table) {
      table.dropColumn('slideType');
      table.dropColumn('createdAt');
      table.dropColumn('updatedAt');
    })
};
