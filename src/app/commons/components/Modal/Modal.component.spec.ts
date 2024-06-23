import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './Modal.component';
import { CommonModule } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BrowserModule, ModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(
      By.css('.modal-title')
    ).nativeElement;
    expect(titleElement.textContent).toContain('Test Title');
  });

  it('should display default button texts', () => {
    const closeButton = fixture.debugElement.query(
      By.css('.btn-secondary')
    ).nativeElement;
    const confirmButton = fixture.debugElement.query(
      By.css('.btn-primary')
    ).nativeElement;
    expect(closeButton.textContent).toContain('Close');
    expect(confirmButton.textContent).toContain('Confirm');
  });

  it('should display custom button texts', () => {
    component.closeButtonText = 'Custom Close';
    component.confirmButtonText = 'Custom Confirm';
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(
      By.css('.btn-secondary')
    ).nativeElement;
    const confirmButton = fixture.debugElement.query(
      By.css('.btn-primary')
    ).nativeElement;
    expect(closeButton.textContent).toContain('Custom Close');
    expect(confirmButton.textContent).toContain('Custom Confirm');
  });

  it('should emit close event when close button is clicked', () => {
    spyOn(component.close, 'emit');
    const closeButton = fixture.debugElement.query(
      By.css('.btn-secondary')
    ).nativeElement;
    closeButton.click();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should emit confirm event when confirm button is clicked', () => {
    spyOn(component.confirm, 'emit');
    const confirmButton = fixture.debugElement.query(
      By.css('.btn-primary')
    ).nativeElement;
    confirmButton.click();
    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('should emit close event when overlay is clicked', () => {
    spyOn(component.close, 'emit');
    const overlay = fixture.debugElement.query(
      By.css('.modal-overlay')
    ).nativeElement;
    overlay.click();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should not emit close event when content is clicked', () => {
    spyOn(component.close, 'emit');
    const content = fixture.debugElement.query(
      By.css('.modal-content')
    ).nativeElement;
    content.click();
    expect(component.close.emit).not.toHaveBeenCalled();
  });
});
