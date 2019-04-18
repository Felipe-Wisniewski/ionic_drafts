import * as tslib_1 from "tslib";
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
var HomeService = /** @class */ (function () {
    function HomeService(http, storage) {
        this.http = http;
        this.storage = storage;
        this.urlBrands = environment.URL_API + 'brands';
        this.brandsMock = 'assets/mocks/brands.json';
        this.url = this.brandsMock;
    }
    HomeService.prototype.getBrands = function () {
        var _this = this;
        return this.http.get(this.url)
            .pipe(tap(function (resp) { return _this.storage.set('brands', resp); }));
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