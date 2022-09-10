import {
  MonoTypeOperatorFunction,
  pipe,
  ReplaySubject,
  share,
  timer,
} from 'rxjs';

const REPLAY_COUNT = 1;
const DEFAULT_CACHE_TTL = 30000;

export function shareWithTTL<T>(
  ttl: number = DEFAULT_CACHE_TTL
): MonoTypeOperatorFunction<T> {
  return pipe(
    share({
      connector: () => new ReplaySubject(REPLAY_COUNT),
      resetOnComplete: () => timer(ttl),
    })
  );
}
