import { Component, Input, OnInit } from '@angular/core';
import { PlayerRoom } from '@app/pages/room/models/playerRoom';
import { AlertController } from '@ionic/angular';
import { RoomService } from '@app/pages/room/services/room/room.service';

@Component({
  selector: 'app-player-display',
  templateUrl: './player-display.component.html',
  styleUrls: ['./player-display.component.scss'],
})
export class PlayerDisplayComponent implements OnInit {
  @Input() player: PlayerRoom;

  constructor(private alertCtrl: AlertController, private roomService: RoomService) {}

  ngOnInit() {}

  onRemove() {
    this.showAlertDelete().then(p => p.present());
  }

  showAlertDelete() {
    return this.alertCtrl.create({
      message: `Supprimer le joueur ${this.player.username} de la salle ?`,
      buttons: [
        {
          text: 'Annuler',
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.roomService.removePlayer(this.player);
          },
        },
      ],
    });
  }
}
