
exports.up = function (knex) {
  return knex.schema
    .createTable('scriptForms', async function (table) {
      table.increments('id');
      table.string('formName');
      table.text('formHTML');
      table.boolean('activeForm').defaultTo(0);
      table.timestamp('createdAt');
    })

};

exports.down = function (knex) {
  return knex.schema
    .dropTable('scriptForms')
};
