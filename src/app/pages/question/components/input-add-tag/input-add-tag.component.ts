import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-input-add-tag',
  templateUrl: './input-add-tag.component.html',
  styleUrls: ['./input-add-tag.component.scss'],
})
export class InputAddTagComponent implements OnInit {
  @Output() sendTags = new EventEmitter();
  regexValidation = /[~`!@#$%^&()_={}[\]:;,.<>+\/?-]/;
  errorMessage = '';

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tags: string[] = [];

  ngOnInit(): void {}

  emitTags() {
    this.sendTags.emit(this.tags);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (!this.canAdd(value)) {
      return;
    }

    if ((value || '').trim()) {
      this.tags.push(value.trim().toLowerCase());
    }
    input.value = '';
    this.errorMessage = '';
    this.emitTags();
  }

  private canAdd(value: string): boolean {
    if (value === '') {
      return false;
    }
    if (this.regexValidation.test(value)) {
      this.errorMessage = 'Les caractères spéciaux ne sont pas autorisé.';
      return false;
    }
    if (this.tags.includes(value)) {
      this.errorMessage = 'Votre tag est déjà dans la liste.';
      return false;
    }

    return true;
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.emitTags();
    }
  }
}
