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

  /** GET replies from the server */
  public getReplies(): Observable<Reply[]> {
    return this.http.get<Reply[]>(this.replyUrl + '/selectall');
  }


  /** GET replies by topicID from the server */
  public getRepliesByTopic(id: number): Observable<Reply[]> {
    return this.http.get<Reply[]>(this.replyUrl + '/selectall/topic?id=' + id);
  }

  /** DELETE reply from the server */
  public deleteReply(id: number) {
    return this.http.delete(this.replyUrl + '/remove?id=' + id, this.httpOptions);
  }

  /** POST reply on the server */
  public createReply(reply: Reply): Observable<Reply>  {
    return this.http.post<Reply>(this.replyUrl + '/add', reply, this.httpOptions);
  }

}
