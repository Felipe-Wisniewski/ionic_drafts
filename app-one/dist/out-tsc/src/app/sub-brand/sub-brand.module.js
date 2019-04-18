import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SubBrandPage } from './sub-brand.page';
var routes = [
    {
        path: '',
        component: SubBrandPage
    }
];
var SubBrandPageModule = /** @class */ (function () {
    function SubBrandPageModule() {
    }
    SubBrandPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SubBrandPage]
        })
    ], SubBrandPageModule);
    return SubBrandPageModule;
}());
export { SubBrandPageModule };
//# sourceMappingURL=sub-brand.module.js.map