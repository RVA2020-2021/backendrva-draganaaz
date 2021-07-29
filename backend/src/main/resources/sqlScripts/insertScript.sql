--kredit
insert into kredit (id, naziv, oznaka, opis)
values (nextval('kredit_seq'), 'Kredit 1', 'Oznaka kredita 1', 'Opis kredita 1');

insert into kredit (id, naziv, oznaka, opis)
values (nextval('kredit_seq'), 'Kredit 2', 'Oznaka kredita 2', 'Opis kredita 2');

insert into kredit (id, naziv, oznaka, opis)
values (nextval('kredit_seq'), 'Kredit 3', 'Oznaka kredita 3', 'Opis kredita 3');

insert into kredit (id, naziv, oznaka, opis)
values (nextval('kredit_seq'), 'Kredit 4', 'Oznaka kredita 4', 'Opis kredita 4');

insert into kredit (id, naziv, oznaka, opis)
values (nextval('kredit_seq'), 'Kredit 5', 'Oznaka kredita 5', 'Opis kredita 5');

insert into kredit (id, naziv, oznaka, opis)
values (-100, 'test', 'test', 'test');

--tip racuna
insert into tip_racuna (id, naziv, oznaka, opis)
values (nextval('tip_racuna_seq'), 'Tip 1', 'Oznaka 1', 'Opis 1');

insert into tip_racuna (id, naziv, oznaka, opis)
values (nextval('tip_racuna_seq'), 'Tip 2', 'Oznaka 2', 'Opis 2');

insert into tip_racuna (id, naziv, oznaka, opis)
values (nextval('tip_racuna_seq'), 'Tip 3', 'Oznaka 3', 'Opis 3');

insert into tip_racuna (id, naziv, oznaka, opis)
values (nextval('tip_racuna_seq'), 'Tip 4', 'Oznaka 4', 'Opis 4');

insert into tip_racuna (id, naziv, oznaka, opis)
values (nextval('tip_racuna_seq'), 'Tip 5', 'Oznaka 5', 'Opis 5');

insert into tip_racuna (id, naziv, oznaka, opis)
values (-100, 'test', 'test', 'test');

--klijent
insert into klijent (id, ime, prezime, broj_lk, kredit)
values (nextval('klijent_seq'), 'Nikola', 'Nikolic', 1, 1);

insert into klijent (id, ime, prezime, broj_lk, kredit)
values (nextval('klijent_seq'), 'Ana', 'Anic', 2, 2);

insert into klijent (id, ime, prezime, broj_lk, kredit)
values (nextval('klijent_seq'), 'Milica', 'Peric', 3, 1);

insert into klijent (id, ime, prezime, broj_lk, kredit)
values (nextval('klijent_seq'), 'Maja', 'Andjelic', 5, 2);

insert into klijent (id, ime, prezime, broj_lk, kredit)
values (nextval('klijent_seq'), 'Katarina', 'Radojic', 4, 1);

insert into klijent (id, ime, prezime, broj_lk, kredit)
values (-100, 'test', 'test', 2, 1);

--racun
insert into racun (id, naziv, oznaka, opis, tip_racuna, klijent)
values (nextval('racun_seq'), 'Naziv 1', 'Oznaka 1', 'Opis 1', 1, 3);

insert into racun (id, naziv, oznaka, opis, tip_racuna, klijent)
values (nextval('racun_seq'), 'Naziv 2', 'Oznaka 2', 'Opis 2', 4, 2);

insert into racun (id, naziv, oznaka, opis, tip_racuna, klijent)
values (nextval('racun_seq'), 'Naziv 3', 'Oznaka 3', 'Opis 3', 3, 5);

insert into racun (id, naziv, oznaka, opis, tip_racuna, klijent)
values (nextval('racun_seq'), 'Naziv 4', 'Oznaka 4', 'Opis 4', 2, 3);

insert into racun (id, naziv, oznaka, opis, tip_racuna, klijent)
values (nextval('racun_seq'), 'Naziv 5', 'Oznaka 5', 'Opis 5', 5, 1);

insert into racun (id, naziv, oznaka, opis, tip_racuna, klijent)
values (-100, 'test', 'test', 'test', 1, 2);
