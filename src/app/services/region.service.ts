import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Region } from '../models/region';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private regionUrl = 'http://localhost:8080/region';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  /** GET regions from the server */
  public getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.regionUrl + '/selectall');
  }

  /** DELETE region from the server */
  public deleteRegion(id: number) {
    // const httpParams = new HttpParams().set('id', id.toString());
    // const options = {params: httpParams};
    return this.http.delete(this.regionUrl + '/remove?id=' + id, this.httpOptions);
  }

  /** POST region on the server */
  public createRegion(region: Region): Observable<Region>  {
    return this.http.post<Region>(this.regionUrl + '/add', region, this.httpOptions);
  }

}
