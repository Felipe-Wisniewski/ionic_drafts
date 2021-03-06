import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform, PopoverController } from '@ionic/angular';
import { WebSharePage } from '../web-share/web-share.page';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(
    private platform: Platform,
    private popover: PopoverController,
    private share: SocialSharing
  ) { }

  async shareImage(base64) {
    if (this.platform.is('desktop')) {
      const popover = await this.popover.create({
        component: WebSharePage,
        animated: true,
        translucent: true,
        mode: "md",
        componentProps: {
          base64: base64,
          blob: this.base64toBlob(base64)
        }
      })
      return await popover.present()

    } else {
      var options = {
        // message: null, // not supported on some apps (Facebook, Instagram)
        // subject: null, // fi. for email
        files: [base64], // an array of filenames either locally or remotely
        // url: 'https://www.website.com/foo/#bar?a=b',
        chooserTitle: 'Share via...' // Android only, you can override the default share sheet title
        // appPackageName: 'com.instagram.android' // Android only, you can provide id of the App you want to share with
      }

      this.share.shareWithOptions(options).then((result) => {
        console.log("Result", result)
        console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
        console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)

      }).catch((err) => {
        console.log("Sharing failed with message: " + err);
      })
    }
  }

  private async base64toBlob(fileBase64) {
    let dataBlock = fileBase64.split(";")
    let contentType = dataBlock[0].split(":")[1]
    let base64 = dataBlock[1].split(",")[1]

    const bytes = atob(base64)
    const byteNumbers = new Array(bytes.length)

    for (let i = 0; i < bytes.length; i++)
      byteNumbers[i] = bytes.charCodeAt(i)

    const byteArray = new Uint8Array(byteNumbers)
    const blob = await new Blob([byteArray], { type: contentType })
    return blob;
  }
}

// 'com.google.android.apps.photos',
// 'com.facebook.katana',
// 'com.facebook.orca',
// 'com.instagram.android',
// 'com.twitter.android' 
// 'com.google.android.apps.messaging',

  // Twitter
  // <!-- unlike most apps Twitter doesn't like it when you use an array to pass multiple files as the second param -->
  // shareViaTwitter('Message via Twitter')">message via Twitter</button>
  // shareViaTwitter('Message and link via Twitter', null /* img */, 'http://www.x-services.nl')">msg and link via Twitter</button>

  // Facebook
  // shareViaFacebook('Message via Facebook', null /* img */, null /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)})">msg via Facebook (with errcallback)</button>
  // shareViaFacebookWithPasteMessageHint('Message via Facebook', null /* img */, null /* url */, 'Paste it dude!', function() {console.log('share ok')}, function(errormsg){alert(errormsg)})">msg via Facebook (with errcallback)</button>

  // Whitelisting Facebook in your app's .plist:
  // <key>LSApplicationQueriesSchemes</key>
  // <array>
  //   <string>fb</string>
  // </array>

  // Instagram
  // shareViaInstagram('Message via Instagram', 'https://www.google.nl/images/srpr/logo4w.png', function() {console.log('share ok')}, function(errormsg){alert(errormsg)})">msg via Instagram</button>

  // Whatsapp
  // shareViaWhatsApp('Message via WhatsApp', null /* img */, null /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)})">msg via WhatsApp (with errcallback)</button>
