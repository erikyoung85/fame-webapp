import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  imports: [CommonModule],
})
export class DividerComponent implements OnInit {
  @Input() height: number = 1;
  @Input() text?: string;

  constructor() {}

  ngOnInit() {}
}
