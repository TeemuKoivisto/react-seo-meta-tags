/**
 * Created by joey on 15/6/17.
 * @Last modified by:   guiguan
 * @Last modified time: 2018-01-29T15:16:38+11:00
 */

const os = require('os');
const child_process = require('child_process');
const path = require('path');

const TMP_DIR = 'data';
const MLAUNCH = 'mlaunch';
const MGENERATE = path.resolve(__dirname, '../node_modules/.bin/mgeneratejs');
/**
 * generate random port number between 6000 and 7000
 * @returns {number}
 */
const getRandomPort = () => {
  return Math.floor(Math.random() * 7000) + 6000;
};

/**
 * launch mongodb instance
 *
 * @param  type [description]
 */
const launchMongoInstance = (type, port, parameters) => {
  const separator = os.platform() === 'win32' ? '\\' : '/';
  let command =
    MLAUNCH +
    ' init ' +
    type +
    ' --dir ' +
    TMP_DIR +
    separator +
    port +
    ' --port ' +
    port +
    ' ' +
    '  --hostname localhost ' +
    parameters;
  if (os.platform() === 'win32') {
    command += '"';
  }
  console.log('launch command ', command);
  if (os.platform() === 'win32') {
    child_process.exec(command);
  } else {
    child_process.execSync(command, {
      stdio: 'inherit',
    });
  }
};
// const output = child_process.exec('start /b mongod --dbpath data')
// console.log('launched')
/**
 * launch a single mongodb instance
 *
 */
const launchSingleInstance = (port, parameters = '') => {
  launchMongoInstance('--single', port, parameters);
};

/**
 * launch replica set
 *
 */
const launchReplicaSet = (port, nodenumber, parameters) => {
  console.log('launch replica set ', port);
  launchMongoInstance('--replicaset', port, '--nodes ' + nodenumber + ' ' + parameters);
};

/**
 * launch a mongos clusters
 * @param port
 * @param nodenumber
 * @param parameters
 */
const launchMongos = (port, nodenumber, parameters) => {
  launchMongoInstance('--mongos ' + nodenumber, port, parameters);
};

/**
 * generate mongo dump data on the collection
 *
 * @param port
 * @param dbName
 * @param colName
 * @param number
 */
const generateMongoData = (port, dbName = 'test', colName = 'test', number = 1) => {
  const command = `${MGENERATE} -n ${number} "${path.resolve(
    __dirname,
    './template.json',
  )}" | mongoimport --port ${port} -d ${dbName} -c ${colName}`;

  child_process.execSync(command, {
    stdio: 'inherit',
  });
  console.log('finish generating data:' + command);
};

/**
 * shutdown mongo instance based on port number
 *
 * @param port
 */
const killMongoInstance = port => {
  try {
    if (os.platform() !== 'win32') {
      const command = MLAUNCH + ' kill --dir ' + TMP_DIR + '/' + port;
      child_process.execSync(command, {
        stdio: 'inherit',
      });
      child_process.execSync('rm -fr ' + TMP_DIR + '/' + port, {
        stdio: 'inherit',
      });
    }
  } catch (_) {}
};

module.exports = {
  launchSingleInstance,
  killMongoInstance,
  launchMongoInstance,
  launchReplicaSet,
  launchMongos,
  getRandomPort,
  generateMongoData,
};
