import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal
} from '@angular/core';

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  templateUrl: './project-gallery.component.html',
  styleUrl: './project-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectGalleryComponent {
  readonly images = input.required<string[]>();
  readonly projectTitle = input.required<string>();

  readonly selectedIndex = signal(0);

  selectImage(index: number): void {
    this.selectedIndex.set(index);
  }

  previousImage(): void {
    const count = this.images().length;

    this.selectedIndex.update((index) =>
      index === 0 ? count - 1 : index - 1
    );
  }

  nextImage(): void {
    const count = this.images().length;

    this.selectedIndex.update((index) =>
      index === count - 1 ? 0 : index + 1
    );
  }
}