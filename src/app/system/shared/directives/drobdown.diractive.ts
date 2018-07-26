import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[buhDrobdown]'
})
export class DrobdownDirective {
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') onClick(){
        this.isOpen = !this.isOpen;
    }
}
