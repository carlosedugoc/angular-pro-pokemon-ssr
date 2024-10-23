import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'page-contact',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  private title = inject(Title)
  private meta = inject(Meta)
  ngOnInit(): void {
    this.title.setTitle('Contact Page')
    this.meta.updateTag({name: 'description', content: 'Este es mi contact page'})
    this.meta.updateTag({name: 'og:title', content: 'Contact Page'})
    this.meta.updateTag({name: 'keywords', content: 'Hola, Mundo, Carlos, Angular'})
  }


}
