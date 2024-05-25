export interface Product {
    id: number;
    imgURL: string
    material: String; 
    largo: number;
    ancho: number;
    precio: number;

}
    export const products = [
        {
            id: 1,
            material: 'madera',
            ancho: 30,
            largo: 30,
            precio: 10
          },

          {
            id: 2,
            material: 'lacado',
            ancho: 25,
            largo: 20,
            precio: 40
          },
          {
            id: 3,
            material: 'madera',
            ancho: 60,
            largo: 60,
            precio: 32
          },
    ]

