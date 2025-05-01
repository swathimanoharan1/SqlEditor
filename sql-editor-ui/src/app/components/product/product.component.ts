import { Component, OnInit } from '@angular/core';
import {
  Product,
  ProductService,
} from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  newProduct: Product = {
    productId: 0,
    name: '',
    price: 0,
    category: '',
    stock: 0,
  };

  editProductModel: Product | null = null;
  isEditMode = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addProduct() {
    this.productService.createProduct(this.newProduct).subscribe(() => {
      this.fetchProducts();
      this.newProduct = {
        productId: 0,
        name: '',
        price: 0,
        category: '',
        stock: 0,
      };
    });
  }

  editProduct(product: Product) {
    this.editProductModel = { ...product };
    this.isEditMode = true;
  }

  updateProduct() {
    if (!this.editProductModel) return;
    this.productService
      .updateProduct(this.editProductModel.productId, this.editProductModel)
      .subscribe(() => {
        this.fetchProducts();
        this.resetForm();
      });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.fetchProducts();
    });
  }

  resetForm() {
    this.editProductModel = null;
    this.isEditMode = false;
  }
}
