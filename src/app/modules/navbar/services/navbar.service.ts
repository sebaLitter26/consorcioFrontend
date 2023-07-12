import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NavbarItem, NavigationItem } from '..';
import { ProfileService } from '../../main/services/profile.service';

@Injectable()
export class NavbarService {
    /** Evento que se dispara cuando se navega a un item de la barra de navegación. */
    private navigationEventSource: BehaviorSubject<string | null> =
        new BehaviorSubject<string | null>(null);
    navigationEvent: Observable<string | null> =
        this.navigationEventSource.asObservable();

    /** Evento que se dispara cuando se cierra o abre la barra de navegación. */
    private toggleEventSource: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    toggleEvent: Observable<boolean> = this.toggleEventSource.asObservable();

    /** Un `array` con los items de la barra de navegación. */
    navbarItems: NavbarItem[] = [];


    selectedItem$: Observable<string> = of('Empleos');

    constructor(private profileService: ProfileService) {
        this.profileService.userChangeEvent().subscribe((user) => {
            if (user.email) {
                this._initNavbarItems();
            }
        });
    }

    /**
     * Abre o cierra la barra de navegación
     */
    toggle() {
        this.toggleEventSource.next(!this.toggleEventSource.value);
    }

    /**
     * Devuelve los items de navegación del usuario actual
     * @returns `NavbarItem[]`
     */
    getNavbarItems(): NavbarItem[] {
        return this.navbarItems;
    }

    /**
     * Navega a un item de la barra de navegación por ruta
     * @param description la ruta del item
     */
    highlightByRoute(route: string): void {
        this.navigationEventSource.next(route);
    }

    /**
     * Inicializa la barra de navegación con los items correspondientes
     */
    private _initNavbarItems() {
        let preItems: NavbarItem[] = [];

        this.navbarItems = [];
        
        if (this.profileService.hasModuleAccess('user')) {
            preItems.push(this._getUserControl());
        }
        

        if (this.profileService.hasModuleAccess('consorcio')) {
            preItems.push(this._getConsorcioItems());
        }

        if (this.profileService.hasModuleAccess('cart')) {
            preItems.push(this._getCartItems());
        }

        if (this.profileService.hasModuleAccess('development')) {
            //preItems.push(this._getDevelopmentItems());
        }
        

        for (let item of preItems) {
            if (item.navigationItems.length) {
                this.navbarItems.push(item);
            }
        }
    }

    

    private _getConsorcioItems(): NavbarItem {
        let operations: NavbarItem = {
            description: 'Consorcio',
            icon: 'fa fa-fw fa-cog',
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('cargas')) {
            operations.navigationItems.push({
                description: 'Carga de datos',
                icon: 'fa fa-fw fa-tasks',
                route: 'consorcio/cargas',
                checked: true,
            });
        }

        if (this.profileService.hasRouteAccess('report')) {
            operations.navigationItems.push({
                description: 'Mis cargas',
                icon: 'fa fa-fw fa-route',
                route: 'consorcio/report',
                checked: true,
            });
        }

        /* if (this.profileService.hasRouteAccess('rendicion-report')) {
            operations.navigationItems.push({
                description: 'Consultas',
                icon: 'fa fa-fw fa-route',
                route: 'recursos/rendicion-report',
                checked: false,
            });
        } */

        return operations;
    }

    private _getCartItems(): NavbarItem {
        let operations: NavbarItem = {
            description: 'Compras',
            icon: 'fa fa-fw fa-cog',
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('product-list')) {
            operations.navigationItems.push({
                description: 'Lista de productos',
                icon: 'fa fa-fw fa-tasks',
                route: 'cart/product-list',
                checked: true,
            });
        }

        if (this.profileService.hasRouteAccess('order')) {
            operations.navigationItems.push({
                description: 'Mis Compras',
                icon: 'fa fa-fw fa-route',
                route: 'cart/order-history',
                checked: true,
            });
        }

        /* if (this.profileService.hasRouteAccess('rendicion-report')) {
            operations.navigationItems.push({
                description: 'Consultas',
                icon: 'fa fa-fw fa-route',
                route: 'recursos/rendicion-report',
                checked: false,
            });
        } */

        return operations;
    }

    private _getDevelopmentItems(): NavbarItem {
        let development: NavbarItem = {
            description: 'Desarrollo',
            icon: 'fa fa-fw fa-bug',
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('component-debugging')) {
            development.navigationItems.push({
                description: 'Depuración',
                icon: 'fa fa-fw fa-puzzle-piece',
                route: 'development/component-debugging',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('zpl')) {
            development.navigationItems.push({
                description: 'ZPL',
                icon: 'fa fa-fw fa-horse-head',
                route: 'development/zpl',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('snackbar-tester')) {
            development.navigationItems.push({
                description: 'Snack Bar Tester',
                icon: 'fa fa-fw fa-comment',
                route: 'development/snackbar-tester',
                checked: false,
            });
        }

        return development;
    }

    private _getUserControl(): NavbarItem {
        let users: NavbarItem = {
            description: 'Usuarios',
            icon: 'fa fas fa-users-cog',
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('permissions')) {
            users.navigationItems.push({
                description: 'Permisos',
                icon: 'fa fa-address-card',
                route: 'user/permissions',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('profiles')) {
            users.navigationItems.push({
                description: 'Perfiles',
                icon: 'fa far fa-users',
                route: 'user/profiles',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('roles')) {
            users.navigationItems.push({
                description: 'Roles',
                icon: 'fas fa-user-tag',
                route: 'user/roles',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('user-admin')) {
            users.navigationItems.push({
                description: 'Usuarios',
                icon: 'fa far fa-users',
                route: 'user/user-admin',
                checked: false,
            });
        }

        return users;
    }
}
