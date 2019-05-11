import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateQuestionComponent } from '@app/pages/game/components/create-question/create-question.component';
import { QuizzClass } from '@app/pages/game/models/quizz.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameService } from '@app/pages/game/services/game/game.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { GameAddForm } from '@app/pages/game/models/gameAddForm';
import { GameAdd } from '@app/pages/game/models/gameAdd';

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
    private gameService: GameService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.gameForm = this.formBuilder.group({
      userId: this.authService.currentAuthenticationValue.id,
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
    this.gameService
      .createGame(this.sanitizeGame(this.gameForm.value))
      .subscribe(data => console.log(data), error => console.error(error));
  }

  private sanitizeGame(game: GameAddForm): GameAdd {
    const questionIds = game.questions.map(x => {
      return x.id;
    });

    return {
      userId: game.userId,
      name: game.name,
      description: game.description,
      isPrivate: game.isPrivate,
      questions: questionIds,
    };
  }
}
