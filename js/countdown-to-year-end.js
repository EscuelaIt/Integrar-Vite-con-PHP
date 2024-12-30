import { LitElement, html, css } from 'lit';
import { intervalToDuration } from 'date-fns';

export class CountdownToYearEnd extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
      border: 2px solid #ccc;
      border-radius: 10px;
      background-color: #bac4f1;
      max-width: 390px;
      margin: 20px auto;
    }
    h1 {
      font-size: 1.5rem;
      color: #333;
    }
    .countdown {
      font-size: 1.2rem;
      color: #555;
    }
  `;

  constructor() {
    super();
    this.timeLeft = this.getTimeLeft();
    this.intervalId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.intervalId = setInterval(() => {
      this.timeLeft = this.getTimeLeft();
      this.requestUpdate(); // Fuerza la actualización del componente
    }, 1000); // Actualiza cada segundo
  }

  disconnectedCallback() {
    clearInterval(this.intervalId); // Limpia el intervalo al desconectar el componente
    super.disconnectedCallback();
  }

  getTimeLeft() {
    const now = new Date();
    const yearEnd = new Date(now.getFullYear(), 11, 31, 23, 59, 59); // Fin de año
    const duration = intervalToDuration({ start: now, end: yearEnd });
    return duration;
  }

  render() {
    const { days, hours, minutes, seconds } = this.timeLeft;
    return html`
      <h1>Cuenta atrás para el Año Nuevo!!</h1>
      <div class="countdown">
        ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos restantes.
      </div>
    `;
  }
}

customElements.define('countdown-to-year-end', CountdownToYearEnd);
