import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var EditorService = /** @class */ (function () {
    function EditorService(http) {
        this.http = http;
    }
    EditorService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], EditorService);
    return EditorService;
}());
export { EditorService };
//# sourceMappingURL=editor.service.js.map