import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
var HomePage = /** @class */ (function () {
    function HomePage(homeService, router) {
        this.homeService = homeService;
        this.router = router;
        this.loadBrands();
    }
    HomePage.prototype.loadBrands = function () {
        var _this = this;
        this.subscription = this.homeService.getBrands().subscribe(function (resp) {
            _this.brands = resp['brands'].filter(function (b) { return b.home; });
        });
    };
    HomePage.prototype.selectBrand = function (brand) {
        if (brand.sub_marca == null) {
            this.router.navigate(['templates-posts'], {
                queryParams: {
                    'cod_brand': brand.cod_brand
                }
            });
        }
        else {
            this.router.navigate(['sub-brand'], {
                queryParams: {
                    'sub_marca': brand.sub_marca
                }
            });
        }
    };
    HomePage.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HomeService, Router])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map