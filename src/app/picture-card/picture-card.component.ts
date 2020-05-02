import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { Picture } from '../models/picture.model';
import { AuthorService } from '../services/author.service';
import { Author } from '../models/author.model';

@Component({
  selector: 'app-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.scss']
})
export class PictureCardComponent implements OnInit {
  @Input() public picture: Picture;
  @Input() public author: Author;
  @Input() public showEditSection: boolean = true;

  constructor(
    private pictureService: PictureService,
  ) { }

  ngOnInit(): void {
  }

  onDelete(pictureId: string) {
    this.pictureService.deletePicture(pictureId);
  }

  onUpdate(pictureId: string) {
    this.pictureService.deletePicture(pictureId);
  }

  getAuthorFullName() {
    if (this.picture['author'])
      return `${this.picture['author'].name}  ${this.picture['author'].lastName}`;

    if (this.author)
      return `${this.author.name} ${this.author.lastName}`;
  }

}
