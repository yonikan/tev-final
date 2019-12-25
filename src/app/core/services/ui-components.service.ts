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
  
  constructor(private snackbar: MatSnackBar, private bottomSheet: MatBottomSheet) {}

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

  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration
    });
  }

  openBottomSheet(BottomSheetComponent): void {
    this.bottomSheet.open(BottomSheetComponent);
  }
}
