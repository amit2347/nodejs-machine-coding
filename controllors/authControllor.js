const jwt = require("jsonwebtoken");
const { hashPassword, validatePassword } = require("../helper/authFunctions");
const { AppDataSource } = require("../dataSource");
const User = require("../entity/User");
const ActivityDaySchedule = require("../entity/Activity_Day_Schedule");
const UserActivityTracker = require("../entity/UserActivityTracker");
const signUp = async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const activityDayScheduleRepository =
      AppDataSource.getRepository(ActivityDaySchedule);
    const UserActivityTrackerRepository =
      AppDataSource.getRepository(UserActivityTracker);
    const { emailId, firstName, lastName, password } = req.body;
    if (!emailId || !password || !firstName) {
      return res.status(400).send({
        message: "Parameters are required",
      });
    }
    const { hash, salt } = hashPassword(password);
    const userExistence = await AppDataSource.getRepository(User).findOne({
      where: {
        email: emailId,
      },
    });
    if (userExistence) {
      return res.status(400).send({
        message: "User already Exists",
      });
    }
    const userDetails = await userRepository.save({
      firstName,
      lastName,
      password: hash,
      salt,
      email: emailId,
    });

    // code to automatically enroll it for existing plan
    const activityDayScheduleDetails =
      await activityDayScheduleRepository.find();
    console.log("activityDayScheduleDetails--->", activityDayScheduleDetails);
    const dataToSaveInUserActivityTracker = activityDayScheduleDetails.map(
      (item) => {
        return {
          user: userDetails, // Reference to the User entity
          status: false,
          activityDaySchedule: item, // Reference to the ActivityDaySchedule entity
        };
      }
    );

    await UserActivityTrackerRepository.save(dataToSaveInUserActivityTracker);

    return res.status(200).send({
      message: "User onboarded successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: "The server encountered an error",
    });
  }
};

const login = async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      res.status(400).send({
        code: 400,
        message: "Parameters are required",
      });
      return;
    }
    const userExistence = await userRepository.findOne({
      where: {
        email: emailId,
      },
    });
    if (!userExistence) {
      res.status(404).send({
        message: "User not found",
      });
      return;
    }
    const isPasswordCorrect = validatePassword(
      password,
      userExistence?.salt,
      userExistence?.password
    );
    if (!isPasswordCorrect) {
      res.status(400).send({
        message: "Incorrect Password or Expired Token",
      });
      return;
    }
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60, //expires in 1 hour
        userId: userExistence?.id,
      },
      process.env.JWTSECRETKEY
    );
    res.status(200).send({
      message: "Valid User",
      token,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: "The server encountered an error",
    });
    return;
  }
};

module.exports = {
  signUp,
  login,
};
