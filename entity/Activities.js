const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Activity',
  tableName: 'activity',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 200,
    },
    frequency_count: {
      type: 'int',
      nullable: true,
    },
    duration_value: {
      type: 'int',
      nullable: true,
    },
  },
  relations: {
    category: {
      type: 'many-to-one',
      target: 'Category',
      joinColumn: {
        name: 'category_id',
      },
    },
    frequency_unit: {
      type: 'many-to-one',
      target: 'frequency_units',
      joinColumn: {
        name: 'frequency_unit_id', // Update the foreign key name here
      },
    },
    duration_unit: {
      type: 'many-to-one',
      target: 'time_units',
      joinColumn: {
        name: 'duration_unit_id',
      },
    },
  },
  indices: [
    {
      name: 'IDX_ID_ACTIVITY_NAME',
      columns: [ 'id','name'], 
    }
  ],
});
