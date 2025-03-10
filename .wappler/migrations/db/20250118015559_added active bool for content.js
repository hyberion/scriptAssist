
exports.up = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.boolean('active');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.dropColumn('active');
    })
};
