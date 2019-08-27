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

  /** GET user name and login by ID from the server */
  public getUserNameLoginByID(id: number): Observable<string[]> {
    return this.http.get<string[]>(this.userUrl + 'NameLogin/?id=' + id);
  }

  /** PUT user name on the server */
  public setUserName(login: string, name: string): Observable<any> {
    return this.http.put<any>(this.userUrl + '/modifyname?login=' + login + '&name=' + name, this.httpOptions);
  }

  /** PUT user password on the server */
  public setUserPass(login: string, password: string): Observable<any> {
    return this.http.put<any>(this.userUrl + '/modifypassword?login=' + login + '&password=' + password, this.httpOptions);
  }

  /** PUT user region on the server */
  public setUserRegion(login: string, regionID: number): Observable<any> {
    return this.http.put<any>(this.userUrl + '/modifyregion?login=' + login + '&regionID=' + regionID, this.httpOptions);
  }

   /** GET user by Login from the server */
   public getUserByLogin(login: string): Observable<User> {
    return this.http.get<User>(this.userUrl + 'Login/?login=' + login);
  }

  /** DELETE user from the server */
  public deleteUser(id: number) {
    return this.http.delete(this.userUrl + '/remove?id=' + id, this.httpOptions);
  }

  /** POST user on the server */
  public createUser(user: User): Observable<User>  {
    return this.http.post<User>(this.userUrl + '/add', user, this.httpOptions);
  }
}
