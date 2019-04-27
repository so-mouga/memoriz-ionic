import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateQuestionComponent } from '@app/pages/game/components/create-question/create-question.component';
import { QuizzClass } from '@app/pages/game/models/quizz.class';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements OnInit {
  isPublic = true;
  questions: QuizzClass[] = [];

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {}

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
      }
    });

    return await modal.present();
  }

  onSetIsPublic() {
    this.isPublic = !this.isPublic;
  }
}
