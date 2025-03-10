
exports.up = function(knex) {
  return knex.schema
    .table('section', async function (table) {
      table.timestamp('createdAt');
      table.timestamp('updatedAt');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('section', async function (table) {
      table.dropColumn('createdAt');
      table.dropColumn('updatedAt');
    })
};
