import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roleUrl = 'http://localhost:8080/role';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  /** GET roles from the server */
  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.roleUrl + '/selectall');
  }

  /** DELETE role from the server */
  public deleteRole(id: number) {
    // const httpParams = new HttpParams().set('id', id.toString());
    // const options = {params: httpParams};
    return this.http.delete(this.roleUrl + '/remove?id=' + id, this.httpOptions);
  }

  /** POST role on the server */
  public createRole(role: Role): Observable<Role>  {
    return this.http.post<Role>(this.roleUrl + '/add', role, this.httpOptions);
  }

}
