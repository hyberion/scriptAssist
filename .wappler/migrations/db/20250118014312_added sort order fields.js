
exports.up = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.integer('lineSortOrder');
      table.integer('sectionSortOrder');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.dropColumn('lineSortOrder');
      table.dropColumn('sectionSortOrder');
    })
};
