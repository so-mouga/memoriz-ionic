import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-quizz',
  templateUrl: './add-quizz.component.html',
  styleUrls: ['./add-quizz.component.scss'],
})
export class AddQuizzComponent implements OnInit {
  maxAnswer = 6;
  quizzForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.quizzForm = this.formBuilder.group({
      question: ['', [Validators.required]],
      resource: [''],
      tags: [''],
      answers: this.formBuilder.array([
        this.formBuilder.group({
          answer: ['', [Validators.required, Validators.minLength(1)]],
          isCorrectAnswer: [false, Validators.required],
        }),
        this.formBuilder.group({
          answer: ['', [Validators.required, Validators.minLength(1)]],
          isCorrectAnswer: [false, Validators.required],
        }),
      ]),
    });
  }

  getTags(tags: string[]) {
    this.quizzForm.patchValue({
      tags: tags,
    });
  }

  get answers() {
    return this.quizzForm.get('answers') as FormArray;
  }

  addAnswer() {
    if (this.canAddAnswer()) {
      this.answers.push(
        this.formBuilder.group({
          answer: ['', [Validators.required]],
          isCorrectAnswer: [false],
        }),
      );
    }
  }

  canAddAnswer() {
    return (
      this.answers.value[0].answer !== '' &&
      this.answers.value[1].answer &&
      this.answers.value.slice(-1).pop().answer !== ''
    );
  }

  deleteAnswer(index) {
    this.answers.removeAt(index);
  }

  onSubmit() {
    if (this.quizzForm.valid) {
      console.log(this.quizzForm.value);
    }
  }
}
