import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { QuestionAdd } from '@app/pages/question/models/questionAdd';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private readonly baseEndpoint = environment.domain_server;
  protected readonly endpoint = `${this.baseEndpoint}/api/tags`;

  constructor(private http: HttpClient) {}

  createQuestion(question: QuestionAdd) {}
}
