import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/Klijent';
import { Kredit } from 'src/app/models/Kredit';
import { KlijentService } from 'src/app/services/klijent.service';
import { KreditService } from 'src/app/services/kredit.service';
import { KreditDialogComponent } from '../kredit-dialog/kredit-dialog.component';

@Component({
  selector: 'app-klijent-dialog',
  templateUrl: './klijent-dialog.component.html',
  styleUrls: ['./klijent-dialog.component.css']
})
export class KlijentDialogComponent implements OnInit {
  public flag: number; //1=add, 2=update, 3=delete
  public subscription: Subscription;
  public krediti: Kredit[];

  constructor(public klijentService: KlijentService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<KreditDialogComponent>,
    public kreditService: KreditService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: Klijent) { }

  ngOnInit(): void {
    this.subscription = this.kreditService.getAllKredits().subscribe(data => {
      this.krediti = data;
    },
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  compareTo(a, b) {
    return a.id == b.id;
  }

  private handleError(error): void {
    console.log(error.name + ' ' + error.message);
    this.snackBar.open('Došlo je do greške, pokušajte ponovo kasnije.', 'Zatvori', { duration: 2500 });
    this.closeDialog();
  }

  public addKlijent(): void {
    this.klijentService.addKlijent(this.dataDialog).subscribe(() => {
      this.snackBar.open('Klijent uspešno dodat.' + this.dataDialog.ime, 'OK', { duration: 2500 });
      this.closeDialog();
    }, (error: Error) => {
      this.handleError(error);
    });
  }

  public updateKlijent(): void {
    this.klijentService.updateKlijent(this.dataDialog).subscribe(() => {
      this.snackBar.open('Klijent uspešno izmenjen.: ' + this.dataDialog.ime, 'OK', { duration: 2500 });
      this.closeDialog();
    }, (error: Error) => {
      this.handleError(error);
    });
  }

  public deleteKlijent(): void {
    this.klijentService.deleteKlijent(this.dataDialog.id).subscribe(() => {
      this.snackBar.open('Klijent uspešno obrisan.: ' + this.dataDialog.ime, 'OK', { duration: 2500 });
      this.closeDialog();
    }, (error: Error) => {
      this.handleError(error);
    });
  }

  private closeDialog() {
    this.dialogRef.close(1);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Izmena obustavljena.', 'Zatvori', { duration: 1000 });
  }
}
