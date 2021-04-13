--kredit
insert into kredit
values (1, 'naziv1', 'oznaka1', 'opis1');

insert into kredit
values (2, 'naziv2', 'oznaka2', 'opis2');

insert into kredit
values (-100, 'test', 'test', 'test');

--tip racuna
insert into tip_racuna
values (1, 'tip1', 'oznaka1', 'opis1');

insert into tip_racuna
values (2, 'tip2', 'oznaka2', 'opis2');

insert into tip_racuna
values (-100, 'test', 'test', 'test');

--klijent
insert into klijent
values (1, 'ime1', 'prezime1', 1, 1);

insert into klijent
values (2, 'ime2', 'prezime2', 2, 2);

insert into klijent
values (-100, 'test', 'test', 2, 1);

--racun
insert into racun
values (1, 'naziv1', 'oznaka1', 'opis1', 1, 1);

insert into racun
values (2, 'naziv2', 'oznaka2', 'opis2', 2, 2);

insert into racun
values (-100, 'test', 'test', 'test', 1, 2);
