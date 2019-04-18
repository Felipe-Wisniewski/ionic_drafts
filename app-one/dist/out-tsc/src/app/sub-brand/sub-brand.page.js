import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var SubBrandPage = /** @class */ (function () {
    function SubBrandPage(route, storage) {
        this.route = route;
        this.storage = storage;
        this.getSubBrandsId();
        this.teste();
    }
    SubBrandPage.prototype.getSubBrandsId = function () {
        var _this = this;
        this.subscription = this.route.queryParams.subscribe(function (params) {
            _this.cod_sub_brand = params['sub_marca'];
        });
    };
    SubBrandPage.prototype.teste = function () {
        this.storage.get('brands').then(function (it) {
            console.log(it);
        });
    };
    SubBrandPage.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SubBrandPage = tslib_1.__decorate([
        Component({
            selector: 'app-sub-brand',
            templateUrl: './sub-brand.page.html',
            styleUrls: ['./sub-brand.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Storage])
    ], SubBrandPage);
    return SubBrandPage;
}());
export { SubBrandPage };
//# sourceMappingURL=sub-brand.page.js.map