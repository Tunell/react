INSERT INTO`byggstyrning`.`recycle_type` (id,name)
    VALUES
    (1,"Återvunnen"),
    (2,"Ej återvunnen/återbrukad/vet ej"),
    (3,"Återbrukat"),
    (4,"Miljöcertifierat (FSC eller Svanen)")
    ON DUPLICATE KEY UPDATE
        name = VALUES(name);