import { TestBed } from '@angular/core/testing';
import { EditorService } from './editor.service';
describe('EditorService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(EditorService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=editor.service.spec.js.map