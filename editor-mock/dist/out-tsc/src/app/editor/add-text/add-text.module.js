import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddTextPage } from './add-text.page';
var routes = [
    {
        path: '',
        component: AddTextPage
    }
];
var AddTextPageModule = /** @class */ (function () {
    function AddTextPageModule() {
    }
    AddTextPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddTextPage]
        })
    ], AddTextPageModule);
    return AddTextPageModule;
}());
export { AddTextPageModule };
//# sourceMappingURL=add-text.module.js.map