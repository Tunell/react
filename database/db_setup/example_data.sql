INSERT INTO user (name)
VALUES ("White Arkitekter"),
  ("ÅF Ljud och vibrationer"),
  ("Knut Jönsson Ingenjörsbyrå AB"),
  (Incoord),
  (Nordiska brand),
  (ÅF Infrastructure AB),
  (Structor),
  (HissProjekt Mattias Högman AB),
  (Briab),
  (ACC Glasrådgivare),
  (Storköksbyrån i Stockholm AB);

INSERT INTO used_material(user_id, material_type_id, amount, comment)
VALUES (3, 1, 8, "En kommentar"),
  (3, 2, 12, "En annan kommentar");

INSERT INTO raw_material(unit_id, recycle_type_id, material_id)
VALUES (1, 1, 1);

INSERT INTO used_has_raw_material(used_material_id, raw_material_id)
VALUES (1, 1);

INSERT INTO composite_material (user_id, name, unit_id)
VALUES
  (3, "Test_material", 1);

INSERT INTO composite_has_material (composite_material_id, material_id, recycle_type_id, unit_id, amount)
VALUES
  (1, 1, 1, 1, 1),
  (1, 2, 2, 2, 3);

INSERT INTO used_has_composite_material(used_material_id, composite_material_id)
VALUES (2, 1);