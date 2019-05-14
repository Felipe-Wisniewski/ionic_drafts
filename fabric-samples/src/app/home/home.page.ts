import { Component, OnInit } from '@angular/core';
import { Canvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  canvas: Canvas;

  imgBg = 'https://s3-sa-east-1.amazonaws.com/bancoimagens.com.br/backgrounds_en/3-template_brc2.png?i=10';
  imgProd = 'https://s3-sa-east-1.amazonaws.com/imagens.catalogobeirario.com.br/grandes/8369-205-13488-15745.jpg';

  constructor() {}

  ngOnInit() {
    this.loadCanvas();
  }

  loadCanvas() {
    this.canvas = new fabric.Canvas('canvas');
    
    fabric.Image.fromURL(this.imgBg, (imgBg) => {
      this.canvas.setOverlayImage(imgBg, this.canvas.renderAll.bind(this.canvas));
    });

    fabric.Image.fromURL(this.imgProd, (imgProd) => {
      
      this.canvas.add(imgProd);
      imgProd.center();
    });
  }
}
