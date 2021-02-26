'use strict';

require('../../env');

const { DATABASE, ROOT } = require('../../config');

const moment = require('moment');
const shell = require('shelljs');

const run = async () => {
  try {
    let time = moment().format('DD-MM-YY-HH:mm');
    let filename = DATABASE.DATABASE_NAME + '_' + time;
    await shell.exec(
      `bash ${ROOT}/database/backups/backup.sh ${DATABASE.DATABASE_URL} ${filename}`
    );
  } catch (err) {
  }
};

run();
