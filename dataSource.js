const { DataSource } = require('typeorm');
const User = require('./entity/User');
const Category = require('./entity/Category');
const DailySchedule = require('./entity/Daily_Schedule');
const TimeUnits = require('./entity/Time_Units');
const FrequencyUnits = require('./entity/Frequency_Units');
const Activity = require('./entity/Activities');
const ActivityDaySchedule = require('./entity/Activity_Day_Schedule');
const UserActivityTracker = require('./entity/UserActivityTracker');

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [
    User,
    Category,
    DailySchedule,
    TimeUnits,
    FrequencyUnits,
    Activity,
    ActivityDaySchedule,
    UserActivityTracker,
  ],
  synchronize: true,
  logging: false,
});

const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
  }
};

module.exports = {
  AppDataSource,
  initializeDataSource,
};
