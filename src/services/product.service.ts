import { Service } from "typedi";
import { getManager } from "typeorm";
import { ProductRepo } from "../database/repository/product.repository";
// import { AppDataSource } from "../connection/connection";
import { Product } from "../database/model/product.model";

@Service()
export class ProductService {
  // fetch all product details
  public findProduct = async () => {
    const productRepository = getManager().getCustomRepository(ProductRepo);

    const products = await productRepository.find();
    return products;
  };

  // fetch product details by product id
  public findProductById = async (product_id: any) => {
    console.log("product_id ", product_id);
    const productRepository = getManager().getCustomRepository(ProductRepo);

    const productDetails = await productRepository
      .createQueryBuilder()
      .where({ id: product_id })
      .getOne();
    return productDetails;
  };

  // create new product
  public createProduct = async (product: Product) => {
    const productRepository = getManager().getCustomRepository(ProductRepo);
    const newProduct = await productRepository.save(product);
    return newProduct;
  };

  // update product
  public updateProduct = async (product: Product, product_id: string) => {
    const productRepository = getManager().getCustomRepository(ProductRepo);

    const productDetails = await productRepository
      .createQueryBuilder()
      .where({ id: product_id })
      .getOne();

    return productRepository.save({
      ...productDetails, // existing fields
      ...product, // updated fields
    });
  };

  // delete product by id
  public deleteProduct = async (id: number) => {
    const productRepository = getManager().getCustomRepository(ProductRepo);
    const deletedProduct = await productRepository
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where("id = :id", { id: id })
      .execute();

    return deletedProduct;
  };
}
