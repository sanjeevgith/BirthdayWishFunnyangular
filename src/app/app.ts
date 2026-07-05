import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  constructor(private cdr: ChangeDetectorRef) {}

  step = 1;

  memes = ['twodance.gif', 'image2.gif', 'image4.gif'];

  memeIndex = 0;
  countdown = 3;
  showAwesome = false;

  next() {
    this.step++;
    if (this.step === 2) {
      this.startCountdown();
    }
  }

  startCountdown() {
    this.countdown = 3;
    this.showAwesome = false;

    const timer = setInterval(() => {
      this.countdown--;

      this.cdr.detectChanges();

      if (this.countdown <= 0) {
        clearInterval(timer);

        this.showAwesome = true;

        this.cdr.detectChanges();
      }
    }, 1000);
  }

  isMoving = false;

  noStyle = {
    left: '0px',
    top: '0px',
  };

  nextMeme() {
    if (this.memeIndex < this.memes.length - 1) {
      this.memeIndex++;
    } else {
      this.step = 5;
    }
  }

  finish() {
    this.step = 6;
  }

  noBtnClicked = false;
  moveButton(event?: Event) {
    this.noBtnClicked = true;

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const containerWidth = window.innerWidth < 768 ? 300 : 600;
    const containerHeight = window.innerHeight < 768 ? 180 : 240;

    const yesLeft = window.innerWidth < 768 ? 50 : 180;
    const yesTop = window.innerWidth < 768 ? 80 : 120;

    let left;
    let top;

    do {
      left = Math.random() * containerWidth;
      top = Math.random() * containerHeight;
    } while (Math.abs(left - yesLeft) < 120 && Math.abs(top - yesTop) < 70);
    this.noStyle = {
      left: `${left}px`,
      top: `${top}px`,
    };
  }

  showSadScreen() {
    this.noBtnClicked = true;
  }

  restartJourney() {
    this.step = 1;

    this.noBtnClicked = false;

    this.showAwesome = false;

    this.countdown = 3;

    this.memeIndex = 0;

    this.noStyle = {
      left: '420px',
      top: '120px',
    };
  }
}
