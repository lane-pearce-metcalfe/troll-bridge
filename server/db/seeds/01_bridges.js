export async function seed(knex) {
  await knex('bridges').del()

  await knex('bridges').insert([
    {
      id: 1,
      name: 'Auckland Harbour Bridge',
      location: 'Auckland',
      type: 'Cantilever Bridge',
      length: 1020,
      height: 43,
      year_built: 1959,
      added_by: null,
      troll_owner: null,
      lat: -36.83084262833497,
      lng: 174.74537693805735,
      img_url:
        'https://www.wsp.com/-/media/project/new-zealand/images/portrait-and-landscape/img-auckland-harbour-bridge.jpg?h=650&iar=0&w=1300&hash=227353A18E8E8E2AAE18A4ACB207ECB0',
    },
    {
      id: 2,
      name: 'Mangere Bridge',
      location: 'Auckland',
      type: 'Dual Motorway and Pedestrian Bridge',
      length: 260,
      height: 60,
      year_built: 1875,
      added_by: null,
      troll_owner: null,
      lat: -36.93356484322265,
      lng: 174.78821052136408,
      img_url:
        'https://media.rnztools.nz/rnz/image/upload/s--jiqjqcH7--/ar_16:10,c_fill,f_auto,g_auto,q_auto,w_1050/v1661393135/4LN581C_Mangerebridge_jpg?_a=BACCd2AD',
    },
    {
      id: 3,
      name: 'Wynyard Crossing',
      location: 'Auckland',
      type: 'Pedestrian Bridge',
      length: 50,
      height: 50,
      year_built: 2011,
      added_by: null,
      troll_owner: null,
      lat: -36.84120909657493,
      lng: 174.75965852267197,
      img_url:
        'https://upload.wikimedia.org/wikipedia/commons/3/35/Wynyard_Crossing%2C_bridge_in_Wynyard_Quarter%2C_Auckland..jpg',
    },
  ])
}
