import { Component, OnInit, Input } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { Picture } from '../models/picture.model';

@Component({
  selector: 'app-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.scss']
})
export class PictureCardComponent implements OnInit {
  @Input() public picture: Picture;

  constructor(
    private pictureService: PictureService
    ) { }

  ngOnInit(): void {
  }

  onDelete(pictureId: string) {
    this.pictureService.deletePicture(pictureId);
  }

  onUpdate(pictureId: string) {
    this.pictureService.deletePicture(pictureId);
  }

}
