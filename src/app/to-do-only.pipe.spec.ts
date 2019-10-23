import { ToDoOnlyPipe } from './to-do-only.pipe';

describe('ToDoOnlyPipe', () => {
  it('create an instance', () => {
    const pipe = new ToDoOnlyPipe();
    expect(pipe).toBeTruthy();
  });
});
