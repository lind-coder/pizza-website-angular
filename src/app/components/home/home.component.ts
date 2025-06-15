import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="hero-section">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">Benvenuti da Anema e Core</h1>
            <p class="lead mb-4">
              La nostra passione per la pizza artigianale nasce dal forno a legna, dove ogni pizza prende vita con ingredienti freschi e tanto amore.
            </p>
            <a routerLink="/menu" class="btn btn-primary btn-lg">
              Vedi il Menu
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="features-section py-5 bg-light">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              <i class="fas fa-leaf fa-3x text-success mb-3"></i>
              <h3>Ingredienti Freschi</h3>
              <p class="text-muted">Selezioniamo ogni giorno i migliori ingredienti per le nostre pizze.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              <i class="fas fa-fire fa-3x text-danger mb-3"></i>
              <h3>Forno a Legna</h3>
              <p class="text-muted">Il nostro forno a legna dona alle pizze un sapore unico e autentico.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              <i class="fas fa-truck fa-3x text-primary mb-3"></i>
              <h3>Consegna Rapida</h3>
              <p class="text-muted">Consegna a domicilio in tutta la città in meno di 30 minuti.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-danger text-white py-4">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h5>Contatti</h5>
            <p>
              <i class="fas fa-phone me-2"></i>+39 123 456 7890<br>
              <i class="fas fa-envelope me-2"></i>info&#64;anemaecore.it<br>
              <i class="fas fa-map-marker-alt me-2"></i>Via Roma 123, Napoli
            </p>
          </div>
          <div class="col-md-4">
            <h5>Orari</h5>
            <p>
              Lun-Ven: 11:00 - 23:00<br>
              Sab-Dom: 11:00 - 00:00
            </p>
          </div>
          <div class="col-md-4">
            <h5>Seguici</h5>
            <div class="social-links">
              <a href="#" class="text-white me-3"><i class="fab fa-facebook fa-2x"></i></a>
              <a href="#" class="text-white me-3"><i class="fab fa-instagram fa-2x"></i></a>
              <a href="#" class="text-white"><i class="fab fa-tiktok fa-2x"></i></a>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <div class="text-center">
          <p class="mb-0">&copy; 2025 Anema e Core. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
                  url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') center/cover no-repeat;
      min-height: 100vh;
      display: flex;
      align-items: center;
    }

    .feature-card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 2px 15px rgba(0,0,0,0.05);
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
    }

    .btn-primary {
      background: linear-gradient(90deg, #dc3545 60%, #ff7675 100%);
      border: none;
      padding: 1rem 2rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(220,53,69,0.2);
    }

    .social-links a {
      transition: all 0.3s ease;
    }

    .social-links a:hover {
      transform: translateY(-3px);
      opacity: 0.8;
    }
  `]
})
export class HomeComponent {} 