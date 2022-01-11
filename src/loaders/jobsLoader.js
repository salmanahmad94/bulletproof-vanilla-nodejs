import path from "path";

import Utility from "utility";

export default async (agenda) => {
  // The path to the directory where the jobs are defined.

  const dirPath = path.join(__dirname, "../", "jobs");

  // Get all file paths from the directory.

  const jobFiles = Utility.general.getAllFiles(dirPath);

  // Initiate a job definition with the Agenda instance for each job.

  jobFiles.forEach((jobFile) => require(jobFile).default(agenda));

  // If there are job definitions, start Agenda.

  if (jobFiles.length) agenda.start();

  // Listen to Aganda's fail event. If a job fails, reschedule it with exponential backoff.

  agenda.on("fail", async (error, job) => {
    if (job.attrs.failCount <= job.attrs.data.maxRetries) {
      job.schedule("in " + job.attrs.failCount + " minutes");
      await job.save();
    }
  });

  // Return the Agenda instance.

  return agenda;
};
