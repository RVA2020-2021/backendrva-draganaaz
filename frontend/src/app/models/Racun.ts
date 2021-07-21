import { Klijent } from "./Klijent";
import { TipRacuna } from "./TipRacuna";

export interface Racun {
  id: number;
  naziv: string;
  oznaka: string;
  opis: string;
  tipRacuna: TipRacuna;
  klijent: Klijent;
}
