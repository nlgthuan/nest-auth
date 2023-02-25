import dataSource from '../src/database/data-source';

beforeEach(async () => {
  await dataSource.initialize();
  await dataSource.synchronize(true);
});

afterAll(async () => {
  await dataSource.destroy();
});
