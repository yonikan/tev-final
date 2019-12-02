import { Observable, of, throwError } from 'rxjs';
import { retryWhen, delay, mergeMap } from 'rxjs/operators';

const getErrorMessage = (maxRetry: number) => `Tried to load the resource for ${maxRetry} times whithout success.`;

const DEFAULT_MAX_RETRIES = 3;

export function delayedRetry(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES) {
    let retries = maxRetry;

    return (src: Observable<any>) => 
        src.pipe(
            retryWhen((errors: Observable<any>) => errors.pipe(
                delay(delayMs),
                mergeMap(error => retries-- > 0 ? of(error) : throwError(getErrorMessage(maxRetry)))
                )
            )
        );
}