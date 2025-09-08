/*
Conversões simples do formato ISP -> OZmap.
*/


export function transformCable(ispCable: any) {
    return {
    id: `cable-${ispCable.id}`,
    name: ispCable.name,
    capacity: ispCable.capacity,
    geometry: {
    type: 'LineString',
    coordinates: ispCable.path.map((p: any) => [p.lng, p.lat])
    },
    boxes: ispCable.boxes_connected
    };
    }
    
    
    export function transformBox(ispBox: any) {
    return {
    id: `box-${ispBox.id}`,
    name: ispBox.name,
    type: ispBox.type,
    geometry: { type: 'Point', coordinates: [ispBox.lng, ispBox.lat] }
    };
    }
    
    
    export function transformDrop(ispDrop: any) {
    return {
    id: `drop-${ispDrop.id}`,
    name: ispDrop.name,
    boxId: `box-${ispDrop.box_id}`,
    customerId: `customer-${ispDrop.customer_id}`
    };
    }
    
    
    export function transformCustomer(ispCustomer: any) {
    return {
    id: `customer-${ispCustomer.id}`,
    code: ispCustomer.code,
    name: ispCustomer.name,
    address: ispCustomer.address,
    boxId: `box-${ispCustomer.box_id}`
    };
    }