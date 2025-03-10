
exports.up = function(knex) {
  return knex.schema
    .createTable('scriptContentType', async function (table) {
      table.increments('id');
      table.string('typeName', 50);
      table.string('defaultClass', 50);
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('scriptContentType')
};
