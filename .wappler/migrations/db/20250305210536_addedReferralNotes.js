
exports.up = function(knex) {
  return knex.schema
    .table('referrals', async function (table) {
      table.text('notes');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('referrals', async function (table) {
      table.dropColumn('notes');
    })
};
