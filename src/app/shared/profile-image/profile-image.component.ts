import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {

  @Input() src;
  @Input() size;
  @Input() imageStyle: any = {};


  constructor() {
  }

  ngOnInit() {
    this.imageStyle['width'] = this.size;
    this.imageStyle['height'] = this.size;
  }

}
