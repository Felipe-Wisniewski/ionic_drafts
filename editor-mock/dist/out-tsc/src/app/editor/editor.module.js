import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditorPage } from './editor.page';
var routes = [
    {
        path: '',
        component: EditorPage
    }
];
var EditorPageModule = /** @class */ (function () {
    function EditorPageModule() {
    }
    EditorPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditorPage]
        })
    ], EditorPageModule);
    return EditorPageModule;
}());
export { EditorPageModule };
//# sourceMappingURL=editor.module.js.map