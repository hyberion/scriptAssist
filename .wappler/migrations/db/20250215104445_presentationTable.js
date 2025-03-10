
exports.up = function(knex) {
  return knex.schema
    .createTable('presentations', async function (table) {
      table.increments('id');
      table.integer('scriptId').unsigned();
      table.foreign('scriptId').references('id').inTable('script');
      table.timestamp('createdAt');
      table.timestamp('updatedAt');
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('presentations')
};
