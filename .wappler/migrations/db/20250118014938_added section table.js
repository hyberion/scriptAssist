
exports.up = function(knex) {
  return knex.schema
    .createTable('section', async function (table) {
      table.increments('id');
      table.string('sectionName');
      table.integer('contentID').unsigned();
      table.foreign('contentID').references('id').inTable('scriptContent');
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('section')
};
