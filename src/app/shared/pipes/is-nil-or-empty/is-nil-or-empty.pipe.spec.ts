import { IsNilOrEmptyPipe } from './is-nil-or-empty.pipe';

describe('IsNilOrEmptyPipe', () => {
  it('create an instance', () => {
    const pipe = new IsNilOrEmptyPipe();
    expect(pipe).toBeTruthy();
  });
});
