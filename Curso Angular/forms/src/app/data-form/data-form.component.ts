import { CidadeBr } from './../shared/models/cidades-br';
import { BaseFormComponent } from './../shared/base-form/base-form.component';
import { VerificaEmailService } from './services/verifica-email.service';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from './../../../../angular-cli-libs-externas/src/app/estado-br';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropdownService } from '../shared/services/dropdown.service';
import { Observable, empty } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})

// Herança do BaseFormComponent
export class DataFormComponent extends BaseFormComponent implements OnInit {
 // formulario: FormGroup;
  // estados: Observable<EstadoBr[]>;

  estados: EstadoBr[];
  cidades: CidadeBr[];
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {
    super(); // chama o contrutor da classe mãe ou seja classe base-form.component.ts
  }

  ngOnInit(): void {
    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    });*/
    /*   this.dropdownService.getEstadosBr().subscribe((dados) => {
      this.estados = dados;
      console.log(dados);
    });*/
    // this.verificaEmailService.verificarEmail('email@email.com').subscribe();


   //  this.estados = this.dropdownService.getEstadosBr();

   this.dropdownService.getEstadosBr()
   .subscribe(dados => this.estados = dados);

   this.cargos = this.dropdownService.getCargos();
   this.tecnologias = this.dropdownService.getTecnologias();
   this.newsletterOp = this.dropdownService.getNewsletter();

   this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30), ],],
      // validacao sincrona                     //validação Assíncrona
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, FormValidations.equaisTO('email')],
      // agrupando em subgrupo
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),


      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'], // deixa como padrão Sim
      // tslint:disable-next-line: max-line-length
      termos: [null, Validators.pattern('true')], // Validators.required apenas valida se é diferente de null por isso utilizamos Validators.pattern para validar se é true
      frameworks: this.buildFrameworks()
    });

    // REACT
   this.formulario.get('endereco.cep').statusChanges
    .pipe(
      distinctUntilChanged(), // só chamar quando chegar no 8 digito
      tap(value => console.log('valor CEP:', value)),
      switchMap(status => status === 'VALID'?
        this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
        : empty()
      )// retorna outro observable se o status for valido
    ).subscribe(dados => dados ?  // se o switchMap retornou algum dado executa chamada do metodo
                      this.populaDadosForm(dados) : {});

   // on change formulario.estado
   this.formulario.get('endereco.estado').valueChanges
   .pipe(
     tap(estado => console.log('Novo Estado', estado)),
     map(estado => this.estados.filter(e => e.sigla === estado)),
     map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
     switchMap((estadoId: number)  => this.dropdownService.getCidadesBr(estadoId)),
     tap(console.log)
   ).subscribe(cidades => this.cidades = cidades);

   }

  submit(){
    console.log(this.formulario);

    // cria um objeto vazio com os valores do formulario
    let valueSubmit = Object.assign({}, this.formulario.value);

    // mandar apenas os framewoks true para o servidor
    // imutabilidade - Redux no Angular-React

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v, i) => v ? this.frameworks[i] : null)
      .filter(v => v !== null) // filtra todos frameworks que são diferente de null -- programação funcional
    });

    console.log(`ValueSubmit: ${JSON.stringify(valueSubmit)}`);
    this.http
    .post('https://httpbin.org/post', JSON.stringify(valueSubmit))
    .subscribe(
      (res) => {
        console.log(res);
        // reset do form
        //  this.formulario.reset();
      }, // caso dê erro
      (error: any) => alert('erro')
    );
  }

  populaDadosForm(dados) {
    this.formulario.patchValue({
      endereco: {
       // cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });

  // this.formulario.get('nome').setValue('Tiago');
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    console.log(cep);

    if (cep != null && cep !== '') {
      this.cepService
        .consultaCEP(cep)
        .subscribe((dados) => this.populaDadosForm(dados));
    }
  }

  setarCargo() {
    const Constcargo = {
      nome: 'Dev',
      nivel: 'Pleno',
      desc: 'Dev Pl',
    };
    this.formulario.get('cargo').setValue(Constcargo);
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2
      ? obj1.nome === obj2.nome && obj1.nivel === obj2.nivel
      : obj1 === obj2;
  }
  setarTecnologias(){
    this.formulario.get('tecnologias').setValue(['java', 'javascript', '.net']);
  }

  buildFrameworks(){

    // a linha abaixo cria um novo array com as opções existentes em framework com a opção FormControl false
    const values = this.frameworks.map(v => new FormControl(false));

    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));

  }

  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (this.formulario.get('frameworks') as FormArray).controls : null;
  }

  validarEmail(formControl: FormControl){
    return this.verificaEmailService.verificarEmail(formControl.value)
    .pipe(map(emailExiste => emailExiste ? { emailInvalido : true } : null));
  }

}
