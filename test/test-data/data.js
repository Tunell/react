const usedMaterialAluminium = {
  used_has_material_id: 1,
  used_has_material_name: 'Aluminium',
  material_id: 1,
  amount: 8,
  material_type_id: 1,
  material_type_name: 'raw_material',
  recycle_type_id: 1,
  recycle_type_name: 'Ej återvunnet/återanvänt',
  unit_id: 1,
  unit_name: 'kg',
}

const usedMaterialGolv = {
  name: 'Golv',
  unit_id: 6,
  unit_name: 'st',
  composite_has_materials: [
    {
      material_id: 4,
      material_name: 'Betong',
      recycle_type_id: 4,
      recycle_type_name: 'Miljöcertifierat (FSC eller Svanen)',
      unit_id: 2,
      unit_name: 'm3',
      amount: 1
    },
    {
      material_id: 11,
      material_name: 'Cellplast',
      recycle_type_id: 1,
      recycle_type_name: 'Ej återvunnet/återanvänt',
      unit_id: 5,
      unit_name: 'L',
      amount: 1
    },
    {
      material_id: 12,
      material_name: 'Koppar',
      recycle_type_id: 2,
      recycle_type_name: 'Återvunnet/återanvänt',
      unit_id: 2,
      unit_name: 'm3',
      amount: 1
    }
  ],
  amount: 1,
  comment: 'yy',
  used_has_material_name: 'Golv',
  material_type_id: 2,
  material_type_name: 'composite_material'
}

const materials = { '1':
  { id: 1,
    name: 'Aluminium',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T09:45:40.000Z',
    kg_per_m3: 2700,
    user_id: 1,
    user_name: 'Admin' },
  '2':
    { id: 2,
      name: 'Gips',
      created: '2017-09-10T07:45:22.000Z',
      changed: '2017-09-10T09:45:45.000Z',
      kg_per_m3: 650,
      user_id: 1,
      user_name: 'Admin' },
  '3':
    { id: 3,
      name: 'Trä',
      created: '2017-09-10T07:45:22.000Z',
      changed: '2017-09-10T09:46:27.000Z',
      kg_per_m3: 1500,
      user_id: 1,
      user_name: 'Admin' },
  '4':
    { id: 4,
      name: 'Betong',
      created: '2017-09-10T07:45:22.000Z',
      changed: '2017-09-10T09:46:01.000Z',
      kg_per_m3: 2500,
      user_id: 1,
      user_name: 'Admin' },
  '5':
    { id: 5,
      name: 'Glas',
      created: '2017-09-10T07:45:22.000Z',
      changed: '2017-09-10T09:46:01.000Z',
      kg_per_m3: 2500,
      user_id: 1,
      user_name: 'Admin' },
  '6':
    { id: 6,
      name: 'Plast(PP)',
      created: '2017-09-10T07:45:22.000Z',
      changed: '2017-09-10T09:46:01.000Z',
      kg_per_m3: 950,
      user_id: 1,
      user_name: 'Admin' },
  '7':
    { id: 7,
      name: 'Handelsstål',
      created: '2017-09-10T07:45:22.000Z',
      changed: '2017-09-10T09:46:01.000Z',
      kg_per_m3: 7800,
      user_id: 1,
      user_name: 'Admin' },
  '8':
    { id: 8,
      name: 'Armering',
      created: '2017-09-10T07:45:22.000Z',
      changed: '2017-09-10T09:46:01.000Z',
      kg_per_m3: 7800,
      user_id: 1,
      user_name: 'Admin' },
  '9':
    { id: 9,
      name: 'Plåt',
      created: '2017-09-10T07:45:22.000Z',
      changed: '2017-09-10T09:46:01.000Z',
      kg_per_m3: 7800,
      user_id: 1,
      user_name: 'Admin' },
  '10':
    { id: 10,
      name: 'Stenull',
      created: '2017-09-10T07:45:22.000Z',
      changed: '2017-09-10T09:46:01.000Z',
      kg_per_m3: 90,
      user_id: 1,
      user_name: 'Admin' },
  '11':
    { id: 11,
      name: 'Cellplast',
      created: '2017-09-10T07:45:22.000Z',
      changed: '2017-09-10T09:46:01.000Z',
      kg_per_m3: 20,
      user_id: 1,
      user_name: 'Admin' },
  '12':
    { id: 12,
      name: 'Koppar',
      created: '2017-09-10T07:45:22.000Z',
      changed: '2017-09-10T09:46:01.000Z',
      kg_per_m3: 8960,
      user_id: 1,
      user_name: 'Admin' } }

module.exports = { usedMaterialAluminium, usedMaterialGolv, materials }
