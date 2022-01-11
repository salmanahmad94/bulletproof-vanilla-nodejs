import { jobs } from "declarations";

export default class SchedulerService {
  constructor(agenda) {
    this.scheduler = agenda;
  }

  /*
        Auth
    */

  updateUserLastLogin = (user) => {
    this.scheduler.now(jobs.auth.UPDATE_USER_LAST_LOGIN, {
      user,
      maxRetries: 5,
    });
  };
}
