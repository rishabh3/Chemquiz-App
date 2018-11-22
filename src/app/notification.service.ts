import { Injectable, Inject, ComponentFactoryResolver, EmbeddedViewRef } from '@angular/core';
import { NotificationComponent } from './notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private rootViewContainer: any;
  private component: any;
  constructor(private factoryResolver: ComponentFactoryResolver) {
   }

  public setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

   addNotification(email: string) {
     const factory = this.factoryResolver.resolveComponentFactory(NotificationComponent);
     this.ngOnDestroy();
     this.component = factory.create(this.rootViewContainer);
     this.component.instance.setEmail(email);
     this.component.instance.setComp(this.component);
     console.log(this.component.instance);
     this.rootViewContainer.insert(this.component.hostView);
     this.component.changeDetectorRef.detectChanges();
   }

   // tslint:disable-next-line:use-life-cycle-interface
   ngOnDestroy(): void {
    if (this.component) {
      this.component.changeDetectorRef.detach();
    }
   }

   removeNotification() {
     this.component.destroy();
   }
}
