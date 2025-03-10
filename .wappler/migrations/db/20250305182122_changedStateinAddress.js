
exports.up = function(knex) {
  return knex.schema
    .table('address', async function (table) {
      table.integer('state').alter().unsigned();
      table.foreign('state').references('id').inTable('stateLookup');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('address', async function (table) {
      await table.dropForeign('state');
      table.integer('state').alter();
    })
};
