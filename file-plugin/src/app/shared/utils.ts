import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(private alertController: AlertController, private toast: ToastController) { }

    async alertToast(message: string) {
        const toast = await this.toast.create({
            message: message,
            duration: 2000
        })
        toast.present()
    }

    async alertPopup(message: string) {
        const alert = await this.alertController.create({
            header: 'Erro',
            message: message,
            buttons: ['OK']
        })
        await alert.present()
    }

    base64toBlob(b64Data, contentType, sliceSize) {
        
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        let byteCharacters = atob(b64Data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
}
