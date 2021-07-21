import { Kredit } from "./Kredit";

export interface Klijent {
  id: number;
  ime: string;
  prezime: string;
  brojLK: number;
  kredit: Kredit;
}
