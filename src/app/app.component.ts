import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculator';
  pantalla: string = '0';
  operando1: string = '';
  operando2: string = '';
  operacion: string = '';
  resultado: string = '';

  handleClick(event: any) {
    const valor = event.target.innerText;

    switch(valor) {
      case 'C':
        this.clear();
        break;
      case '←':
        this.borrar();
        break;
      case '=':
        this.calcular();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.establecerOperacion(valor);
        break;
      default:
        this.agregarNumero(valor);
        break;
    }
  }

  clear() {
    this.pantalla = '0';
    this.operando1 = '';
    this.operando2 = '';
    this.operacion = '';
    this.resultado = '';
  }

  borrar() {
    this.pantalla = this.pantalla.slice(0, -1);
  }

  establecerOperacion(op: string) {
    if (this.operando1 === '') {
      this.operando1 = this.pantalla;
      this.operacion = op;
      this.pantalla = '0';
    } else if (this.operando2 === '') {
      this.operacion = op;
    } else {
      this.calcular();
      this.operacion = op;
    }
  }

  agregarNumero(num: string) {
    if (this.operacion === '') {
      // Si no se ha establecido una operación, agregamos el número normalmente
      this.pantalla === '0' ? this.pantalla = num : this.pantalla += num;
    } else {
      // Si se ha establecido una operación, verificamos si estamos ingresando el primer o segundo número
      if (this.operando2 === '') {
        // Si es el primer número del segundo operando, lo concatenamos
        this.operando2 = num;
        this.pantalla = num;
      } else {
        // Si es el segundo dígito del segundo operando, lo concatenamos al número existente
        this.operando2 += num;
        this.pantalla = this.operando2;
      }
    }
  }
  

  calcular() {
    const num1 = parseFloat(this.operando1);
    const num2 = parseFloat(this.operando2);

    switch(this.operacion) {
      case '+':
        this.resultado = (num1 + num2).toString();
        break;
      case '-':
        this.resultado = (num1 - num2).toString();
        break;
      case '*':
        this.resultado = (num1 * num2).toString();
        break;
      case '/':
        this.resultado = (num1 / num2).toString();
        break;
      default:
        break;
    }

    this.pantalla = this.resultado;
    this.operando1 = this.resultado;
    this.operando2 = '';
    this.operacion = '';
  }
}
