import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateQuestionComponent } from '@app/pages/game/components/create-question/create-question.component';
import { QuizzClass } from '@app/pages/game/models/quizz.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements OnInit {
  isPublic = true;
  questions: QuizzClass[] = [];
  gameForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.gameForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      isPrivate: [false],
      password: [{ value: '', disabled: true }],
      questions: ['', [Validators.required]],
    });
  }

  get formControls(): any {
    return this.gameForm['controls'];
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateQuestionComponent,
      componentProps: {
        isModal: true,
      },
    });

    modal.onDidDismiss().then(question => {
      if (question.data !== undefined) {
        this.questions.push(question.data);
        this.gameForm.patchValue({
          questions: this.questions,
        });
      }
    });

    return await modal.present();
  }

  onSetIsPublic() {
    this.isPublic = !this.isPublic;
    if (this.isPublic) {
      this.gameForm.controls['password'].disable();
    } else {
      this.gameForm.controls['password'].enable();
    }
  }

  onSubmit() {
    console.log(this.gameForm.value);
  }
}
