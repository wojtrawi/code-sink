import { MonoTypeOperatorFunction, pipe, take } from 'rxjs';

const SINGLE_VALUE = 1;

export function snapshot<T>(): MonoTypeOperatorFunction<T> {
  return pipe(take(SINGLE_VALUE));
}
