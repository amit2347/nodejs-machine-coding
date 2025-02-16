const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Category',
  tableName: 'category',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
  indices: [
    {
      name: 'IDX_ID_CATEGORY_NAME',
      columns: [ 'id','name'], 
    }
  ],
});
