#!/usr/bin/env node
const BuildScript = require('@actual-app/bin');

const bd = new BuildScript('desktop-client', async () => {
  const version = await bd.packageVersion();

  console.log('Building version ' + version + ' for the browser...');

  await bd.fs.rmdir('build');

  const env = {
    IS_GENERIC_BROWSER: 1,
    INLINE_RUNTIME_CHUNK: false,
    REACT_APP_BACKEND_WORKER_HASH: await bd.getWorkerFileHash(),
    REACT_APP_ACTUAL_VERSION: version,
  };

  await bd.exec('yarn build', env);

  await bd.fs.emptyDir('build-stats');
  await bd.fs.move('build/kcab/stats.json', 'build-stats/loot-core-stats.json');
  await bd.fs.move('build/stats.json', 'build-stats/desktop-client-stats.json');
});

bd.run();
