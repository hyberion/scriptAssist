
exports.up = function (knex) {
  return knex.schema
    .createTable('scriptForms', async function (table) {
      table.increments('id');
      table.string('formName');
      table.text('formHTML');
      table.boolean('formActive');
      table.timestamp('createdAt');
    })

};
