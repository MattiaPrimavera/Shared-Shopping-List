import { Observable } from 'rxjs';

export interface IBaseService<T> {
    get(id: string): Observable<T>;
    list(): Observable<T[]>;
    add(item: T): firebase.database.ThenableReference;
    update(item: T): Promise<void>;
    delete(id: string): Promise<void>;
}
