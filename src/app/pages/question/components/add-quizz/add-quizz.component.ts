import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizzClass } from '@app/pages/question/models/quizz.class';
import { AuthService } from '@app/core/services/auth/auth.service';
import { QuestionService } from '@app/pages/question/services/question/question.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-quizz',
  templateUrl: './add-quizz.component.html',
  styleUrls: ['./add-quizz.component.scss'],
})
export class AddQuizzComponent implements OnInit {
  maxAnswer = 6;
  quizzForm: FormGroup;
  quizz = new QuizzClass();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private questionService: QuestionService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.quizzForm = this.formBuilder.group({
      userId: this.authService.currentAuthenticationValue.id,
      question: ['', [Validators.required]],
      resource: [''],
      tags: ['', [Validators.required]],
      answers: this.formBuilder.array([
        this.formBuilder.group({
          answer: ['', [Validators.required, Validators.minLength(1)]],
          isCorrectAnswer: [false, Validators.required],
        }),
        this.formBuilder.group({
          answer: ['', [Validators.required, Validators.minLength(1)]],
          isCorrectAnswer: [false, Validators.required],
        }),
      ]),
    });
  }

  getTags(tags: string[]) {
    this.quizzForm.patchValue({
      tags: tags,
    });
  }

  get answers() {
    return this.quizzForm.get('answers') as FormArray;
  }

  addAnswer() {
    if (this.canAddAnswer()) {
      this.answers.push(
        this.formBuilder.group({
          answer: ['', [Validators.required]],
          isCorrectAnswer: [false],
        }),
      );
    }
  }

  canAddAnswer() {
    return (
      this.answers.value[0].answer !== '' &&
      this.answers.value[1].answer &&
      this.answers.value.slice(-1).pop().answer !== ''
    );
  }

  deleteAnswer(index) {
    this.answers.removeAt(index);
  }

  onSubmit() {
    if (this.quizzForm.valid && this.isAnswersValid.length > 0) {
      this.quizz.makeQuestion(this.quizzForm.value);
      this.questionService
        .createQuestion(this.quizz)
        .subscribe(question => console.log(question.correctAnswers), error => console.error(error));
    }
  }

  get isAnswersValid(): [] {
    return this.quizzForm.value.answers.filter(answer => {
      return answer.isCorrectAnswer === true;
    });
  }
}
