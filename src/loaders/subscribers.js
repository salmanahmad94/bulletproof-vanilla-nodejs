import path from 'path';

import Utility from 'utility';

export default async () => {
    // The path to the directory where the event listeners are defined.

    const dirPath = path.join(__dirname, '../', 'subscribers');

    // Get all file paths from the directory.

    const subscriberFiles = Utility.general.getAllFiles(dirPath);

    // Execute each listner function to register it.

    subscriberFiles.forEach(subscriberFile => require(subscriberFile).default());

    // End execution.

    return;
}