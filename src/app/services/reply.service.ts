import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reply } from '../models/reply';


@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  private replyUrl = 'http://localhost:8080/reply';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  /** GET replys from the server */
  public getReplies(): Observable<Reply[]> {
    return this.http.get<Reply[]>(this.replyUrl + '/selectall');
  }

  /** DELETE reply from the server */
  public deleteReply(id: number) {
    // const httpParams = new HttpParams().set('id', id.toString());
    // const options = {params: httpParams};
    return this.http.delete(this.replyUrl + '/remove?id=' + id, this.httpOptions);
  }

  /** POST reply on the server */
  public createReply(reply: Reply): Observable<Reply>  {
    return this.http.post<Reply>(this.replyUrl + '/add', reply, this.httpOptions);
  }

}
