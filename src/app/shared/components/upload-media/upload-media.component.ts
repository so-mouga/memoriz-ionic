import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.scss'],
})
export class UploadMediaComponent implements OnInit {
  @Input() title: string;

  constructor() {}

  ngOnInit() {}
}
