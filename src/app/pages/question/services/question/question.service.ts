import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { QuestionAdd } from '@app/pages/question/models/questionAdd';
import { User } from '@app/core/model/user';
import { Observable } from 'rxjs';
import { QuestionGet } from '@app/pages/question/models/questionGet';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private readonly baseEndpoint = environment.domain_server;
  protected readonly endpoint = `${this.baseEndpoint}/api/questions`;

  constructor(private http: HttpClient) {}

  createQuestion(question: QuestionAdd): Observable<QuestionGet> {
    return this.http.post<QuestionGet>(`${this.endpoint}`, question);
  }
}
