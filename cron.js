const cron = require('node-cron');
const axios = require('axios');

function setupCronJob(apiUrl) {
  // Schedule a task to run every 5 minutes
  cron.schedule('*/5 * * * *', () => {
    console.log('Running a task every 5 minutes');
    axios.get(apiUrl)
      .then(response => console.log(`Response from API: ${response.statusText}`))
      .catch(error => console.error(`Error calling API: ${error.message}`));
  });
}

module.exports = setupCronJob;