import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavbarService } from '../../navbar/services/navbar.service';
import { OverlayService } from '../../overlay/services/overlay.service';
import { ConfirmationDialogComponent } from '../../ui/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ProfileService } from '../services/profile.service';
import { VersionService } from '../services/version.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AppTheme } from 'src/app/app-theme.enum';
import { AppThemeService } from 'src/app/app-theme.service';
import { environment } from 'src/environments/environment';
import { SandboxService } from 'src/app/services/sandbox.service';
import { AuthorizationService } from '../../authorization/services/authorization.service';
import { ApiData } from '..';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    /** Flag que indica si la barra de navegación está abierta. */
    navbarIsOpen: boolean | null = null;

    numberRef = Number;

    environment = environment;

    /** La versión actual de la Web de RRHH Psico */
    webVersion$: Observable<string> = this.versionService.getWebVersion();

    /** La versión actual de la API de RRHH Psico */
    apiVersion$: Observable<ApiData> = this.versionService.getApiVersion();

    /** La versión actual de las interfaces de RRHH Psico */
    interfacesVersion$: Observable<string> = this.versionService.getInterfacesVersion();


    @ViewChild('slideToggle', { static: true })
    themeToggle: MatSlideToggle | null = null;

    constructor(
        public profileService: ProfileService,
        public versionService: VersionService,
        private navbarService: NavbarService,
        private router: Router,
        private matDialog: MatDialog,
        private overlayService: OverlayService,
        private snackBarService: SnackBarService,
        private appThemeService: AppThemeService,
        public sandboxService: SandboxService,
        private authorizationService: AuthorizationService,
    ) {}

    ngOnInit(): void {
        if (!environment.production && !environment.preProduction) {
            this.sandboxService.sandBoxModeEvent.subscribe(mode => {
                if (mode != null && mode != undefined) {
                    localStorage.setItem("sandbox_mode", mode.toString());
                    this.snackBarService.open(`Modo Sandbox ${mode ? 'ACTIVADO' : 'DESACTIVADO'}`, "Aceptar", 5000, "warning-snackbar");
                }
            });
        }
        this.navbarService.toggleEvent.subscribe((open: boolean) => {
            this.navbarIsOpen = open;
        });
    }

    /**
    * Abre y cierra la barra de navegación.
    */
    toggleNavbar() {
        this.navbarService.toggle();
    }

    /**
     * Cierra la sesión actual.
     */
    logout(): void {
        let dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.matDialog.open(ConfirmationDialogComponent, {
            data: {
                title: "Cerrar sesión",
                message: "Se cerrará la sesión ¿Desea continuar?",
                color: "accent",
            }
        });

        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.router.navigate(['sign/in']);
            }
        });
    }

    /**
     * Abre el menú de configuración de la estación de trabajo.
     */
     openStationConfiguration(): void {
        const permission: string = "station_edit-configuration";
        
    }

    /**
     * Cambia el esquema de colores entre claro y oscuro
     */
    toggleColorTheme() {
        this.appThemeService.setColorTheme(this.themeToggle?.checked ? AppTheme.APP_LIGHT : AppTheme.APP_DARK);
    }

    /**
     * Activa a desactiva el modo Sandbox
     */
     toggleSandboxMode(): void {
        this.sandboxService.toggleSandboxMode();
    }
}
