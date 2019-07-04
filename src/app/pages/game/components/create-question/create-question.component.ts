import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizzClass } from '@app/pages/game/models/quizz.class';
import { AuthService } from '@app/core/services/auth/auth.service';
import { QuestionService } from '@app/pages/game/services/question/question.service';
import { ModalController, NavController } from '@ionic/angular';
import { UploadMediaService } from '@app/core/services/upload-media/upload-media.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {
  @Input() isModal = false;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('inputFileRessourceMedia') inputFileRessourceMedia: ElementRef;

  media = (File = null);
  maxAnswer = 6;
  quizzForm: FormGroup;
  img = null;
  error: string;
  uploadResponse = { status: '', message: '', filePath: '' };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private questionService: QuestionService,
    private modalController: ModalController,
    private navCtrl: NavController,
    private uploadService: UploadMediaService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventMedia: any) => {
        this.img = eventMedia.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.media = <File>event.target.files[0];
      // this.quizzForm.value.media = this.media;
    }
  }

  triggerAddMedia() {
    this.inputFile.nativeElement.click();
  }

  removeImage() {
    this.inputFile.nativeElement.value = '';
    this.img = null;
    this.quizzForm.value.media = null;
    this.media = null;
  }

  initForm() {
    this.quizzForm = this.formBuilder.group({
      userId: this.authService.currentAuthenticationValue.id,
      question: ['', [Validators.required]],
      resource: [''],
      media: [''],
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
    // todo refacto this
    if (this.quizzForm.valid && this.isAnswersValid.length > 0) {
      if (this.img) {
        const formData = new FormData();
        formData.append('media', this.media);
        this.uploadService.upload(formData).subscribe(
          res => {
            this.uploadResponse = res;

            this.quizzForm.value.media = res.media;
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
          },
          err => {
            // this.error = err
          },
        );
      } else {
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
