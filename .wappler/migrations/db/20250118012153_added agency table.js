
exports.up = function(knex) {
  return knex.schema
    .createTable('agency', async function (table) {
      table.increments('id');
      table.string('name');
      table.string('address');
      table.string('city');
      table.string('state');
      table.string('zip');
      table.string('phone');
      table.string('email');
      table.string('website');
      table.string('industry');
      table.boolean('active');
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('agency')
};
