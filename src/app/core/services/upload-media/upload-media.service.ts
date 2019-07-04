import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { QuestionGet } from '@app/pages/game/models/questionGet';
import { catchError, map, tap } from 'rxjs/operators';
import { QuizzClass } from '@app/pages/game/models/quizz.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadMediaService {
  private readonly baseEndpoint = environment.domain_server;
  protected readonly endpoint = `${this.baseEndpoint}/api/media/upload`;

  constructor(private http: HttpClient) {}

  public upload(media): Observable<any> {
    const params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.http.post(`${this.endpoint}`, media, options);
  }

  public uploadProgress(data): Observable<any> {
    return this.http
      .post<any>(`${this.endpoint}`, data, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };

            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        }),
      );
  }
}
