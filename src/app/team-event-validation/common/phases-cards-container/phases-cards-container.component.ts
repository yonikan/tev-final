import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-phases-cards-container',
  templateUrl: './phases-cards-container.component.html',
  styleUrls: ['./phases-cards-container.component.scss']
})
export class PhasesCardsContainerComponent implements OnInit {

  @Input() cards = [];

  index = 0;

  config: SwiperConfigInterface = {
    direction: 'horizontal',
    keyboard: true,
    grabCursor: true,
    observer: true,
    spaceBetween: 30,
    slidesPerView: 5.2,
    breakpoints: {
      1025: {
        slidesPerView: 1.2
      },
      1441: {
        slidesPerView: 2.2
      },
      1921: {
        slidesPerView: 3.2
      },
      2300: {
        slidesPerView: 4.2
      }
    }
  };

  constructor() {
  }

  ngOnInit() {
    if (!this.cards.length) {
      this.addEmptyCard();
    }
  }


  addEmptyCard() {
    this.cards = [
      {
        id: '',
        type: '',
        name: '',
        startTime: '',
        endTime: '',
        offset: '',
        numberOfSubs: ''
      },
    ]
  }

  deleteCard(cardToDelete, cardIdx) {
    //  const cardIdx = this.cards.findIndex(card => card.id === cardToDelete.id);
    this.cards.splice(cardIdx,1);
  }
}
