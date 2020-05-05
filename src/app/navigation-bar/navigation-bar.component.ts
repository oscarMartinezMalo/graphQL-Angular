import { Component, HostListener, NgZone } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { fromEvent } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('show', style({
        height: '50px',
        backgroundImage: 'linear-gradient(180deg, rgba(60,60,60,1) 0%, rgba(60,60,60,0.8407738095238095) 34%, rgba(60,60,60,0.6587009803921569) 72%)',
      })),
      state('hide', style({
        height: '100px',
        backgroundColor: 'transparent',
      })),
      transition('show <=> hide', [
        animate('1s')
      ])
    ]),
  ]
})
export class NavigationBarComponent {
  public toolbarColor = false;

  // @HostListener('window:scroll', ['$event']) 
  // onWindowScroll(e) {
  //   alert('234');
  // }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private scrollDispatcher: ScrollDispatcher,
    private zone: NgZone) {

    this.scrollDispatcher.scrolled().subscribe((data: CdkScrollable) => {
      const scrollTop = data.getElementRef().nativeElement.scrollTop || 0;

      this.zone.run(() => { this.toolbarColor = (scrollTop < 50) ? false : true; });
    })

  }

}
