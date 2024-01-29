const path = require('path');

try {
  const expoPath = path.dirname(require.resolve('expo/package.json'));
  const expoCliPath = path.dirname(require.resolve('@expo/cli/package.json'), {
    paths: [expoPath],
  });

  /** @type {import('@expo/config/paths')} */
  const { getPossibleProjectRoot } = require(
    require.resolve('@expo/config/paths', { paths: [expoPath] })
  );

  /** @type {import('@expo/env')} */
  const expoEnv = require(require.resolve('@expo/env', { paths: [expoCliPath] }));

  // Auto-load the environment variables from the possible project root
  expoEnv.load(getPossibleProjectRoot(), { silent: true });
} catch (error) {
  console.warn('env: failed to load environment variables from dotenv files', error);
}
