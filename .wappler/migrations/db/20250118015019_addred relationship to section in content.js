
exports.up = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.integer('sectionID').unsigned();
      table.foreign('sectionID').references('id').inTable('section');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.dropForeign('sectionID');
      table.dropColumn('sectionID');
    })
};
