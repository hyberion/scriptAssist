
exports.up = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.integer('scriptID').unsigned();
      table.foreign('scriptID').references('id').inTable('script').onUpdate('CASCADE').onDelete('CASCADE');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.dropForeign('scriptID');
      table.dropColumn('scriptID');
    })
};
