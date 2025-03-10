
exports.up = function(knex) {
  return knex.schema
    .table('section', async function (table) {
      table.dropForeign('contentID');
      table.dropColumn('contentID');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('section', async function (table) {
      table.integer('contentID').unsigned();
      table.foreign('contentID').references('id').inTable('scriptContent');
    })
};
