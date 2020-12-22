/* eslint-disable jest/require-top-level-describe, @typescript-eslint/no-explicit-any */

import { createFsFromVolume, vol } from 'memfs';

/**
 * "mock" the file system to use a union'd file system.
 *
 * Note that because of the union, any attempt to write to a folder that exists
 * on the native filesystem will bypass the in-memory fs unless the folder also
 * exists in that fs.
 */
jest.mock('fs', () => {
  // beforeEach(() => vol.mkdirSync(process.cwd(), { recursive: true }));
  afterEach(() => vol.reset());

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return createFsFromVolume(vol) as any;
});
