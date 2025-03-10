
exports.up = function(knex) {
  return knex.schema
    .createTable('stateLookup', async function (table) {
      table.increments('id');
      table.string('stateCode', 2).unique();
      table.string('stateName', 50).unique();
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('stateLookup')
};
