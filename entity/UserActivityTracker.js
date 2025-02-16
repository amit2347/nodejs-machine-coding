const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'UserActivityTracker',
  tableName: 'user_activity_tracker',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    userId: {
      type: 'int',
    },
    status: {
      type: 'boolean',
    },
  },
  uniques: [
    {
      columns: ['activityDaySchedule', 'user', 'status'],
    },
  ],
  relations: {
    activityDaySchedule: {
      type: 'many-to-one',
      target: 'ActivityDaySchedule',
      joinColumn: {
        name: 'activity_day_schedule_id',
      },
    },
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'userId',
      },
    },
  },
  indices: [
    {
      name: 'IDX_STATUS_TRACKER',
      columns: [ 'activityDaySchedule','userId' , 'status'], 
    }
  ],
});
