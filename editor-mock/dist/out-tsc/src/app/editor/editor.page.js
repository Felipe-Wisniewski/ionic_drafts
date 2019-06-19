import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { EditorService } from './editor.service';
import { PopoverController } from '@ionic/angular';
import { fabric } from 'fabric';
import { AddTextPage } from './add-text/add-text.page';
var EditorPage = /** @class */ (function () {
    function EditorPage(editorService, popoverController) {
        this.editorService = editorService;
        this.popoverController = popoverController;
        this.title = 'Test';
        this.textIsSelected = true;
    }
    EditorPage.prototype.ngOnInit = function () {
        this.getChoices();
    };
    EditorPage.prototype.getChoices = function () {
        var _this = this;
        this.subscription$ = this.editorService.getTemplate()
            .subscribe(function (_template) {
            _this.json = _template['json'];
            _this.setCanvasDimensions();
        });
        this.subscription$ = this.editorService.getProducts()
            .subscribe(function (prods) {
            if (prods > 1) {
                console.log('>', prods);
            }
            else {
                console.log('<', prods);
            }
        });
    };
    EditorPage.prototype.setCanvasDimensions = function () {
        this.canvas = new fabric.Canvas('canvas');
        var header = document.getElementsByTagName('ion-header').item(0).clientHeight;
        var footer = document.getElementsByTagName('ion-footer').item(0).clientHeight;
        var widthScreen = parent.innerWidth;
        var heightScreen = parent.innerHeight - (header + footer);
        if (widthScreen > heightScreen) {
            this.canvas.setDimensions({ width: heightScreen, height: heightScreen });
        }
        else {
            this.canvas.setDimensions({ width: widthScreen, height: widthScreen });
        }
        // console.log(`canvas - w:${this.canvas.getWidth()} x h:${this.canvas.getHeight()}`)
        // this.getCanvasEvents()
        this.setTemplateOnCanvas();
    };
    EditorPage.prototype.setTemplateOnCanvas = function () {
        var _this = this;
        var fonts = [];
        this.json.objects.forEach(function (obj) {
            obj.scaleX = obj.scaleX / 100 * _this.canvas.getWidth();
            obj.scaleY = obj.scaleY / 100 * _this.canvas.getHeight();
            obj.top = obj.top / 100 * _this.canvas.getHeight();
            obj.left = obj.left / 100 * _this.canvas.getWidth();
            obj.lastGoodLeft = obj.left;
            obj.lastGoodTop = obj.top;
            if (!obj.selectable) {
                obj.evented = false;
            }
            if (obj.type == 'text') {
                // let font = new FontFaceObserver(obj.fontFamily)
                // fonts.push(font.load().catch(() => obj.fontFamily = 'Roboto'))
            }
            console.log(fonts);
            if (obj.controls == "background") {
            }
            console.log("json obj -> ", obj);
        });
        this.canvas.loadFromJSON(this.json, this.canvas.renderAll.bind(this.canvas), function (o, ob) {
            console.log('loadFromJSON');
            console.log(o);
            console.log(ob);
            console.log('------------');
            _this.canvas.sendToBack(ob).renderAll();
        });
    };
    EditorPage.prototype.getCanvasEvents = function () {
        var _this = this;
        this.canvas.on({
            'mouse:down': function (obj) {
                console.log("mouse:down:");
                console.log(obj);
                if (obj.target) {
                    switch (obj.target.type) {
                        case 'text': {
                            _this.objText = obj.target;
                            _this.textIsSelected = false;
                            break;
                        }
                        default: {
                            _this.textIsSelected = false;
                            break;
                        }
                    }
                }
            },
            'touch:gesture': function (obj) {
                console.log("touch gesture:");
                console.log(obj);
            },
            'mouse:up': function (obj) {
                console.log("mouse:up:");
                console.log(obj);
            },
            'after:render': function (obj) {
                console.log("after:render:");
                console.log(obj);
            },
            'before:selection:cleared': function (obj) {
                console.log("before:selection:cleared:");
                console.log(obj);
            },
            'selection:created': function (obj) {
                console.log("selection:created:");
                console.log(obj);
            },
            'selection:cleared': function (obj) {
                console.log("selection:cleared:");
                console.log(obj);
            },
            'object:modified': function (obj) {
                console.log("object:modified:");
                console.log(obj);
            },
            'object:selected': function (obj) {
                console.log("object:selected:");
                console.log(obj);
            },
            'object:moving': function (obj) {
                console.log("object:moving:");
                console.log(obj);
            },
            'object:scaling': function (obj) {
                console.log("object:scaling:");
                console.log(obj);
            },
            'object:rotating': function (obj) {
                console.log("object:rotating:");
                console.log(obj);
            },
            'object:added': function (obj) {
                console.log("object:added:");
                console.log(obj);
            },
            'object:removed': function (obj) {
                console.log("object:removed:");
                console.log(obj);
            }
        });
    };
    EditorPage.prototype.share = function () {
        console.log('share');
    };
    EditorPage.prototype.openChangeProduct = function () {
        console.log('openChangeProduct');
    };
    EditorPage.prototype.addItems = function () {
    };
    /* async addItems() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Insert items',
        buttons: [{
          text: 'Brand logos',
          icon: 'photos',
          handler: () => { this.addItemsModal() }
        }, {
          text: 'Your logo',
          icon: 'image',
          handler: () => { this.addItemsModal() }
        }, {
          text: 'Stamps',
          icon: 'pricetags',
          handler: () => { this.addItemsModal() }
        }, {
          text: 'Icons',
          icon: 'information',
          handler: () => { this.addItemsModal() }
        }]
      })
      await actionSheet.present()
    }
  
    async addItemsModal() {
      const modal = await this.modalController.create({
        component: '',
        componentProps: {
          choose: 'choose'
        }
      })
  
      modal.onDidDismiss().then((it) => {
        if (it.data != null || it.data != undefined) {
          console.log(it.data['choose'])
          let image = it.data['choose'].image_url
        }
      })
      return await modal.present()
    } */
    EditorPage.prototype.optionsEditText = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popover;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: AddTextPage,
                            event: ev,
                            animated: true,
                            translucent: true,
                            componentProps: {
                                objText: this.objText,
                                canvas: this.canvas
                            }
                        })];
                    case 1:
                        popover = _a.sent();
                        popover.onDidDismiss().then(function (it) {
                            console.log(it);
                        });
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EditorPage.prototype.deleteObject = function () {
        console.log('deleteObjectOnCanvas');
    };
    EditorPage.prototype.ngOnDestroy = function () {
        console.log('On Destroy');
    };
    EditorPage = tslib_1.__decorate([
        Component({
            selector: 'app-editor',
            templateUrl: './editor.page.html',
            styleUrls: ['./editor.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [EditorService, PopoverController])
    ], EditorPage);
    return EditorPage;
}());
export { EditorPage };
//# sourceMappingURL=editor.page.js.map