
exports.up = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.integer('contentType').unsigned();
      table.foreign('contentType').references('id').inTable('scriptContentType');
      table.string('cssOverrideClass');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.dropForeign('contentType');
      table.dropColumn('contentType');
      table.dropColumn('cssOverrideClass');
    })
};
