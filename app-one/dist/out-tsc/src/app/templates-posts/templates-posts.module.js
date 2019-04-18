import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TemplatesPostsPage } from './templates-posts.page';
var routes = [
    {
        path: '',
        component: TemplatesPostsPage
    }
];
var TemplatesPostsPageModule = /** @class */ (function () {
    function TemplatesPostsPageModule() {
    }
    TemplatesPostsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TemplatesPostsPage]
        })
    ], TemplatesPostsPageModule);
    return TemplatesPostsPageModule;
}());
export { TemplatesPostsPageModule };
//# sourceMappingURL=templates-posts.module.js.map