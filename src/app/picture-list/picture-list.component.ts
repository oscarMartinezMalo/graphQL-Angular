import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { Picture } from '../models/picture.model';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { take } from 'rxjs/operators';

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
    public pictureService: PictureService,
    private router: Router,
    private vps: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.pictures$ = this.pictureService.pictures$.subscribe(picts => this.pictures = this.filterPictures = picts as Picture[]);
    // this.pictureService.getPictures();
    this.pictureService.getInitialPicturesInfiniteScroll();
  }

  onSearch(search) {
    this.filterPictures = (search) ?
      this.pictures.filter(p => p.title.toLowerCase().includes(search.toLowerCase())) :
      this.pictures;
  }

  onScrollHandler(e) {
    if (e === 'bottom') {
      this.pictureService.getPicturesInfiniteScroll();
    }
  }

}
