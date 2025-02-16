const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'DailySchedule',
  tableName: 'daily_schedule',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    day_number: {
      type: 'int',
    },
  },
  uniques: [
    {
      columns: ['activity', 'day_number'],
    },
  ],
  relations: {
    activity: {
      type: 'many-to-one',
      target: 'Activity',
      joinColumn: {
        name: 'activity_id',
      },
    },
  },
  indices: [
    {
      name: 'IDX_ID_DAY_NUMBER',
      columns: [ 'id','day_number'], 
    }
  ],
});
