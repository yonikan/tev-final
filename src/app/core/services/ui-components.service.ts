import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiComponentsService {
  private isLoading = false;
  private isLoadingListener = new BehaviorSubject<boolean>(false);
  private sidepanelOpen = {isOpen: false, teamEventType: 1, teamEventId: 333};
  private sidepanelOpenListener = new BehaviorSubject<any>({isOpen: false, teamEventType: 1, teamEventId: 333});

  constructor(private snackbar: MatSnackBar, private bottomSheet: MatBottomSheet) {}

  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration
    });
  }

  openBottomSheet(BottomSheetComponent): void {
    this.bottomSheet.open(BottomSheetComponent);
  }
  
  getIsLoading(): boolean {
    return this.isLoading;
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
    this.isLoadingListener.next(isLoading);
  }

  getIsLoadingListener(): Observable<boolean> {
    return this.isLoadingListener.asObservable();;
  }

  getIsSidepanelOpen(): any {
    return this.sidepanelOpen;
  }

  setIsSidepanelOpen(sidepanelOpen) {
    this.sidepanelOpen = sidepanelOpen;
    this.sidepanelOpenListener.next(sidepanelOpen);
  }

  getSidepanelOpenListener(): Observable<any> {
    return this.sidepanelOpenListener.asObservable();
  }
}
