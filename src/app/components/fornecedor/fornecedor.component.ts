import { Fornecedor } from './../interfaces/Fornecedor';
import { FornecedorService } from './../../services/fornecedor.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.css'

})
export class FornecedorComponent {

  fornecedorForm : FormGroup= new FormGroup({});
  fornecedorFormEdit : FormGroup= new FormGroup({});
  fornecedores : Fornecedor[] = [];
  fornecedorAtual:Fornecedor = {id:'',nome:'',endereco:'',telefone:0};

  display : string = 'none';
  // fornecedorAntigo!: Fornecedor;

  constructor(private fornecedorService: FornecedorService ,private formBuilder : FormBuilder){
    this.fornecedorForm = formBuilder.group({
      id:[''],
      nome:['',Validators.required],
      endereco:['',Validators.required],
      telefone:['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.listar();
  }

  inserir(){
    if(this.fornecedorForm.valid){
      const fornecedorNovo: Fornecedor={
        nome: this.fornecedorForm.value.nome,
        endereco : this.fornecedorForm.value.endereco,
        telefone: this.fornecedorForm.value.telefone,
        id: this.generateRandomString(8)
      }

      this.fornecedorService.inserir(fornecedorNovo);

      this.listar()
      alert('Cliente Cadastrado')
    }

  }

  abrirModal(id:string) {
    this.display = 'block'
    this.fornecedorService.getById(id)
    .subscribe(item=> this.fornecedorAtual = item);
}


 submitEditar(){
  if(this.fornecedorForm.valid){
    const fornecedorNovo: Fornecedor={
      nome: this.fornecedorForm.value.nome,
      endereco: this.fornecedorForm.value.endereco,
      telefone: this.fornecedorForm.value.telefone,
      id: this.fornecedorAtual.id
    }

    this.fornecedorService.editar(fornecedorNovo)
     alert("Cliente " + this.fornecedorAtual.id + " alterado")
 }
 this.fecharModal()

}

 fecharModal(){
  this.display = 'none';
}

  remover(id:string):void{
    this.fornecedorService.remover(id)

    this.listar()
    alert("cliente removido")
  }

  listar(): void {
    this.fornecedorService.listar()
      .subscribe((item)=>(this.fornecedores = item));
  }

  generateRandomString(length: number): string  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
