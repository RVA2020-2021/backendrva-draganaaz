import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Kredit } from 'src/app/models/Kredit';
import { KreditService } from 'src/app/services/kredit.service';

@Component({
  selector: 'app-kredit-dialog',
  templateUrl: './kredit-dialog.component.html',
  styleUrls: ['./kredit-dialog.component.css']
})
export class KreditDialogComponent implements OnInit {

  public flag: number; //1=add, 2=update, 3=delete

  constructor(public kreditService: KreditService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<KreditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: Kredit) { }

  ngOnInit(): void {
  }

  public addKredit(): void {
    this.kreditService.addKredit(this.dataDialog).subscribe(() => {
      this.snackBar.open('Kredit uspešno dodat.' + this.dataDialog.naziv, 'OK', { duration: 2500 })
    }), (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške, pokušajte ponovo kasnije.', 'Zatvori', { duration: 2500 });
    };
  }

  public updateKredit(): void {
    this.kreditService.updateKredit(this.dataDialog).subscribe(() => {
      this.snackBar.open('Kredit uspešno izmenjen.: ' + this.dataDialog.naziv, 'OK', { duration: 2500 })
    }), (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške, pokušajte ponovo kasnije.', 'Zatvori', { duration: 2500 });
    };
  }

  public deleteKredit(): void {
    this.kreditService.deleteKredit(this.dataDialog.id).subscribe(() => {
      this.snackBar.open('Kredit uspešno obrisan.: ' + this.dataDialog.naziv, 'OK', { duration: 2500 })
    }), (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške, pokušajte ponovo kasnije.', 'Zatvori', { duration: 2500 });
    };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Izmena obustavljena.', 'Zatvori', { duration: 1000 });
  }

}
