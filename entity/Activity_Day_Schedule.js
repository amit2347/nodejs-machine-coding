const { EntitySchema } = require('typeorm');
const Activity = require('./Activities');

module.exports = new EntitySchema({
  name: 'ActivityDaySchedule',
  tableName: 'activity_day_schedule',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    day: {
      type: 'int',
    },
    month: {
      type: 'int',
    },
  },
  uniques: [
    {
      columns: ['activity', 'day', 'month'],
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
});
