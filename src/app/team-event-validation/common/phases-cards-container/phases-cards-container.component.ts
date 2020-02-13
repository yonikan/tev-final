import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-phases-cards-container',
  templateUrl: './phases-cards-container.component.html',
  styleUrls: ['./phases-cards-container.component.scss']
})
export class PhasesCardsContainerComponent implements OnInit {

  @Input() cards = [];
  @Output() trainingPhasesEmitter = new EventEmitter<any>();

  index = 0;

  config: SwiperConfigInterface = {
    direction: 'horizontal',
    keyboard: true,
    grabCursor: true,
    observer: true,
    spaceBetween: 30,
    slidesPerView: 5.2,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
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
    if (this.cards && !this.cards.length) {
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

  onDeleteCard(cardIdToDelete) {
    const cardIndex = this.cards.findIndex(card => card.id === cardIdToDelete);
    this.cards.splice(cardIndex, 1);
  }

  updatePhase(updatedPhase) {
    const index = this.cards.findIndex((card) => { return card.id === updatedPhase.id });
    this.cards[index] = updatedPhase;
  }
}
