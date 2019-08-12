import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/user';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  /** GET users from the server */
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/selectall');
  }

  /** GET user by ID from the server */
  public getUserByID(id: number): Observable<User> {
    return this.http.get<User>(this.userUrl + '/?id=' + id);
  }

  /** DELETE user from the server */
  public deleteUser(id: number) {
    // const httpParams = new HttpParams().set('id', id.toString());
    // const options = {params: httpParams};
    return this.http.delete(this.userUrl + '/remove/?id=' + id, this.httpOptions);
  }

  /** POST user on the server */
  public createUser(user: User): Observable<User>  {
    return this.http.post<User>(this.userUrl + '/add', user, this.httpOptions);
  }
}
