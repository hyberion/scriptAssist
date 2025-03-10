
exports.up = function(knex) {
  return knex.schema
    .createTable('client', async function (table) {
      table.increments('id');
      table.string('firstName');
      table.string('lastName');
      table.date('dob');
      table.string('phone');
      table.string('email');
      table.timestamp('created_at');
      table.timestamp('updated_at');
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('client')
};
