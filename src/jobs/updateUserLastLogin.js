import Container from "typedi";

import { jobs } from "declarations";

export default (agenda) => {
  const options = {
    concurrency: 5, // Maximum number of jobs of this type that can be running at a given time.
    lockLimit: 0, // Maximum number of jobs that can be locked at any given time. Default is 0 for no max.
    lockLifetime: null, // Timeout time in miliseconds.
    priority: "normal", // One of priorities: lowest|low|normal|high|highest|number.
  };

  agenda.define(
    jobs.auth.UPDATE_USER_LAST_LOGIN,
    options,
    async (job, done) => {
      const AuthService = Container.get("AuthService");
      const Logger = Container.get("Logger");

      let user = job.attrs.data.user;

      // A query to update the lastLogin of the user.

      const query = { lastLogin: Date.now() };

      // Update the user with the update query.

      const updated = await AuthService.update({ _id: user.id }, query);

      // If the database query fails, end execution.

      if (!updated) {
        Logger.error(
          "Failed to update the lastLogin of user: " + user.username,
          { label: "JOB", user: user.username }
        );
        return done(
          new Error("Failed to update the lastLogin of user: " + user.username)
        );
      }

      Logger.verbose("Updated lastLogin of user: " + user.username, {
        label: "JOB",
        user: user.username,
      });

      done();
    }
  );
};
