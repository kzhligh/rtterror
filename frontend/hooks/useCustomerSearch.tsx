import { useMemo, useCallback, useEffect } from 'react';
import {
  BehaviorSubject,
  pluck,
  filter,
  map,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  Observable,
  from,
  catchError,
  of,
} from 'rxjs';
import { DEBOUNCE_DELAY } from 'utils';
import { http } from 'utils/http';

export const useCustomerSearchObservable = (
  initialValue: React.ChangeEvent<HTMLInputElement>,
  onLoading: React.Dispatch<React.SetStateAction<boolean>>,
  onError: React.Dispatch<React.SetStateAction<any>>,
  onValue: React.Dispatch<React.SetStateAction<any>>
) => {
  const searchSubject$ = useMemo(
    () =>
      new BehaviorSubject<React.ChangeEvent<HTMLInputElement>>(initialValue),
    [initialValue]
  );

  const eventEmitter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      searchSubject$.next(event);
    },
    [searchSubject$]
  );

  useEffect(() => {
    const queryListener = searchSubject$
      .pipe(
        pluck<React.ChangeEvent<HTMLInputElement>, 'target', 'value'>(
          'target',
          'value'
        ),
        filter<string>((query) => query !== undefined),
        map<string, string>((query) => query.trim()),
        debounceTime<string>(DEBOUNCE_DELAY),
        distinctUntilChanged<string>(),
        tap<string>(() => {
          onLoading(true);
          onError(null);
        }),
        switchMap<string, Observable<any>>((query) =>
          from(
            http(`/api/v1/customer/search`, {
              searchParams: { query },
            })
          )
        ),
        catchError<any, Observable<any>>((error) => {
          onError(error);
          return of(error);
        })
      )
      .subscribe((searchResult) => {
        if (searchResult) {
          onValue(searchResult);
        }

        onLoading(false);
      });

    return () => queryListener.unsubscribe();
  }, [searchSubject$, onLoading, onError, onValue]);

  return [eventEmitter];
};
