import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { HeaderService } from '../../template/header/header.service';



@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(
    private router: Router,
    private service: ProductService,
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {

    headerService.headerData = {
      title: "Exclusão de Produtos",
      icon: "storefront",
      routeUrl: '/products'
    }

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.readById(id).subscribe(product => {
      this.product = product;
    })
  }

  deleteProduct(): void {
    this.service.delete(this.product.id).subscribe(() => {
      this.service.showMessage("Produto excluído com sucesso.")
      this.router.navigate(['/products']);
    });

  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
