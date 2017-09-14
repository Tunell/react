const compositeMaterialsComputation = [
  {
    id: 1,
    user_id: 3,
    user_name: 'Grundläggnings-entreprenad',
    name: 'Test_material',
    unit_id: 1,
    unit_name: 'kg',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
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
    name: 'john1',
    unit_id: 1,
    unit_name: 'kg',
    created: '2017-09-14T06:25:12.000Z',
    changed: '2017-09-14T06:25:12.000Z',
    composite_has_materials: [
      {
        material_id: 1,
        material_name: 'Aluminium',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      },
      {
        material_id: 1,
        material_name: 'Aluminium',
        recycle_type_id: 4,
        recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      },
      {
        material_id: 1,
        material_name: 'Aluminium',
        recycle_type_id: 3,
        recycle_type_name: 'Vet Ej',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      },
      {
        material_id: 1,
        material_name: 'Aluminium',
        recycle_type_id: 2,
        recycle_type_name: 'Återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      }
    ]
  },
  {
    id: 3,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'john2',
    unit_id: 2,
    unit_name: 'm3',
    created: '2017-09-14T06:28:04.000Z',
    changed: '2017-09-14T06:28:04.000Z',
    composite_has_materials: [
      {
        material_id: 8,
        material_name: 'Armering',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      },
      {
        material_id: 10,
        material_name: 'Stenull',
        recycle_type_id: 4,
        recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      },
      {
        material_id: 11,
        material_name: 'Cellplast',
        recycle_type_id: 3,
        recycle_type_name: 'Vet Ej',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      }
    ]
  },
  {
    id: 4,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'john3',
    unit_id: 2,
    unit_name: 'm3',
    created: '2017-09-14T06:31:09.000Z',
    changed: '2017-09-14T06:31:09.000Z',
    composite_has_materials: [
      {
        material_id: 3,
        material_name: 'Trä',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 1,
        unit_name: 'kg',
        amount: 2
      },
      {
        material_id: 3,
        material_name: 'Trä',
        recycle_type_id: 4,
        recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
        unit_id: 1,
        unit_name: 'kg',
        amount: 2
      },
      {
        material_id: 3,
        material_name: 'Trä',
        recycle_type_id: 3,
        recycle_type_name: 'Vet Ej',
        unit_id: 1,
        unit_name: 'kg',
        amount: 2
      },
      {
        material_id: 3,
        material_name: 'Trä',
        recycle_type_id: 2,
        recycle_type_name: 'Återvunnet/återanvänt',
        unit_id: 1,
        unit_name: 'kg',
        amount: 2
      }
    ]
  },
  {
    id: 6,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'dubbel',
    unit_id: 4,
    unit_name: 'm',
    created: '2017-09-14T06:36:47.000Z',
    changed: '2017-09-14T06:36:47.000Z',
    composite_has_materials: [
      {
        material_id: 4,
        material_name: 'Betong',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      }
    ]
  },
  {
    id: 5,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'random',
    unit_id: 4,
    unit_name: 'm',
    created: '2017-09-14T06:34:49.000Z',
    changed: '2017-09-14T06:34:49.000Z',
    composite_has_materials: [
      {
        material_id: 2,
        material_name: 'Gips',
        recycle_type_id: 4,
        recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
        unit_id: 2,
        unit_name: 'm3',
        amount: 12
      },
      {
        material_id: 5,
        material_name: 'Glas',
        recycle_type_id: 4,
        recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
        unit_id: 1,
        unit_name: 'kg',
        amount: 10
      },
      {
        material_id: 5,
        material_name: 'Glas',
        recycle_type_id: 4,
        recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      },
      {
        material_id: 2,
        material_name: 'Gips',
        recycle_type_id: 2,
        recycle_type_name: 'Återvunnet/återanvänt',
        unit_id: 5,
        unit_name: 'L',
        amount: 1000
      }
    ]
  }
]

const usedMaterialsComputation = [
  {
    id: 4,
    user_id: 2,
    user_name: 'El-entreprenad',
    used_has_material_id: 2,
    used_has_material_name: 'Gips',
    material_id: 2,
    record_state_id: 1,
    record_state_name: 'ACTIVE',
    comment: 'ej ater',
    amount: 1,
    material_type_id: 1,
    material_type_name: 'raw_material',
    recycle_type_id: 1,
    recycle_type_name: 'Ej återvunnet/återanvänt',
    unit_id: 1,
    unit_name: 'kg',
    created: '2017-09-14T06:25:50.000Z',
    changed: '2017-09-14T06:25:50.000Z'
  },
  {
    id: 5,
    user_id: 2,
    user_name: 'El-entreprenad',
    used_has_material_id: 3,
    used_has_material_name: 'Trä',
    material_id: 3,
    record_state_id: 1,
    record_state_name: 'ACTIVE',
    comment: 'miljo',
    amount: 1,
    material_type_id: 1,
    material_type_name: 'raw_material',
    recycle_type_id: 4,
    recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
    unit_id: 1,
    unit_name: 'kg',
    created: '2017-09-14T06:26:13.000Z',
    changed: '2017-09-14T06:26:13.000Z'
  },
  {
    id: 6,
    user_id: 2,
    user_name: 'El-entreprenad',
    used_has_material_id: 4,
    used_has_material_name: 'Betong',
    material_id: 4,
    record_state_id: 1,
    record_state_name: 'ACTIVE',
    comment: 'vet ej',
    amount: 1,
    material_type_id: 1,
    material_type_name: 'raw_material',
    recycle_type_id: 3,
    recycle_type_name: 'Vet Ej',
    unit_id: 1,
    unit_name: 'kg',
    created: '2017-09-14T06:26:41.000Z',
    changed: '2017-09-14T06:26:41.000Z'
  },
  {
    id: 7,
    user_id: 2,
    user_name: 'El-entreprenad',
    used_has_material_id: 5,
    used_has_material_name: 'Glas',
    material_id: 5,
    record_state_id: 1,
    record_state_name: 'ACTIVE',
    comment: 'ater',
    amount: 1,
    material_type_id: 1,
    material_type_name: 'raw_material',
    recycle_type_id: 2,
    recycle_type_name: 'Återvunnet/återanvänt',
    unit_id: 1,
    unit_name: 'kg',
    created: '2017-09-14T06:27:08.000Z',
    changed: '2017-09-14T06:27:08.000Z'
  },
  {
    id: 3,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'john1',
    unit_id: 1,
    unit_name: 'kg',
    created: '2017-09-14T06:25:21.000Z',
    changed: '2017-09-14T06:25:21.000Z',
    composite_has_materials: [
      {
        composite_material_id: 2,
        material_id: 1,
        material_name: 'Aluminium',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      },
      {
        composite_material_id: 2,
        material_id: 1,
        material_name: 'Aluminium',
        recycle_type_id: 2,
        recycle_type_name: 'Återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      },
      {
        composite_material_id: 2,
        material_id: 1,
        material_name: 'Aluminium',
        recycle_type_id: 3,
        recycle_type_name: 'Vet Ej',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      },
      {
        composite_material_id: 2,
        material_id: 1,
        material_name: 'Aluminium',
        recycle_type_id: 4,
        recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      }
    ],
    amount: 1,
    comment: 'alla',
    used_has_material_name: 'john1',
    used_has_material_id: 2,
    record_state_id: 1,
    record_state_name: 'ACTIVE',
    material_type_id: 2,
    material_type_name: 'composite_material'
  },
  {
    id: 8,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'john2',
    unit_id: 2,
    unit_name: 'm3',
    created: '2017-09-14T06:28:30.000Z',
    changed: '2017-09-14T06:28:30.000Z',
    composite_has_materials: [
      {
        composite_material_id: 3,
        material_id: 8,
        material_name: 'Armering',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      },
      {
        composite_material_id: 3,
        material_id: 10,
        material_name: 'Stenull',
        recycle_type_id: 4,
        recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      },
      {
        composite_material_id: 3,
        material_id: 11,
        material_name: 'Cellplast',
        recycle_type_id: 3,
        recycle_type_name: 'Vet Ej',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      }
    ],
    amount: 1,
    comment: 'prov',
    used_has_material_name: 'john2',
    used_has_material_id: 3,
    record_state_id: 1,
    record_state_name: 'ACTIVE',
    material_type_id: 2,
    material_type_name: 'composite_material'
  },
  {
    id: 9,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'john3',
    unit_id: 2,
    unit_name: 'm3',
    created: '2017-09-14T06:31:31.000Z',
    changed: '2017-09-14T06:31:31.000Z',
    composite_has_materials: [
      {
        composite_material_id: 4,
        material_id: 3,
        material_name: 'Trä',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 1,
        unit_name: 'kg',
        amount: 2
      },
      {
        composite_material_id: 4,
        material_id: 3,
        material_name: 'Trä',
        recycle_type_id: 2,
        recycle_type_name: 'Återvunnet/återanvänt',
        unit_id: 1,
        unit_name: 'kg',
        amount: 2
      },
      {
        composite_material_id: 4,
        material_id: 3,
        material_name: 'Trä',
        recycle_type_id: 3,
        recycle_type_name: 'Vet Ej',
        unit_id: 1,
        unit_name: 'kg',
        amount: 2
      },
      {
        composite_material_id: 4,
        material_id: 3,
        material_name: 'Trä',
        recycle_type_id: 4,
        recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
        unit_id: 1,
        unit_name: 'kg',
        amount: 2
      }
    ],
    amount: 1,
    comment: 'en',
    used_has_material_name: 'john3',
    used_has_material_id: 4,
    record_state_id: 1,
    record_state_name: 'ACTIVE',
    material_type_id: 2,
    material_type_name: 'composite_material'
  },
  {
    id: 10,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'john3',
    unit_id: 2,
    unit_name: 'm3',
    created: '2017-09-14T06:31:48.000Z',
    changed: '2017-09-14T06:31:48.000Z',
    composite_has_materials: [
      {
        composite_material_id: 4,
        material_id: 3,
        material_name: 'Trä',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 1,
        unit_name: 'kg',
        amount: 2
      },
      {
        composite_material_id: 4,
        material_id: 3,
        material_name: 'Trä',
        recycle_type_id: 2,
        recycle_type_name: 'Återvunnet/återanvänt',
        unit_id: 1,
        unit_name: 'kg',
        amount: 2
      },
      {
        composite_material_id: 4,
        material_id: 3,
        material_name: 'Trä',
        recycle_type_id: 3,
        recycle_type_name: 'Vet Ej',
        unit_id: 1,
        unit_name: 'kg',
        amount: 2
      },
      {
        composite_material_id: 4,
        material_id: 3,
        material_name: 'Trä',
        recycle_type_id: 4,
        recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
        unit_id: 1,
        unit_name: 'kg',
        amount: 2
      }
    ],
    amount: 2,
    comment: 'tva',
    used_has_material_name: 'john3',
    used_has_material_id: 4,
    record_state_id: 1,
    record_state_name: 'ACTIVE',
    material_type_id: 2,
    material_type_name: 'composite_material'
  },
  {
    id: 11,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'random',
    unit_id: 4,
    unit_name: 'm',
    created: '2017-09-14T06:34:59.000Z',
    changed: '2017-09-14T06:34:59.000Z',
    composite_has_materials: [
      {
        composite_material_id: 5,
        material_id: 2,
        material_name: 'Gips',
        recycle_type_id: 2,
        recycle_type_name: 'Återvunnet/återanvänt',
        unit_id: 5,
        unit_name: 'L',
        amount: 1000
      },
      {
        composite_material_id: 5,
        material_id: 2,
        material_name: 'Gips',
        recycle_type_id: 4,
        recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
        unit_id: 2,
        unit_name: 'm3',
        amount: 12
      },
      {
        composite_material_id: 5,
        material_id: 5,
        material_name: 'Glas',
        recycle_type_id: 4,
        recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
        unit_id: 1,
        unit_name: 'kg',
        amount: 10
      },
      {
        composite_material_id: 5,
        material_id: 5,
        material_name: 'Glas',
        recycle_type_id: 4,
        recycle_type_name: 'Miljöcertifierat (FCS eller Svanen)',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      }
    ],
    amount: 1,
    comment: 'en',
    used_has_material_name: 'random',
    used_has_material_id: 5,
    record_state_id: 1,
    record_state_name: 'ACTIVE',
    material_type_id: 2,
    material_type_name: 'composite_material'
  },
  {
    id: 12,
    user_id: 2,
    user_name: 'El-entreprenad',
    name: 'dubbel',
    unit_id: 4,
    unit_name: 'm',
    created: '2017-09-14T06:37:02.000Z',
    changed: '2017-09-14T06:37:02.000Z',
    composite_has_materials: [
      {
        composite_material_id: 6,
        material_id: 4,
        material_name: 'Betong',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 1
      }
    ],
    amount: 2,
    comment: 'dubb',
    used_has_material_name: 'dubbel',
    used_has_material_id: 6,
    record_state_id: 1,
    record_state_name: 'ACTIVE',
    material_type_id: 2,
    material_type_name: 'composite_material'
  }
]

const materialsComputation = [
  {
    id: 1,
    name: 'Aluminium',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
    kg_per_m3: 2700,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 2,
    name: 'Gips',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
    kg_per_m3: 650,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 3,
    name: 'Trä',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
    kg_per_m3: 1500,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 4,
    name: 'Betong',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
    kg_per_m3: 2500,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 5,
    name: 'Glas',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
    kg_per_m3: 2500,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 6,
    name: 'Plast(PP)',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
    kg_per_m3: 950,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 7,
    name: 'Handelsstål',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
    kg_per_m3: 7800,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 8,
    name: 'Armering',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
    kg_per_m3: 7800,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 9,
    name: 'Plåt',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
    kg_per_m3: 7800,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 10,
    name: 'Stenull',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
    kg_per_m3: 90,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 11,
    name: 'Cellplast',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
    kg_per_m3: 20,
    user_id: 1,
    user_name: 'Admin'
  },
  {
    id: 12,
    name: 'Koppar',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
    kg_per_m3: 8960,
    user_id: 1,
    user_name: 'Admin'
  }
]

const materialsMapComputation = { '1':
  { id: 1,
    name: 'Aluminium',
    created: '2017-09-14T06:23:25.000Z',
    changed: '2017-09-14T06:23:25.000Z',
    kg_per_m3: 2700,
    user_id: 1,
    user_name: 'Admin' },
  '2':
    { id: 2,
      name: 'Gips',
      created: '2017-09-14T06:23:25.000Z',
      changed: '2017-09-14T06:23:25.000Z',
      kg_per_m3: 650,
      user_id: 1,
      user_name: 'Admin' },
  '3':
    { id: 3,
      name: 'Trä',
      created: '2017-09-14T06:23:25.000Z',
      changed: '2017-09-14T06:23:25.000Z',
      kg_per_m3: 1500,
      user_id: 1,
      user_name: 'Admin' },
  '4':
    { id: 4,
      name: 'Betong',
      created: '2017-09-14T06:23:25.000Z',
      changed: '2017-09-14T06:23:25.000Z',
      kg_per_m3: 2500,
      user_id: 1,
      user_name: 'Admin' },
  '5':
    { id: 5,
      name: 'Glas',
      created: '2017-09-14T06:23:25.000Z',
      changed: '2017-09-14T06:23:25.000Z',
      kg_per_m3: 2500,
      user_id: 1,
      user_name: 'Admin' },
  '6':
    { id: 6,
      name: 'Plast(PP)',
      created: '2017-09-14T06:23:25.000Z',
      changed: '2017-09-14T06:23:25.000Z',
      kg_per_m3: 950,
      user_id: 1,
      user_name: 'Admin' },
  '7':
    { id: 7,
      name: 'Handelsstål',
      created: '2017-09-14T06:23:25.000Z',
      changed: '2017-09-14T06:23:25.000Z',
      kg_per_m3: 7800,
      user_id: 1,
      user_name: 'Admin' },
  '8':
    { id: 8,
      name: 'Armering',
      created: '2017-09-14T06:23:25.000Z',
      changed: '2017-09-14T06:23:25.000Z',
      kg_per_m3: 7800,
      user_id: 1,
      user_name: 'Admin' },
  '9':
    { id: 9,
      name: 'Plåt',
      created: '2017-09-14T06:23:25.000Z',
      changed: '2017-09-14T06:23:25.000Z',
      kg_per_m3: 7800,
      user_id: 1,
      user_name: 'Admin' },
  '10':
    { id: 10,
      name: 'Stenull',
      created: '2017-09-14T06:23:25.000Z',
      changed: '2017-09-14T06:23:25.000Z',
      kg_per_m3: 90,
      user_id: 1,
      user_name: 'Admin' },
  '11':
    { id: 11,
      name: 'Cellplast',
      created: '2017-09-14T06:23:25.000Z',
      changed: '2017-09-14T06:23:25.000Z',
      kg_per_m3: 20,
      user_id: 1,
      user_name: 'Admin' },
  '12':
    { id: 12,
      name: 'Koppar',
      created: '2017-09-14T06:23:25.000Z',
      changed: '2017-09-14T06:23:25.000Z',
      kg_per_m3: 8960,
      user_id: 1,
      user_name: 'Admin' } }

module.exports = { compositeMaterialsComputation, materialsComputation, materialsMapComputation, usedMaterialsComputation }