INSERT INTO user (name)
VALUES ("Admin"),
       ("El-entreprenad"),
       ("Grundläggnings-entreprenad"),
       ("VVS-entreprenad");

INSERT INTO unit (user_id, name)
VALUES (1, "kg"),
       (1, "m3"),
       (1, "m2"),
       (1, "m");


INSERT INTO material (user_id, name)
VALUES (1, "Aluminium"),
       (1, "Gips"),
       (1, "Sand"),
       (1, "Trä"),
       (1, "Tegel"),
       (1, "Cement"),
       (1, "Betong"),
       (1, "Mattor"),
       (1, "Glas"),
       (1, "Isolering"),
       (1, "Stål");

INSERT INTO recycle_type (name)
VALUES ("Ej återvunnet/återanvänt"),
       ("Återvunnet/återanvänt"),
       ("Vet Ej");

INSERT INTO meta_material (name, unit_id)
VALUES ("CO2", 2);

INSERT INTO material_has_meta (meta_material_id, material_id, recycle_type_id, unit_id, amount)
VALUES (1, 1, 1, 1, 1),
       (1, 1, 2, 1, 1),
       (1, 1, 3, 1, 1),

       (1, 2, 1, 1, 1),
       (1, 2, 2, 1, 1),
       (1, 2, 3, 1, 1),

       (1, 3, 1, 1, 1),
       (1, 3, 2, 1, 1),
       (1, 3, 3, 1, 1),

       (1, 4, 1, 1, 1),
       (1, 4, 2, 1, 1),
       (1, 4, 3, 1, 1),

       (1, 5, 1, 1, 1),
       (1, 5, 2, 1, 1),
       (1, 5, 3, 1, 1),

       (1, 6, 1, 1, 1),
       (1, 6, 2, 1, 1),
       (1, 6, 3, 1, 1),

       (1, 7, 1, 1, 1),
       (1, 7, 2, 1, 1),
       (1, 7, 3, 1, 1),

       (1, 8, 1, 1, 1),
       (1, 8, 2, 1, 1),
       (1, 8, 3, 1, 1),

       (1, 9, 1, 1, 1),
       (1, 9, 2, 1, 1),
       (1, 9, 3, 1, 1),

       (1, 10, 1, 1, 1),
       (1, 10, 2, 1, 1),
       (1, 10, 3, 1, 1),

       (1, 11, 1, 1, 1),
       (1, 11, 2, 1, 1),
       (1, 11, 3, 1, 1);

INSERT INTO composite_material (user_id, name, unit_id)
VALUES (1, "Aluminium", 1),
       (1, "Gips", 1),
       (1, "Sand", 1),
       (1, "Trä", 1),
       (1, "Tegel", 1),
       (1, "Cement", 1),
       (1, "Betong", 1),
       (1, "Mattor", 1),
       (1, "Glas", 1),
       (1, "Isolering", 1),
       (1, "Stål", 1);

INSERT INTO composite_has_material (composite_material_id, material_id, recycle_type_id, unit_id, amount)
VALUES (1, 1, 3, 1, 1),
       (2, 2, 3, 1, 1),
       (3, 3, 3, 1, 1),
       (4, 4, 3, 1, 1),
       (5, 5, 3, 1, 1),
       (6, 6, 3, 1, 1),
       (7, 7, 3, 1, 1),
       (8, 8, 3, 1, 1),
       (9, 9, 3, 1, 1),
       (10, 10, 3, 1, 1),
       (11, 11, 3, 1, 1);


INSERT INTO record_state (name)
VALUES ("ACTIVE"),
       ("DELETED"),
       ("REPORTED");

INSERT INTO used_material(user_id, composite_material_id, amount, comment)
VALUES (1, 1, 8, "En kommentar");

SELECT *
FROM user;


