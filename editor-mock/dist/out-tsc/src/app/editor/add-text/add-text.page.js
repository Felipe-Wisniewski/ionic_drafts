import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
var AddTextPage = /** @class */ (function () {
    function AddTextPage(navParams) {
        this.navParams = navParams;
        this.fonts = ['Arial', 'Calibri', 'Roboto', 'Times New Roman', 'Verdana'];
        this.text = '';
        this.textFont = '';
        this.textSize = '';
        this.textColor = '';
        this.textOpacity = 0;
        this.selectedText = false;
        this.selectedFont = false;
        this.selectedSize = false;
        this.selectedColor = false;
        this.selectedOpacity = false;
    }
    AddTextPage.prototype.ngOnChanges = function () {
        console.log('On  Changes');
    };
    AddTextPage.prototype.ngOnInit = function () {
        console.log('ngOnInit');
        this.canvas = this.navParams.get('canvas');
        this.objText = this.navParams.get('objText');
        this.setTextSettings();
    };
    AddTextPage.prototype.setTextSettings = function () {
        console.log(this.objText);
        console.log(this.objText.text);
        console.log(this.objText.fontFamily);
        console.log(this.objText.fontSize);
        console.log(this.objText.fill);
        console.log(this.objText.opacity);
        console.log('----------------------------------------');
        this.text = this.objText.text;
        this.textFont = this.objText.fontFamily;
        this.textSize = this.objText.fontSize;
        this.textColor = this.objText.fill;
        this.textOpacity = this.objText.opacity;
    };
    AddTextPage.prototype.setParamsText = function () {
        this.objText.text = this.text;
        this.objText.fontFamily = this.textFont;
        this.objText.fontSize = this.textSize;
        this.objText.fill = this.textColor;
        this.objText.opacity = this.textOpacity;
        this.canvas.renderAll();
    };
    AddTextPage.prototype.openTool = function (choose) {
        switch (choose) {
            case 'text': {
                this.closeTools();
                this.selectedText = true;
                break;
            }
            case 'font': {
                this.closeTools();
                this.selectedFont = true;
                break;
            }
            case 'size': {
                this.closeTools();
                this.selectedSize = true;
                break;
            }
            case 'color': {
                this.closeTools();
                this.selectedColor = true;
                break;
            }
            case 'opacity': {
                this.closeTools();
                this.selectedOpacity = true;
                break;
            }
            default: {
                break;
            }
        }
    };
    AddTextPage.prototype.closeTools = function () {
        this.selectedText = false;
        this.selectedFont = false;
        this.selectedSize = false;
        this.selectedColor = false;
        this.selectedOpacity = false;
    };
    AddTextPage = tslib_1.__decorate([
        Component({
            selector: 'app-add-text',
            templateUrl: './add-text.page.html',
            styleUrls: ['./add-text.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavParams])
    ], AddTextPage);
    return AddTextPage;
}());
export { AddTextPage };
//# sourceMappingURL=add-text.page.js.map