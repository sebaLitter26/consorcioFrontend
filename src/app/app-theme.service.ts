import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { AppTheme } from "./app-theme.enum";
import {OverlayContainer} from "@angular/cdk/overlay";

@Injectable({
    providedIn: 'root',
})
export class AppThemeService {

    /** Evento disparado cuando se cambia el esquema de colores de la aplicación. */
    private themeEventSource: BehaviorSubject<string> = new BehaviorSubject<string>(AppTheme.APP_DARK);
    themeEvent: Observable<string> = this.themeEventSource.asObservable();

    constructor(private overlayContainer: OverlayContainer) {}

    /**
     * Dispara el evento de cambio de esquema de colores.
     * @param theme el esquema de colores
     */
    setColorTheme(theme: string) {

        const classList = this.overlayContainer.getContainerElement().classList;
		classList.replace((theme === AppTheme.APP_DARK) ? AppTheme.APP_DARK : AppTheme.APP_LIGHT, theme);
        this.themeEventSource.next(theme);

    }

   
}