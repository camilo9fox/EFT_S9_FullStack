import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '../../../commons/components/Footer/Footer.component';
import { CartComponent } from '../../components/Cart/Cart.component';
import { NavbarComponent } from '../../../commons/components/Navbar/Navbar.component';

/**
 * @description
 * Componente de la página "Sobre Nosotros".
 *
 * Este componente muestra información sobre la empresa y la misión,
 * visión y valores de Pepe Librería, proporcionando a los visitantes
 * una visión detallada de los principios y objetivos fundamentales de la librería.
 */

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  templateUrl: './AboutUsPage.component.html',
  styleUrl: './AboutUsPage.component.scss',
  imports: [CommonModule, FooterComponent, CartComponent, NavbarComponent],
})
export class AboutUsPageComponent {
  sections = [
    {
      image: './assets/img/nosotros/mision.webp',
      alt: 'mision',
      text: `En Pepe Librería, nuestra misión es inspirar y fomentar el amor por
      la lectura, creando un espacio acogedor y accesible donde todas las
      personas puedan descubrir, disfrutar y compartir la magia de los
      libros. Nos esforzamos por ofrecer una amplia variedad de títulos
      que reflejen la diversidad de experiencias y perspectivas, y por ser
      un punto de encuentro cultural en la comunidad.`,
    },
    {
      image: './assets/img/nosotros/vision.webp',
      alt: 'vision',
      text: `Nuestra visión en Pepe Librería es ser un faro de conocimiento y
      cultura, reconocido por nuestra pasión por los libros y nuestro
      compromiso con la comunidad. Aspiramos a ser la librería de
      referencia donde lectores de todas las edades y procedencias
      encuentran inspiración, consuelo y aventura en las páginas de
      nuestros libros.
      <br />
      En Pepe Librería, creemos que los libros tienen el poder de cambiar
      vidas, abrir mentes y conectar corazones. Nuestra visión es seguir
      creciendo como un espacio acogedor y vibrante, donde cada visitante
      pueda encontrar su próximo gran libro y sentirse parte de una
      comunidad que valora el conocimiento y la creatividad.`,
    },
    {
      image: './assets/img/nosotros/valores.webp',
      alt: 'valores',
      text: `<strong>Pasión por la Lectura:</strong>
      Nuestra devoción por los libros es el corazón de todo lo que
      hacemos. Celebramos el placer de leer y nos comprometemos a
      compartir esa pasión con nuestros clientes.
      <br />
      <strong>Integridad y Honestidad:</strong>
      Actuamos con honestidad y transparencia en todas nuestras
      interacciones. Nos esforzamos por ser dignos de confianza y por
      mantener altos estándares éticos en nuestra librería.
      <br />
      <strong>Compromiso con la Comunidad:</strong>
      Nos vemos como un centro cultural en nuestra comunidad, un lugar
      donde las personas pueden reunirse, aprender y crecer juntas.
      Organizamos eventos, clubes de lectura y actividades que fomentan la
      conexión y el aprendizaje.`,
    },
  ];
}
