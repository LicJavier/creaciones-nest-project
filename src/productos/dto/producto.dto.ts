export class ProductoDTO{

    readonly name : string;

    readonly categoria: string;
    
    readonly stock : number;

    readonly price : number;

    readonly img : string;

}

export class ActualizarProductoDTO{

    readonly name : string;

    readonly categoria: string;
    
    readonly stock : number;

    readonly price : number;

    readonly img : string;

    readonly id: string;
}
