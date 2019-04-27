import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizzClass } from '@app/pages/game/models/quizz.class';
import { AuthService } from '@app/core/services/auth/auth.service';
import { QuestionService } from '@app/pages/game/services/question/question.service';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {
  @Input() isModal = false;

  maxAnswer = 6;
  quizzForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private questionService: QuestionService,
    private modalController: ModalController,
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
      const quizz = new QuizzClass();
      quizz.makeQuestion(this.quizzForm.value);
      this.questionService.createQuestion(quizz).subscribe(
        question => {
          if (this.isModal) {
            this.OnCloseModal(question);
          } else {
            this.navCtrl.navigateRoot('home/game');
          }
        },
        error => console.error(error),
      );
    }
  }

  get isAnswersValid(): [] {
    return this.quizzForm.value.answers.filter(answer => {
      return answer.isCorrectAnswer === true;
    });
  }

  OnCloseModal(quizz?: QuizzClass) {
    this.modalController.dismiss(quizz);
  }
}
