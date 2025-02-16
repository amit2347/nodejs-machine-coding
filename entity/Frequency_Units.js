const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'FrequencyUnits',
  tableName: 'frequency_units',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    displayText: {
      type: 'varchar',
    },
  },
});
