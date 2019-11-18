import { DoneOnlyPipe } from './done-only.pipe';

describe('DoneOnlyPipe', () => {
  it('create an instance', () => {
    const pipe = new DoneOnlyPipe();
    expect(pipe).toBeTruthy();
  });
});
