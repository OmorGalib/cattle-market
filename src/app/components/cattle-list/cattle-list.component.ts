import { Component, OnInit } from '@angular/core';
import { CattleService } from '../../services/cattle.service';
import { CattleModel } from '../../models/cattle.model';
import { StatusPipe } from '../../pipes/status.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-cattle-list',
  standalone: true,
  imports: [CommonModule, RouterModule, StatusPipe, NavbarComponent],
  templateUrl: './cattle-list.component.html',
  styleUrls: ['./cattle-list.component.scss'],
})
export class CattleListComponent implements OnInit {
  cattleList: CattleModel[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private cattleService: CattleService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCattle();
  }

  loadCattle(): void {
    this.isLoading = true;
    this.error = null;

    this.cattleService.getCattleList().subscribe({
      next: (cattle) => {
        this.cattleList = cattle;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cattle list';
        this.isLoading = false;
        console.error('Error loading cattle:', err);
      },
    });
  }

  toggleStatus(cattle: CattleModel): void {
    const newStatus = cattle.status === 'available' ? 'sold' : 'available';

    this.cattleService.updateCattleStatus(cattle.id, newStatus).subscribe({
      next: (updatedCattle) => {
        this.cattleList = this.cattleList.map((c) =>
          c.id === cattle.id ? { ...c, status: newStatus } : c
        );
      },
      error: (err) => {
        console.error('Status update error:', err);
        this.error = 'Failed to update status. Please try again.';
      },
    });
  }
}
