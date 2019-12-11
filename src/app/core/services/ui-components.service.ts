import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Injectable({
  providedIn: 'root'
})
export class UiComponentsService {
  constructor(private snackbar: MatSnackBar, private bottomSheet: MatBottomSheet) {}

  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration
    });
  }

  openBottomSheet(BottomSheetComponent): void {
    this.bottomSheet.open(BottomSheetComponent);
  }
}
