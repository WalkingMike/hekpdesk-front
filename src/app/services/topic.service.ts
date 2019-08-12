import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Topic } from '../models/topic';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private topicUrl = 'http://localhost:8080/topic';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  /** GET topics from the server */
  public getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.topicUrl + '/selectall');
  }

  /** DELETE topic from the server */
  public deleteTopic(id: number) {
    // const httpParams = new HttpParams().set('id', id.toString());
    // const options = {params: httpParams};
    return this.http.delete(this.topicUrl + '/remove/?id=' + id, this.httpOptions);
  }

  /** POST topic on the server */
  public createTopic(topic: Topic): Observable<Topic>  {
    return this.http.post<Topic>(this.topicUrl + '/add', topic, this.httpOptions);
  }

}
