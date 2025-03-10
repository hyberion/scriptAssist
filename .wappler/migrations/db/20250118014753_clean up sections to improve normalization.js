
exports.up = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.dropColumn('section');
      table.dropColumn('sectionSortOrder');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.string('section', 255);
      table.integer('sectionSortOrder');
    })
};
