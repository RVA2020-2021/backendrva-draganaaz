import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipRacuna } from 'src/app/models/TipRacuna';
import { TipRacunaService } from 'src/app/services/tipRacuna.service';

@Component({
  selector: 'app-tip-racuna-dialog',
  templateUrl: './tip-racuna-dialog.component.html',
  styleUrls: ['./tip-racuna-dialog.component.css']
})
export class TipRacunaDialogComponent implements OnInit {

  public flag: number; //1=add, 2=update, 3=delete

  constructor(public tipRacunaService: TipRacunaService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TipRacunaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: TipRacuna) { }

  ngOnInit(): void {
  }

  private handleError(error): void {
    console.log(error.name + ' ' + error.message);
    this.snackBar.open('Došlo je do greške, pokušajte ponovo kasnije.', 'Zatvori', { duration: 2500 });
    this.closeDialog();
  }

  public addTipRacuna(): void {
    this.tipRacunaService.addTipRacuna(this.dataDialog).subscribe(() => {
      this.snackBar.open('Tip računa uspešno dodat: ' + this.dataDialog.naziv, 'OK', { duration: 2500 });
      this.closeDialog();
    }, (error: Error) => {
      this.handleError(error);
    });
  }

  public updateTipRacuna(): void {
    this.tipRacunaService.updateTipRacuna(this.dataDialog).subscribe(() => {
      this.snackBar.open('Tip računa uspešno izmenjen: ' + this.dataDialog.naziv, 'OK', { duration: 2500 });
      this.closeDialog();
    }, (error: Error) => {
      this.handleError(error);
    });
  }

  public deleteTipRacuna(): void {
    this.tipRacunaService.deleteTipRacuna(this.dataDialog.id).subscribe(() => {
      this.snackBar.open('Tip računa uspešno obrisan: ' + this.dataDialog.naziv, 'OK', { duration: 2500 });
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
