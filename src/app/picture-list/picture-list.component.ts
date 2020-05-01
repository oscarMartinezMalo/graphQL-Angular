import { Component, OnInit } from '@angular/core';
import { PictureService } from '../services/picture.service';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss']
})
export class PictureListComponent implements OnInit {
  pictures$;

  constructor(
    private pictureService: PictureService
  ) { }

  ngOnInit(): void {
    this.pictures$ = this.pictureService.pictures$;
    this.pictureService.getPictures();
  }

}
