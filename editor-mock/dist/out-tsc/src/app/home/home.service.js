import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
var HomeService = /** @class */ (function () {
    function HomeService(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    HomeService.prototype.getTemplate = function () {
        return this.http.get('http://localhost:3000/template');
    };
    HomeService.prototype.getProduct = function () {
        return this.http.get('http://localhost:3000/product');
    };
    HomeService.prototype.getProducts = function () {
        return this.http.get('http://localhost:3000/products');
    };
    HomeService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Storage])
    ], HomeService);
    return HomeService;
}());
export { HomeService };
//# sourceMappingURL=home.service.js.map