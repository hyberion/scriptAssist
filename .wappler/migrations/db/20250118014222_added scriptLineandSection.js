
exports.up = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.text('scriptLine');
      table.string('section');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.dropColumn('scriptLine');
      table.dropColumn('section');
    })
};
