import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TagGet } from '@app/pages/game/models/tagGet';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private readonly baseEndpoint = environment.domain_server;
  protected readonly endpoint = `${this.baseEndpoint}/api/tags`;

  constructor(private http: HttpClient) {}

  public getTags(name: string): Observable<TagGet[]> {
    return this.http.get(`${this.endpoint}?name=${name}`).pipe(
      map((data: TagGet[]) => {
        return data;
      }),
    );
  }
}
