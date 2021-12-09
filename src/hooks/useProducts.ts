import { useState } from "react";

export interface IProduct {
    id: number,
    title: string,
    handle: string,
    image: any,
    variantId: number
}

export const useProducts = () => {
    const [products, setProducts] = useState();

        !products && fetch("/products.json")
        .then((res) => {
           return res.json();
        })
        .then(res => setProducts(res));
   
    return products;
}