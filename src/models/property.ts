export class Property {
    id: string;
    pro_name: string;
    published: string;
    category_id: string;
    pro_type: string;
    bath_room:string;
    bed_room: string;
    city: string;
    curr: string;
    price: string;
    image: string;
    parking: string;
    pro_full_desc: string;
    pro_small_desc: string;
    ref: string;
    rooms: string;

    constructor(property) {
        {
            this.id = property.id;
            this.pro_name = property.pro_name || null;
            this.published = property.habilitado || null;
            this.category_id = property.category_id || null;
            this.pro_type = property.pro_type || null;
            this.bath_room = property.bath_room || null;
            this.bed_room = property.bed_room || null;
            this.city = property.city || null;
            this.curr = property.curr || null;
            this.price = property.price || null;
            this.image = property.image || null;
            this.parking = property.parking || null;
            this.pro_full_desc = property.pro_full_desc || null;
            this.pro_small_desc = property.pro_small_desc || null;
            this.ref = property.ref || null;
            this.rooms = property.rooms || null;
        }
    }

}