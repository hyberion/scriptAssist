
exports.up = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.integer('formId').unsigned();
      table.foreign('formId').references('id').inTable('scriptForms');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('scriptContent', async function (table) {
      table.dropForeign('formId');
      table.dropColumn('formId');
    })
};
