module.exports = [
  {
    id: 1,
    user_id: 3,
    user_name: 'Grundläggnings-entreprenad',
    used_has_material_id: 1,
    used_has_material_name: 'Aluminium',
    material_id: 1,
    record_state_id: 1,
    record_state_name: 'ACTIVE',
    comment: 'En kommentar',
    amount: 8,
    material_type_id: 1,
    material_type_name: 'raw_material',
    recycle_type_id: 1,
    recycle_type_name: 'Ej återvunnet/återanvänt',
    unit_id: 1,
    unit_name: 'kg',
    created: '2017-09-14T19:44:22.000Z',
    changed: '2017-09-14T19:44:22.000Z'
  },
  {
    id: 2,
    user_id: 3,
    user_name: 'Grundläggnings-entreprenad',
    name: 'Test_material',
    unit_id: 1,
    unit_name: 'kg',
    created: '2017-09-14T19:44:22.000Z',
    changed: '2017-09-14T19:44:22.000Z',
    composite_has_materials: [
      {
        composite_material_id: 1,
        material_id: 1,
        material_name: 'Aluminium',
        recycle_type_id: 1,
        recycle_type_name: 'Ej återvunnet/återanvänt',
        unit_id: 1,
        unit_name: 'kg',
        amount: 1
      },
      {
        composite_material_id: 1,
        material_id: 2,
        material_name: 'Gips',
        recycle_type_id: 2,
        recycle_type_name: 'Återvunnet/återanvänt',
        unit_id: 2,
        unit_name: 'm3',
        amount: 3
      }
    ],
    amount: 12,
    comment: 'En annan kommentar',
    used_has_material_name: 'Test_material',
    used_has_material_id: 1,
    record_state_id: 1,
    record_state_name: 'ACTIVE',
    material_type_id: 2,
    material_type_name: 'composite_material'
  }
]

