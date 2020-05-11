import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { PictureService } from '../../services/picture.service';
import { Picture } from '../../models/picture.model';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.scss']
})
export class PictureCardComponent implements OnInit {
  @Input() public picture: Picture;
  @Input() public author: Author;
  @Input() public showEditSection: boolean = true;
  @Input() public showProfilePic:boolean = true;

  constructor(
    private pictureService: PictureService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onDelete(pictureId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this Picture?"
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pictureService.deletePicture(pictureId);
      }
    });
  }

  getAuthorFullName() {
    if (this.picture['author']){
      return `${this.picture['author'].name}  ${this.picture['author'].lastName}`;
    }

    if (this.author)
      return `${this.author.name} ${this.author.lastName}`;
  }
}
