import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { QuestionAdd } from '@app/pages/game/models/questionAdd';
import { User, UserInterface } from '@app/core/model/user';
import { Observable } from 'rxjs';
import { QuestionGet } from '@app/pages/game/models/questionGet';
import { map, tap } from 'rxjs/operators';
import { QuizzClass } from '@app/pages/game/models/quizz.class';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private readonly baseEndpoint = environment.domain_server;
  protected readonly endpoint = `${this.baseEndpoint}/api/questions`;

  constructor(private http: HttpClient) {}

  createQuestion(question: QuestionAdd): Observable<any> {
      console.log('send question', question);
    return this.http.post<QuestionGet>(`${this.endpoint}`, question).pipe(
      tap((data: QuestionGet) => {
        const quizz = new QuizzClass();
        quizz.makeQuizz(data);
        return quizz;
      }),
    );
  }
}
