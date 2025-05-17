import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CattleService } from '../../services/cattle.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CattleModel } from '../../models/cattle.model';

@Component({
  selector: 'app-cattle-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './cattle-form.component.html',
  styleUrls: ['./cattle-form.component.scss'],
})
export class CattleFormComponent implements OnInit {
  cattleForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cattleService: CattleService,
    private router: Router
  ) {
    this.cattleForm = this.fb.group({
      breed: [''],
      weight: [],
      price: [],
      status: ['available'],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.cattleForm = this.fb.group({
      breed: ['', [Validators.required, Validators.minLength(2)]],
      weight: [[Validators.required, Validators.min(1)]],
      price: [[Validators.required, Validators.min(1)]],
      status: ['available', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.cattleForm.valid) {
      this.isSubmitting = true;
      this.error = null;

      const cattleData: Omit<CattleModel, 'id'> = {
        breed: this.cattleForm.value.breed,
        weight: this.cattleForm.value.weight,
        price: this.cattleForm.value.price,
        status: this.cattleForm.value.status,
      };

      this.cattleService.addCattle(cattleData).subscribe({
        next: () => {
          this.router.navigate(['/cattle']);
        },
        error: (err) => {
          this.error = 'Failed to add cattle';
          this.isSubmitting = false;
          console.error(err);
        },
      });
    }
  }
}
