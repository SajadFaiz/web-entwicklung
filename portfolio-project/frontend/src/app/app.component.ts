import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { finalize } from 'rxjs';

import { PortfolioApiService } from './core/services/portfolio-api.service';
import { PortfolioComment } from './models/comment.model';
import { PROJECTS } from './portfolio-data';
import {
  ProjectGalleryComponent
} from './shared/project-gallery/project-gallery.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ProjectGalleryComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly api = inject(PortfolioApiService);

  readonly currentYear = new Date().getFullYear();
  readonly projects = PROJECTS;

  readonly comments = signal<PortfolioComment[]>([]);
  readonly commentsLoading = signal(false);
  readonly commentSubmitting = signal(false);
  readonly contactSubmitting = signal(false);
  readonly commentStatus = signal('');
  readonly contactStatus = signal('');

  readonly commentForm = this.formBuilder.nonNullable.group({
    authorName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(80)
      ]
    ],
    content: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1000)
      ]
    ]
  });

  readonly contactForm = this.formBuilder.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(200)
      ]
    ],
    subject: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
      ]
    ],
    message: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(3000)
      ]
    ]
  });

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentsLoading.set(true);

    this.api.getComments()
      .pipe(finalize(() => this.commentsLoading.set(false)))
      .subscribe({
        next: (comments) => this.comments.set(comments),
        error: () => {
          this.commentStatus.set('');
        }
      });
  }

  submitComment(): void {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    this.commentSubmitting.set(true);
    this.commentStatus.set('');

    this.api.createComment(this.commentForm.getRawValue())
      .pipe(finalize(() => this.commentSubmitting.set(false)))
      .subscribe({
        next: (comment) => {
          this.comments.update((items) => [comment, ...items]);
          this.commentForm.reset();
          this.commentStatus.set('Thank you. Your comment was added.');
        },
        error: () => {
          this.commentStatus.set(
            'Your comment could not be submitted.'
          );
        }
      });
  }

  submitContactForm(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.contactSubmitting.set(true);
    this.contactStatus.set('');

    this.api.sendContactMessage(this.contactForm.getRawValue())
      .pipe(finalize(() => this.contactSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.contactForm.reset();
          this.contactStatus.set(
            'Thank you. Your message was sent successfully.'
          );
        },
        error: () => {
          this.contactStatus.set(
            'Your message could not be sent.'
          );
        }
      });
  }

  controlInvalid(
  formName: 'contact' | 'comment',
  controlName: string
): boolean {
  const control =
    formName === 'contact'
      ? this.contactForm.get(controlName as keyof typeof this.contactForm.controls)
      : this.commentForm.get(controlName as keyof typeof this.commentForm.controls);

  return Boolean(control?.invalid && control.touched);
  }
}