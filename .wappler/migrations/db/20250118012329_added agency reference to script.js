
exports.up = function(knex) {
  return knex.schema
    .table('script', async function (table) {
      table.integer('agencyID').unsigned();
      table.foreign('agencyID').references('id').inTable('agency').onUpdate('CASCADE').onDelete('CASCADE');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('script', async function (table) {
      table.dropForeign('agencyID');
      table.dropColumn('agencyID');
    })
};
