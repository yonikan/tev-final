// import { animate, query, stagger, style, transition, trigger, state } from '@angular/animations';
// import { Directive } from '@angular/core';


// export const fadeInSimpleAnimation = trigger('fadeInSimple', [
//   state('in', style({opacity: 1})),

//   transition(':enter', [
//     style({opacity: 0}),
//     animate(600 )
//   ]),

//   transition(':leave',
//     animate(600, style({opacity: 0})))
// ]);


// export const fadeInUpStaggerAnimation = trigger('fadeInUpStagger', [
//   transition('* => *', [ // each time the binding value changes
//     query('[fadeInUpStaggerElement]', [
//       style({
//         transform: 'translateY(5vh)',
//         opacity: 0
//       }),
//       stagger(100, [
//         animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({
//           transform: 'translateY(0)',
//           opacity: 1
//         }))
//       ])
//     ], { optional: true })
//   ])
// ]);

// @Directive({
//   selector: '[fadeInUpStaggerElement]'
// })
// export class FadeInSimpleDirective {
// }
