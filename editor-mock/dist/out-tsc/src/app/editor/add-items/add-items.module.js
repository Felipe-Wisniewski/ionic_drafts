import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddItemsPage } from './add-items.page';
var routes = [
    {
        path: '',
        component: AddItemsPage
    }
];
var AddItemsPageModule = /** @class */ (function () {
    function AddItemsPageModule() {
    }
    AddItemsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddItemsPage]
        })
    ], AddItemsPageModule);
    return AddItemsPageModule;
}());
export { AddItemsPageModule };
//# sourceMappingURL=add-items.module.js.map