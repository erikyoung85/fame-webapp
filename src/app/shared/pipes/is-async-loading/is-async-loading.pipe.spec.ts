import { IsAsyncLoadingPipe } from './is-async-loading.pipe';

describe('IsAsyncLoadingPipe', () => {
  it('create an instance', () => {
    const pipe = new IsAsyncLoadingPipe();
    expect(pipe).toBeTruthy();
  });
});
