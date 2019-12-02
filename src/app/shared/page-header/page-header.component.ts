import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle: string; 
  // @Input() pageActions: any[]; 

  pageActions = [ // hard-coded for now
    {
      name: 'exportToPdfAction',
      icon: 'picture_as_pdf',
      tooltip: 'Export To PDF',
      function: () => console.log('TESTTT PDF')
    },
    {
      name: 'exportToExcelAction',
      icon: 'picture_as_pdf',
      tooltip: 'Export To Excel',
      function: () => console.log('TESTTT Excel')
    }
  ];
  
  constructor() { }

  ngOnInit() {
    this.pageActions.forEach(pageAction => {
      // if(pageAction === 'exportToPdfAction') {

      // } else if(pageAction === 'exportToExcelAction') {

      // }
    });
  }
}
