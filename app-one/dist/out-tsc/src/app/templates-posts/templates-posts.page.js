import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var TemplatesPostsPage = /** @class */ (function () {
    function TemplatesPostsPage(route) {
        this.route = route;
        this.getBrandId();
    }
    TemplatesPostsPage.prototype.getBrandId = function () {
        var _this = this;
        this.subscription = this.route.queryParams.subscribe(function (params) {
            _this.cod_brand = params['cod_brand'];
        });
    };
    TemplatesPostsPage.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    TemplatesPostsPage = tslib_1.__decorate([
        Component({
            selector: 'app-templates-posts',
            templateUrl: './templates-posts.page.html',
            styleUrls: ['./templates-posts.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute])
    ], TemplatesPostsPage);
    return TemplatesPostsPage;
}());
export { TemplatesPostsPage };
//# sourceMappingURL=templates-posts.page.js.map