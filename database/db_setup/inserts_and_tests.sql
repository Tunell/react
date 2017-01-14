INSERT INTO user (username, password,email)
VALUES ("El-entreprenad", "test", "tunell.john@gmail.com"),
       ("Grundläggnings-entreprenad", "test", ""),
       ("VVS-entreprenad", "test", "");

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

INSERT INTO used_material(user_id, composite_material_id, amount, comment)
VALUES (1, 1, 8, "Första våningsplanet");

SELECT *
FROM user;

-- SOME TEST CASES

-- PARAGRAPH BELOW SHOULD FAIL

DELETE FROM user WHERE id = 1;
DELETE FROM composite_material WHERE id = 1;
DELETE FROM unit WHERE id = 1;
DELETE FROM material WHERE id = 1;
DELETE FROM recycle_type WHERE id = 1;
DELETE FROM meta_material WHERE id = 1;

-- PARAGRAPH BELOW SHOULD SUCCEED

DELETE FROM used_material WHERE id = 1;
DELETE FROM composite_has_material WHERE composite_material_id = 1;
DELETE FROM composite_material WHERE id = 1;
DELETE FROM material_has_meta WHERE meta_material_id = 1;
DELETE FROM composite_has_material where recycle_type_id = 1;
DELETE FROM recycle_type WHERE id = 1;
DELETE FROM material WHERE id = 1;
DELETE FROM meta_material WHERE id = 1;


