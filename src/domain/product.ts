import { Money } from "./money";
import { ProductId } from "./product-id";
import { ProductName } from "./product-name";

type ProductType = "Generic" | "DownloadSoftware" | "Car";

const symbolProduct = Symbol("Money");

class Product {
  readonly symbol: typeof symbolProduct = symbolProduct;

  private constructor(
    readonly id: ProductId,
    readonly type: ProductType,
    readonly name: ProductName,
    readonly price: Money,
  ) {}

  static of(
    id: ProductId,
    type: ProductType,
    name: ProductName,
    price: Money,
  ): Product {
    return new Product(id, type, name, price);
  }

  static ofGeneric(id: ProductId, name: ProductName, price: Money): Product {
    return new Product(id, "Generic", name, price);
  }

  static ofDownloadSoftware(
    id: ProductId,
    name: ProductName,
    price: Money,
  ): Product {
    return new Product(id, "DownloadSoftware", name, price);
  }

  static ofCar(id: ProductId, name: ProductName, price: Money): Product {
    return new Product(id, "Car", name, price);
  }

  isGeneric(): boolean {
    return this.type === "Generic";
  }

  isDownloadSoftware(): boolean {
    return this.type === "DownloadSoftware";
  }

  isCar(): boolean {
    return this.type === "Car";
  }
}

export { Product, ProductType };
