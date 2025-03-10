
exports.up = function(knex) {
  return knex.schema
    .table('section', async function (table) {
      table.integer('sectionSortOrder');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('section', async function (table) {
      table.dropColumn('sectionSortOrder');
    })
};
