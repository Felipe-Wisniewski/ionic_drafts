import { Component, OnInit } from '@angular/core';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  canvas: Canvas;

  template = 'https://s3-sa-east-1.amazonaws.com/bancoimagens.com.br/backgrounds_en/3-template_brc2.png?i=10';
  product1 = 'https://s3-sa-east-1.amazonaws.com/imagens.catalogobeirario.com.br/grandes/8369-205-13488-15745.jpg';
  product2 = 'https://s3-sa-east-1.amazonaws.com/imagens.catalogobeirario.com.br/grandes/2123-200-17763-65457.jpg';

  // jsonTemplate = '{"version":"2.2.3","objects":[{"type":"image","version":"2.2.3","originX":"left","originY":"top","left":0,"top":0,"width":800,"height":800,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.12531017369727,"scaleY":0.12531017369727,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"crossOrigin":"Anonymous","cropX":0,"cropY":0,"removable":true,"maxWidth":800,"maxHeight":800,"controls":"background","cornerStyle":"circle","cornerSize":20,"rotatingPointOffset":30,"changeColor":true,"changeFont":true,"lockMovementX":true,"lockMovementY":true,"selectable":false,"lockUniScaling":true,"evented":false,"src":"https:\/\/s3-sa-east-1.amazonaws.com\/bancoimagens.com.br\/backgrounds_en\/3-template_brc2.png?i=10","filters":[]}],"background":"#FFFFFF","lockNewObjects":true,"name":"atemporal2 en","thumbnailUrl":"https:\/\/s3-sa-east-1.amazonaws.com\/bancoimagens.com.br\/templates\/9bcc2a0cc1da524aac2e5d34f073c49d.","thumbnail":"9bcc2a0cc1da524aac2e5d34f073c49d."}'

  constructor() {}

  ngOnInit() {
    this.loadCanvas();
  }

  loadCanvas() {
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.setDimensions({width:600, height:600})
    
    //add template
    fabric.Image.fromURL(this.template, (template) => {
      template.scaleToHeight(this.canvas.getHeight());
      this.canvas.setOverlayImage(template, this.canvas.renderAll.bind(this.canvas));
    });

    //produto 1
    fabric.Image.fromURL(this.product1, (product1) => {
      product1.scale(0.4);
      product1.cornerStyle = 'circle';
      product1.lockUniScaling = true;

      this.canvas.add(product1);
      product1.center();
      console.log("2");
    });

    //produto 2
    fabric.Image.fromURL(this.product2, (product2) => {
      product2.scale(0.4);
      product2.lockUniScaling = true;

      this.canvas.add(product2);
      console.log("3");
    });

  }

  

}
