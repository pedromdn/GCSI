import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit {
  @Input() image: string = '';
  @Input() icon: string | null = 'bi bi-people-fill';
  @Input() title: string | null = 'Aun no hay colaboradores';
  @Input() message: string | null = 'Empieza por agregar un colaborador';
  @Input() background: string | null = 'transparent';
  constructor() { }

  ngOnInit(): void {
  }
  setStyles() {
    const styles = {
      background: this.background,
    };

    return styles;
  }
}
