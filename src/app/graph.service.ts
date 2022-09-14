import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class GraphService {

  baseURL: string = "http://localhost:5000";

  constructor(private http: HttpClient) {
  }

  shortestPath(startLabel: string, startProp: string, startValue: string, endLabel: string, endProp: string, endValue: string): Observable<any> {
    return this.http.get(this.baseURL + '/ShortestPaths?' + 'start_label=Partner&start_property=partner_id&start_label_value=969883b2-2291-4f61-9d8c-5449b067a17a&end_label=EntschaedigungsmitteilungBeauftragt&end_property=event_id&end_label_value=a689734f-9c9b-43ec-ab9c-744d95e1f1a1')
  }
}
