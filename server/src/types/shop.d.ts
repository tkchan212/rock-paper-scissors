export type Product = {
    id: number;
    userID: number;

    title: string;
    description: string;
    price: string;
    img: string;
    type: string;
    
    created_at: number;
    modify_at: number | null;
    deleted: number;
}