const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'TimeUnits',
  tableName: 'time_units',
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
});
