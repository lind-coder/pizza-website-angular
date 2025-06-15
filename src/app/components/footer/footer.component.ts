import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-dark text-light py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4 mb-md-0">
            <h5 class="mb-3">Anema e Core</h5>
            <p class="mb-0">La vera pizza napoletana artigianale</p>
          </div>
          <div class="col-md-4 mb-4 mb-md-0">
            <h5 class="mb-3">Contatti</h5>
            <p class="mb-1">
              <i class="fas fa-map-marker-alt me-2"></i>
              Via Roma 123, Napoli
            </p>
            <p class="mb-1">
              <i class="fas fa-phone me-2"></i>
              +39 081 1234567
            </p>
            <p class="mb-0">
              <i class="fas fa-envelope me-2"></i>
              info&#64;anemaecore.it
            </p>
          </div>
          <div class="col-md-4">
            <h5 class="mb-3">Orari</h5>
            <p class="mb-1">Lun - Ven: 12:00 - 23:00</p>
            <p class="mb-1">Sab - Dom: 12:00 - 00:00</p>
          </div>
        </div>
        <hr class="my-4">
        <div class="row">
          <div class="col-md-6 mb-3 mb-md-0">
            <p class="mb-0">&copy; 2025 Anema e Core. Tutti i diritti riservati.</p>
          </div>
          <div class="col-md-6 text-md-end">
            <a href="#" class="text-light me-3"><i class="fab fa-facebook"></i></a>
            <a href="#" class="text-light me-3"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-light"><i class="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      margin-top: auto;
    }
    a {
      text-decoration: none;
    }
    a:hover {
      opacity: 0.8;
    }
  `]
})
export class FooterComponent {} 