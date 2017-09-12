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

const usedMaterialProvare = {
  id: 14,
  user_id: 2,
  user_name: 'El-entreprenad',
  name: 'provare',
  unit_id: 6,
  unit_name: 'st',
  created: '2017-09-12T21:43:35.000Z',
  changed: '2017-09-12T21:43:35.000Z',
  composite_has_materials: [
    {
      composite_material_id: 8,
      material_id: 4,
      material_name: 'Betong',
      recycle_type_id: 4,
      recycle_type_name: 'Miljöcertifierat (FSC eller Svanen)',
      unit_id: 2,
      unit_name: 'm3',
      amount: 1
    },
    {
      composite_material_id: 8,
      material_id: 11,
      material_name: 'Cellplast',
      recycle_type_id: 1,
      recycle_type_name: 'Ej återvunnet/återanvänt',
      unit_id: 5,
      unit_name: 'L',
      amount: 1
    },
    {
      composite_material_id: 8,
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
  used_has_material_name: 'provare',
  used_has_material_id: 8,
  record_state_id: 1,
  record_state_name: 'ACTIVE',
  material_type_id: 2,
  materyal_type_name: 'composite_material'
}

const compositeMaterials = [
  {
    id: 1,
    user_id: 3,
    user_name: 'Grundläggnings-entreprenad',
    name: 'Test_material',
    unit_id: 1,
    unit_name: 'kg',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T07:45:22.000Z',
    composite_has_materials: [
      {
        material_id: 1,
        material_name: 'Aluminium',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 1,
        unit_name: 'kg',
        amount: 1
      },
      {
        material_id: 2,
        material_name: 'Gips',
        recycle_type_id: 2,
        recycle_type_name: 'Återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 3
      }
    ]
  },
  {
    id: 2,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'ewretw',
    unit_id: 1,
    unit_name: 'kg',
    created: '2017-09-10T09:04:07.000Z',
    changed: '2017-09-10T09:04:07.000Z',
    composite_has_materials: [
      {
        material_id: 4,
        material_name: 'Betong',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 10
      }
    ]
  },
  {
    id: 3,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'ertret',
    unit_id: 2,
    unit_name: 'm3',
    created: '2017-09-10T10:42:00.000Z',
    changed: '2017-09-10T10:42:00.000Z',
    composite_has_materials: [
      {
        material_id: 8,
        material_name: 'Armering',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 1,
        unit_name: 'kg',
        amount: 21
      }
    ]
  },
  {
    id: 4,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'terter',
    unit_id: 1,
    unit_name: 'kg',
    created: '2017-09-10T12:14:43.000Z',
    changed: '2017-09-10T12:14:43.000Z',
    composite_has_materials: [
      {
        material_id: 8,
        material_name: 'Armering',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 12
      }
    ]
  },
  {
    id: 5,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'krere',
    unit_id: 2,
    unit_name: 'm3',
    created: '2017-09-10T20:51:11.000Z',
    changed: '2017-09-10T20:51:11.000Z',
    composite_has_materials: [
      {
        material_id: 4,
        material_name: 'Betong',
        recycle_type_id: 2,
        recycle_type_name: 'Återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 10
      }
    ]
  },
  {
    id: 6,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'ges',
    unit_id: 2,
    unit_name: 'm3',
    created: '2017-09-10T20:52:29.000Z',
    changed: '2017-09-10T20:52:29.000Z',
    composite_has_materials: [
      {
        material_id: 5,
        material_name: 'Glas',
        recycle_type_id: 2,
        recycle_type_name: 'Återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      }
    ]
  },
  {
    id: 7,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'prov',
    unit_id: 4,
    unit_name: 'm',
    created: '2017-09-12T21:40:27.000Z',
    changed: '2017-09-12T21:40:27.000Z',
    composite_has_materials: [
      {
        material_id: 1,
        material_name: 'Aluminium',
        recycle_type_id: 3,
        recycle_type_name: 'Vet Ej',
        unit_id: 2,
        unit_name: 'm3',
        amount: 10
      }
    ]
  },
  {
    id: 8,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'provare',
    unit_id: 6,
    unit_name: 'st',
    created: '2017-09-12T21:43:18.000Z',
    changed: '2017-09-12T21:43:18.000Z',
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
    ]
  }
]

const materials = [
  {
    id: 1,
    name: 'Aluminium',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T09:45:40.000Z',
    kg_per_m3: 2700,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 2,
    name: 'Gips',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T09:45:45.000Z',
    kg_per_m3: 650,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 3,
    name: 'Trä',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T09:46:27.000Z',
    kg_per_m3: 1500,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 4,
    name: 'Betong',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T09:46:01.000Z',
    kg_per_m3: 2500,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 5,
    name: 'Glas',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T09:46:01.000Z',
    kg_per_m3: 2500,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 6,
    name: 'Plast(PP)',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T09:46:01.000Z',
    kg_per_m3: 950,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 7,
    name: 'Handelsstål',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T09:46:01.000Z',
    kg_per_m3: 7800,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 8,
    name: 'Armering',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T09:46:01.000Z',
    kg_per_m3: 7800,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 9,
    name: 'Plåt',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T09:46:01.000Z',
    kg_per_m3: 7800,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 10,
    name: 'Stenull',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T09:46:01.000Z',
    kg_per_m3: 90,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 11,
    name: 'Cellplast',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T09:46:01.000Z',
    kg_per_m3: 20,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 12,
    name: 'Koppar',
    created: '2017-09-10T07:45:22.000Z',
    changed: '2017-09-10T09:46:01.000Z',
    kg_per_m3: 8960,
    user_id: 1,
    user_name: 'Admin'
  }
]

const materialsMap = { '1':
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

module.exports = { usedMaterialAluminium, usedMaterialProvare, compositeMaterials, materials, materialsMap }
