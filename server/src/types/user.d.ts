

export type OrderItem = {
    id: number; //product id
    title: string;
    price: string;
    img: string;
    quantity: number;
}

export type Order = {
    id: number;
    userID: number;
    created_at: number;
    total_amount: string;
}

export type CartItem = {
    id: number; 
    userID: number; 
    quantity: number; 
    prodID: number; 
    title: string;
    description: string;
    price: string;
    img: string;
}

export type User = {
    id: number; 
    name: string;
    hpassword: string;
    email: string;
    admin: number; 
    deleted: number; 
    suspended: number; 
}