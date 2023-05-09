import { Component, OnInit } from '@angular/core';
import { ReservationsService } from 'src/core/http/reservations.service';
import { Reservation } from 'src/core/model/reservation';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[] = [];
  pagedReservations: Reservation[] = [];
  currentPage = 1;
  pageSize = 20;
  totalPages = 1;
  pages: number[] = [];

  constructor(private reservationService: ReservationsService) { }

  ngOnInit(): void {
    this.getReservations()
  }

  getReservations(): void {
    this.reservationService.getReservations().subscribe(
      reservations => {
        this.reservations = reservations;
        this.calculatePages();
        this.setCurrentPage(1);
      },
      error => console.log(error)
    );
  }

  onDeleteReservation(reservation: Reservation): void {
    console.log(reservation);

    this.reservationService.deleteReservation(reservation.id)
      .subscribe(() => {
        this.reservations = this.reservations.filter(r => r !== reservation);
        this.calculatePages();
        this.setCurrentPage(this.currentPage);
      });
  }

  calculatePages(): void {
    this.totalPages = Math.ceil(this.reservations.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedReservations = this.reservations.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setCurrentPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.setCurrentPage(this.currentPage - 1);
    }
  }

}
