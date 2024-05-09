import { Injectable } from '@angular/core';
import { Fornecedor } from '../components/interfaces/Fornecedor';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private fornecedorURL ="http://localhost:3000/fornecedores";
  constructor(private http: HttpClient) { }

  listar():Observable<Fornecedor[]>{
    return this.http.get<Fornecedor[]>(this.fornecedorURL) as Observable<Fornecedor[]>

  };

  getById(id:string) : Observable<Fornecedor> {
    return this.http.get<Fornecedor>(this.fornecedorURL+"/"+id) as Observable<Fornecedor>;
  }

  remover(id:string){
      this.http.delete(this.fornecedorURL+"/"+id)
  }

  editar(fornecedorNovo:Fornecedor){
    const  httpHeader={
      headers:{
        "Content-Type":"application/json"
      }
    }

    return this.http.put(this.fornecedorURL+"/"+fornecedorNovo.id,fornecedorNovo,httpHeader)

}

  inserir(fornecedorNovo:Fornecedor){
    const  httpHeader={
      headers:{
        "Content-Type":"application/json"
      }
    }
    return this.http.post(this.fornecedorURL,fornecedorNovo,httpHeader)
  }


}
