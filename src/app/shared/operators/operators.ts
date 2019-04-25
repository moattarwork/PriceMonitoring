import { Observable } from 'rxjs';
import { map, scan, tap } from 'rxjs/operators';
import { Timestamped } from './timestamp';

export const slidingWindow = (ms: number) => <T>(source: Observable<T>) =>
  source.pipe(
    map((t: T) => new Timestamped(t)),
    scan<Timestamped<T>>((acc, curr) => {
      acc.push(curr);

      const date = new Date();
      date.setMilliseconds(date.getMilliseconds() - ms);

      return acc.filter(x => x.timestamp > date);
    }, []),
    map((arr: Timestamped<T>[]) => arr.map(el => el.t))
  );


