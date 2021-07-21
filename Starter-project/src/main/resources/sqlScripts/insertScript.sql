--kredit
insert into kredit (id, naziv, oznaka, opis)
values (1, 'naziv1', 'oznaka1', 'opis1');

insert into kredit (id, naziv, oznaka, opis)
values (2, 'naziv2', 'oznaka2', 'opis2');

insert into kredit (id, naziv, oznaka, opis)
values (-100, 'test', 'test', 'test');

--tip racuna
insert into tip_racuna (id, naziv, oznaka, opis)
values (1, 'tip1', 'oznaka1', 'opis1');

insert into tip_racuna (id, naziv, oznaka, opis)
values (2, 'tip2', 'oznaka2', 'opis2');

insert into tip_racuna (id, naziv, oznaka, opis)
values (-100, 'test', 'test', 'test');

--klijent
insert into klijent (id, ime, prezime, broj_lk, kredit)
values (1, 'ime1', 'prezime1', 1, 1);

insert into klijent (id, ime, prezime, broj_lk, kredit)
values (2, 'ime2', 'prezime2', 2, 2);

insert into klijent (id, ime, prezime, broj_lk, kredit)
values (-100, 'test', 'test', 2, 1);

--racun
insert into racun (id, naziv, oznaka, opis, tip_racuna, klijent)
values (1, 'naziv1', 'oznaka1', 'opis1', 1, 1);

insert into racun (id, naziv, oznaka, opis, tip_racuna, klijent)
values (2, 'naziv2', 'oznaka2', 'opis2', 2, 2);

insert into racun (id, naziv, oznaka, opis, tip_racuna, klijent)
values (-100, 'test', 'test', 'test', 1, 2);
