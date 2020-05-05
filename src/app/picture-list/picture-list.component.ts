import { Component, OnInit } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { Picture } from '../models/picture.model';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss']
})
export class PictureListComponent implements OnInit {
  pictures$;
  filterPictures: Picture[];
  pictures: Picture[];

  constructor(
    private pictureService: PictureService
  ) { }

  ngOnInit(): void {
    // this.pictures$ = this.pictureService.pictures$;
    this.pictures$ = this.pictureService.pictures$.subscribe(picts =>
      this.pictures = this.filterPictures = picts as Picture[]);
    this.pictureService.getPictures();
  }

  onSearch(search) {
    console.log(search);
    this.filterPictures = (search) ?
    this.pictures.filter( p => p.title.toLowerCase().includes(search.toLowerCase())) :
    this.pictures;
  }

}
