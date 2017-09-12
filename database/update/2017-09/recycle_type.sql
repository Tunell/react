UPDATE `byggstyrning`.`recycle_type` SET `name`='Återvunnen' WHERE `id`='1';
UPDATE `byggstyrning`.`recycle_type` SET `name`='Ej återvunnen/återbrukad/vet ej' WHERE `id`='2';
UPDATE `byggstyrning`.`recycle_type` SET `name`='Återbrukat' WHERE `id`='3';
INSERT INTO `byggstyrning`.`recycle_type` (`id`, `name`) VALUES ('4', 'Miljöcertifierat (FCS eller Svanen)');
