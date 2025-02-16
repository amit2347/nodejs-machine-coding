const { AppDataSource } = require('../dataSource'); 
const User = require('../entity/User');
const ActivityDaySchedule = require('../entity/Activity_Day_Schedule');
exports.getScheduleDetails =  async (req, res, next) => {
    try {
      const dayNo = req.query.dayNo;
      const userId = req.userContext.userId;
      if (!dayNo) {
        res.status(400).send({
          status: 400,
          message: 'Day number is required.',
        });
        return;
      }
      if (!userId) {
        res.status(400).send({
          status: 400,
          message: 'User Id is required.',
        });
        return;
      }
      const userExistence = await AppDataSource.getRepository(User).findOne({
        where : {
          id : req.userContext.userId
        }
      })
      if(!userExistence){
        return res.status(404).send({
          message : 'User details not found'
        })
      }
      const activityDayScheduleRepository = AppDataSource.getRepository(ActivityDaySchedule);
  
      const resultFromDB = await activityDayScheduleRepository
        .createQueryBuilder('ads')
        .select('a.name as name, uat.status, a.*, freq_unit.displayText, tu.name as timeUnits')
        .leftJoin('activity', 'a', 'a.id = ads.activity')
        .leftJoin('user_activity_tracker', 'uat', 'uat.activity_day_schedule_id = ads.id')
        .leftJoin('time_units', 'tu', 'tu.id = a.duration_unit_id')
        .leftJoin('frequency_units', 'freq_unit', 'freq_unit.id = a.frequency_unit_id')
        .where('ads.day = :number', { number: dayNo })
        .andWhere('uat.userId = :userId', { userId: userId })
        .execute();
      
      if (resultFromDB.length > 0) {
        const responseforClient = res2.map((item) => {
          const frequency = item.frequency_count + 'x' + item.displayText;
          let duration = item.duration_value + ' ' + item.timeUnits;
          if(duration === '9999 hours'){
            duration = 'Maximise'
          }
          return {
            name: item.name,
            status: item.status,
            frequency: frequency,
            duration: duration,
          };
        });
        res.status(200).send({
          message : 'Results fetched successfully',
          result : responseforClient
        });
        return;
      }
      return res.status(200).send({
        message : 'No Results Found'
      })
    } catch (error) {
      console.error(error);
      res.send({ error: 'Something went wrong' });
    }
  }