INSERT INTO user (name)
VALUES ("El-entreprenad"),
       ("Grundläggnings-entreprenad"),
       ("VVS-entreprenad");

INSERT INTO unit (user_id, name)
VALUES (1, "m"),
       (1, "kg"),
       (1, "m3"),
       (1, "cm");


INSERT INTO material (user_id, name)
VALUES (1, "Betong"),
       (1, "Armering");

INSERT INTO recycle_type (name)
VALUES ("Nytt"),
       ("Återvunnet");

INSERT INTO meta_material (name, unit_id)
VALUES ("CO2", 2);

INSERT INTO material_has_meta (meta_material_id, material_id, recycle_type_id, unit_id, amount)
VALUES (1, 1, 1, 1, 4);

INSERT INTO composite_material (user_id, name, unit_id)
VALUES (1, "Betong", 3),
       (1, "Armering", 1),
       (1, "Armerad-betong", 1);

INSERT INTO composite_has_material (composite_material_id, material_id, recycle_type_id, unit_id, amount)
VALUES (1, 1, 2, 2, 1),
       (2, 2, 1, 1, 1),
       (3, 1, 1, 1, 1),
       (3, 2, 1, 1, 1);

INSERT INTO record_state (name)
VALUES ("ACTIVE"),
       ("DELETED"),
       ("REPORTED");

INSERT INTO used_material(user_id, composite_material_id, amount, comment)
VALUES (1, 1, 8, "Första våningsplanet");

SELECT *
FROM user;


