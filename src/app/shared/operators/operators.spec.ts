import { hot, cold } from 'jasmine-marbles';
import { slidingWindow } from './operators';
import { interval } from 'rxjs';
import { take, map, finalize } from 'rxjs/operators';
import { tick, fakeAsync, async } from '@angular/core/testing';

describe('slidingWindow', () => {
  it('should emit sliding window with each incoming event', async () => {
    const array = [1, 2, 3, 4];
    const source = interval(1000).pipe(
      take(array.length),
      map(i => array[i]));

    const expectedValues = [
      [1],
      [2],
      [3],
      [4]
    ];
    const actualValues = [];

    source.pipe(
      slidingWindow(500),
      finalize(() => { expect(actualValues).toEqual(expectedValues); }))
      .subscribe(arr => actualValues.push(arr));

    await source.toPromise();
  });

  fit('should emit sliding window with each incoming event pushing some events out of window', async () => {
    const array = [1, 2, 3, 4];
    const source = interval(1000).pipe(
      take(array.length),
      map(i => array[i]));

    const expectedValues = [
      [1],
      [1, 2],
      [2, 3],
      [3, 4]
    ];
    const actualValues = [];

    source.pipe(
      slidingWindow(1990),
      finalize(() => { expect(actualValues).toEqual(expectedValues); }))
      .subscribe(arr => actualValues.push(arr));

    await source.toPromise();
  });
});
