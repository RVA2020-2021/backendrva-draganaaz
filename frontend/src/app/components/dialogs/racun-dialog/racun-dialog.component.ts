import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Racun } from 'src/app/models/Racun';
import { TipRacuna } from 'src/app/models/TipRacuna';
import { RacunService } from 'src/app/services/racun.service';
import { TipRacunaService } from 'src/app/services/tipRacuna.service';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {

  public flag: number; //1=add, 2=update, 3=delete
  public subscription: Subscription;
  public tipoviRacuna: TipRacuna[];

  constructor(public racunService: RacunService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RacunDialogComponent>,
    public tipRacunaService: TipRacunaService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: Racun) { }

    ngOnInit(): void {
      this.subscription=this.tipRacunaService.getAllTipRacunas().subscribe(data => {
        this.tipoviRacuna=data;
      }),
      (error: Error) => {
        console.log(error.name+' '+error.message);
      };
    }

    compareTo(a,b){
      return a.id==b.id;
    }

  public addRacun(): void {
    this.racunService.addRacun(this.dataDialog).subscribe(() => {
      this.snackBar.open('Račun uspešno dodat.' + this.dataDialog.naziv, 'OK', { duration: 2500 })
      this.closeDialog();
    }), (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške, pokušajte ponovo kasnije.', 'Zatvori', { duration: 2500 });
      this.closeDialog();
    };
  }

  public updateRacun(): void {
    this.racunService.updateRacun(this.dataDialog).subscribe(() => {
      this.snackBar.open('Račun uspešno izmenjen.: ' + this.dataDialog.naziv, 'OK', { duration: 2500 })
      this.closeDialog();
    }), (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške, pokušajte ponovo kasnije.', 'Zatvori', { duration: 2500 });
      this.closeDialog();
    };
  }

  public deleteRacun(): void {
    this.racunService.deleteRacun(this.dataDialog.id).subscribe(() => {
      this.snackBar.open('Račun uspešno obrisan.: ' + this.dataDialog.naziv, 'OK', { duration: 2500 })
      this.closeDialog();
    }), (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške, pokušajte ponovo kasnije.', 'Zatvori', { duration: 2500 });
      this.closeDialog();
    };
  }

  private closeDialog(){
    this.dialogRef.close(1);
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Izmena obustavljena.', 'Zatvori', { duration: 1000 });
  }
}
