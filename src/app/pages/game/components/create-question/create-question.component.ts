import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuizzClass} from '@app/pages/game/models/quizz.class';
import {AuthService} from '@app/core/services/auth/auth.service';
import {QuestionService} from '@app/pages/game/services/question/question.service';
import {ModalController, NavController} from '@ionic/angular';
import {FILE} from 'dns';

@Component({
    selector: 'app-create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {
    @Input() isModal = false;
    @ViewChild('inputFile') inputFile: ElementRef;
    @ViewChild('inputFileRessourceMedia') inputFileRessourceMedia: ElementRef;
    file = File = null;
    contentFile: File | null = null;
    maxAnswer = 6;
    quizzForm: FormGroup;
    img = null;
    imgContentFile = null;
    triggerStateAddLink = false;
    test;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private questionService: QuestionService,
        private modalController: ModalController,
        private navCtrl: NavController,
    ) {
    }

    ngOnInit() {
        this.initForm();
    }

    onFileChanged(event) {
            if (event.target.files && event.target.files[0]){
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    this.img = event.target.result;
                }
                reader.readAsDataURL(event.target.files[0]);
                this.file = <FILE>event.target.files[0];
                console.log("file event", this.file);
                this.test = {
                    lastModified: this.file.lastModified,
                    name: this.file.name,
                    size: this.file.size,
                    type: this.file.type
                }
                console.log(this.test);
            }
    }

    onFileRessourceMediaChanged(event) {
        // if (event.target.files && event.target.files[0]){
        //     const reader = new FileReader();
        //     reader.onload = (event: any) => {
        //         this.imgContentFile = event.target.result;
        //     }
        //     reader.readAsDataURL(event.target.files[0]);
        //     this.contentFile = event.target.files[0];
        // }
    }

    initForm() {
        this.quizzForm = this.formBuilder.group({
            userId: this.authService.currentAuthenticationValue.id,
            question: ['', [Validators.required]],
            resource: [''],
            tags: ['', [Validators.required]],
            media: [''],
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
        console.log(this.quizzForm);
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

    triggerAddMedia() {
        this.inputFile.nativeElement.click();
    }

    triggerAddLink(){
        this.triggerStateAddLink = true;
    }

    triggerAddResourceMedia() {
        this.inputFileRessourceMedia.nativeElement.click();
    }

    removeImage() {
        this.inputFile.nativeElement.value = "";
        this.img = null;
        this.quizzForm.value.media = null;
        this.file = null;
    }

    onSubmit() {
        // this.fd.append('file', this.file, this.file.name);
        // if (this.file) {
        //     this.quizzForm.value.media = this.fd;
        // }
        // if (this.contentFile) {
        //     this.quizzForm.value.resourceMedia = this.contentFile;
        // }
        // console.log(this.quizzForm.value.media);
        if (this.test) {
            this.quizzForm.value.media = this.test;
        }

        if (this.quizzForm.valid && this.isAnswersValid.length > 0) {
            console.log('test');
            const quizz = new QuizzClass();
            quizz.makeQuestion(this.quizzForm.value);
            this.questionService.createQuestion(quizz).subscribe(
                question => {
                    if (this.isModal) {
                        this.OnCloseModal(question);
                    } else {
                        this.navCtrl.navigateRoot('home/game');
                    }
                },
                error => console.error(error),
            );
        }
    }

    get isAnswersValid(): [] {
        return this.quizzForm.value.answers.filter(answer => {
            return answer.isCorrectAnswer === true;
        });
    }

    OnCloseModal(quizz?: QuizzClass) {
        this.modalController.dismiss(quizz);
    }
}
