import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  imgSrc = 'https://s3-sa-east-1.amazonaws.com/bancoimagens.com.br/posts/8246-355-11079-29452.jpg'

  constructor(private socialSharing: SocialSharing) { }

  share() {
    // this.socialSharing.shareViaFacebook('Sharing Facebook', null, this.imgSrc, () => { console.log('share ok') }, () => { console.log('error share') })
    this.socialSharing.shareViaFacebook('Sharing Facebook', null, this.imgSrc)
  }



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
}




