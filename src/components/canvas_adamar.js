import React, { Component } from 'react';
import { connect } from 'react-redux';

class CanvasAdamar extends Component {
  constructor(props) {
    super(props);
    this.arr = [];
    this.code_arr = [];
    this.fake_code_arr = [];
    this.key_arr = [];
    this.fake_key_arr = [];
    this.decode_arr = [];
    this.decode_arr_avarage = []

  }
  componentDidMount(){
    this.updateCanvas();

  }
  updateCanvas() {
    this.canvas1 = document.getElementById('canvas1');;
    this.ctx1 = this.canvas1.getContext('2d');
    this.canvas2 = document.getElementById('canvas2');
    this.ctx2 = this.canvas2.getContext('2d');
    this.canvas3 = document.getElementById('canvas3');
    this.ctx3 = this.canvas3.getContext('2d');
    this.canvas4 = document.getElementById('canvas4');
    this.ctx4 = this.canvas4.getContext('2d');

    this.img = new Image();
    this.img.src = "./src/images/7.png";
    const self = this;
    this.img.onload = function() {
      self.setCanvasWidthHeight(self.canvas1, self.img.width, self.img.height);
      self.ctx1.drawImage(self.img, 0, 0);
      self.img.style.display = 'none';
      for (var i = 0; i < self.canvas1.height; i++){
        self.arr[i] = [];
        for (var j = 0; j < self.canvas1.width; j++){
          console.log(j);
          self.pixel = self.ctx1.getImageData(j, i, 1, 1);
          self.data = self.pixel.data;
          self.arr[i].push([self.data[0], self.data[1], self.data[2]]);
        }
      }
      console.log(self.arr);
    };
  }
  code () {
    this.generateKeyArray(this.canvas1);
    this.generateCodeArray(this.canvas1);

    this.drawCanvas(this.canvas3, this.ctx3, this.fake_key_arr);
    this.drawCanvas(this.canvas2, this.ctx2, this.fake_code_arr);

  }
  decode () {
    this.generateDecodeArray();

    this.drawCanvas(this.canvas4, this.ctx4, this.decode_arr_avarage);


  }

  generateKeyArray (canvas) {
    for (var i = 0; i < canvas.height*2; i=i+2){
      this.key_arr[i] = [];
      this.key_arr[i+1] = [];
      this.fake_key_arr[i] = [];
      this.fake_key_arr[i+1] = [];
      this.fake_code_arr[i] = [];
      this.fake_code_arr[i+1] = [];
      for (var j = 0; j < canvas.width*2; j=j+2){
        this.setKeyArrayMatrix2x2(i);
        this.setFakeKeyArrayMatrix2x2(i);
        this.setFakeCodeArrayMatrix2x2(i);

      }
    }
    console.log(this.key_arr);
  }


  generateCodeArray (canvas) {
    for (var i = 0; i < canvas.height*2; i=i+2){
      this.code_arr[i] = [];
      this.code_arr[i+1] = [];
      for (var j = 0; j < canvas.width*2; j=j+2){
        this.code_arr[i][j] = [];
        this.code_arr[i][j+1] = [];
        this.code_arr[i+1][j] = [];
        this.code_arr[i+1][j+1] = [];
        for (var k = 0; k<3; k++) {
          this.setCodeArrayMatrix2x2(i,j,k);
        }
      }
    }
    console.log(this.code_arr);
  }
  generateDecodeArray () {
    for (var i = 0; i < this.key_arr.length; i++){
      this.decode_arr[i] = [];
      for (var j = 0; j < this.key_arr[i].length; j++){
        this.decode_arr[i][j] = [];
        for (var k = 0; k < 3; k++) {
          if (this.code_arr[i][j][k] === 0 && this.key_arr[i][j][k] === 0 ) {
            this.decode_arr[i][j].push(0);
          } else {
            this.decode_arr[i][j].push(255);
          }
        }
      }
    }
    for (var i = 0; i < this.decode_arr.length; i=i+2){
      this.decode_arr_avarage[i/2] = [];
      for (var j = 0; j < this.key_arr[i].length; j=j+2){
        this.decode_arr_avarage[i/2][j/2] = [];
        var r_avarage = Math.round((this.decode_arr[i][j][0]+this.decode_arr[i+1][j][0]+this.decode_arr[i][j+1][0]+this.decode_arr[i+1][j+1][0])/4);
        var g_avarage = Math.round((this.decode_arr[i][j][1]+this.decode_arr[i+1][j][1]+this.decode_arr[i][j+1][1]+this.decode_arr[i+1][j+1][1])/4);
        var b_avarage = Math.round((this.decode_arr[i][j][2]+this.decode_arr[i+1][j][2]+this.decode_arr[i][j+1][2]+this.decode_arr[i+1][j+1][2])/4);
        this.decode_arr_avarage[i/2][j/2].push(r_avarage, g_avarage, b_avarage);

      }
    }










    console.log(this.decode_arr);
    console.log(this.decode_arr_avarage);
  }
  drawCanvas (canvas,ctx,arr) {
    this.setCanvasWidthHeight(canvas,arr[0].length, arr.length );
    for (var i = 0; i < arr.length; i++){
      for (var j = 0; j < arr[i].length; j++){
          this.drawPixel(ctx,j,i,arr[i][j][0],arr[i][j][1],arr[i][j][2]);
      }
    }
    ctx.mozImageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;
    ctx.msImageSmoothingEnabled = true;
    ctx.imageSmoothingEnabled = true;
  }

  setFakeKeyArrayMatrix2x2 (i) {
    var rand = Math.floor(Math.random() * 4);
    switch (rand) {
      case 0:
        this.fake_key_arr[i].push([255,255,0]);
        this.fake_key_arr[i].push([255,0,0]);
        this.fake_key_arr[i+1].push([0,0,255]);
        this.fake_key_arr[i+1].push([0,255,255]);
        break;
      case 1:
        this.fake_key_arr[i].push([0,0,255]);
        this.fake_key_arr[i].push([255,255,0]);
        this.fake_key_arr[i+1].push([255,0,255]);
        this.fake_key_arr[i+1].push([0,255,0]);
        break;
      case 2:
        this.fake_key_arr[i].push([0,255,255]);
        this.fake_key_arr[i].push([255,0,0]);
        this.fake_key_arr[i+1].push([0,255,0]);
        this.fake_key_arr[i+1].push([255,0,255]);
        break;
      case 3:
        this.fake_key_arr[i].push([0,0,255]);
        this.fake_key_arr[i].push([255,255,0]);
        this.fake_key_arr[i+1].push([0,255,255]);
        this.fake_key_arr[i+1].push([255,0,0]);
        break;
      default:
        this.fake_key_arr[i].push([0,0,255]);
        this.fake_key_arr[i].push([255,255,0]);
        this.fake_key_arr[i+1].push([0,255,255]);
        this.fake_key_arr[i+1].push([255,0,0]);
    }

  }
  setFakeCodeArrayMatrix2x2 (i) {
    var rand = Math.floor(Math.random() * 4);
    switch (rand) {
      case 0:
        this.fake_code_arr[i].push([255,255,0]);
        this.fake_code_arr[i].push([255,0,0]);
        this.fake_code_arr[i+1].push([0,0,255]);
        this.fake_code_arr[i+1].push([0,255,255]);
        break;
      case 1:
        this.fake_code_arr[i].push([0,0,255]);
        this.fake_code_arr[i].push([255,255,0]);
        this.fake_code_arr[i+1].push([255,0,255]);
        this.fake_code_arr[i+1].push([0,255,0]);
        break;
      case 2:
        this.fake_code_arr[i].push([0,255,255]);
        this.fake_code_arr[i].push([255,0,0]);
        this.fake_code_arr[i+1].push([0,255,0]);
        this.fake_code_arr[i+1].push([255,0,255]);
        break;
      case 3:
        this.fake_code_arr[i].push([0,0,255]);
        this.fake_code_arr[i].push([255,255,0]);
        this.fake_code_arr[i+1].push([0,255,255]);
        this.fake_code_arr[i+1].push([255,0,0]);
        break;
      default:
        this.fake_code_arr[i].push([0,0,255]);
        this.fake_code_arr[i].push([255,255,0]);
        this.fake_code_arr[i+1].push([0,255,255]);
        this.fake_code_arr[i+1].push([255,0,0]);
    }

  }
  setKeyArrayMatrix2x2 (i) {
    this.key_arr[i].push([0,0,255]);
    this.key_arr[i].push([255,255,0]);
    this.key_arr[i+1].push([0,255,255]);
    this.key_arr[i+1].push([255,0,0]);
  }
  setCodeArrayMatrix2x2 (i,j,k) {
    if (this.arr[i/2][j/2][k] < 85 ){
      switch (k) {
        case 0:
          this.code_arr[i][j].push(0);
          this.code_arr[i][j+1].push(255);
          this.code_arr[i+1][j].push(0);
          this.code_arr[i+1][j+1].push(255);
          break;
        case 1:
          this.code_arr[i][j].push(0);
          this.code_arr[i][j+1].push(255);
          this.code_arr[i+1][j].push(255);
          this.code_arr[i+1][j+1].push(0);
          break;
        case 2:
          this.code_arr[i][j].push(255);
          this.code_arr[i][j+1].push(0);
          this.code_arr[i+1][j].push(255);
          this.code_arr[i+1][j+1].push(0);
          break;
        default:
          console.log('error');
      }
    } else if (this.arr[i/2][j/2][k] < 170 ) {
      this.code_arr[i][j].push(255);
      this.code_arr[i][j+1].push(255);
      this.code_arr[i+1][j].push(0);
      this.code_arr[i+1][j+1].push(0);
    } else {
      switch (k) {
        case 0:
          this.code_arr[i][j].push(255);
          this.code_arr[i][j+1].push(0);
          this.code_arr[i+1][j].push(255);
          this.code_arr[i+1][j+1].push(0);
          break;
        case 1:
          this.code_arr[i][j].push(255);
          this.code_arr[i][j+1].push(0);
          this.code_arr[i+1][j].push(0);
          this.code_arr[i+1][j+1].push(255);
          break;
        case 2:
          this.code_arr[i][j].push(0);
          this.code_arr[i][j+1].push(255);
          this.code_arr[i+1][j].push(0);
          this.code_arr[i+1][j+1].push(255);
          break;
        default:
          console.log('error');
      }
    }
  }

  setCanvasWidthHeight (canvas,w,h){
    canvas.width = w;
    canvas.height = h;
  }
  drawPixel (ctx,x,y,r,g,b) {
    var hex = this.rgbToHex(r,g,b);
    ctx.fillStyle = hex;
    ctx.fillRect(x, y, 1, 1);
  }
  componentToHex (c){
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
  }
  rgbToHex(r, g, b) {
      var rHex = this.componentToHex(r);
      var gHex = this.componentToHex(g);
      var bHex = this.componentToHex(b);
      return "#" + rHex + gHex + bHex;
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1> Шифрування кольорових зображень з використанням матриць Адамара </h1>
          </div>
        </div>
        <div className="row align-items-center" >
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <p>Секретне зображення</p>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <p>Закодоване зображення</p>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <p>Ключ </p>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <p>Розкодоване зображення</p>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <canvas id="canvas1"></canvas>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <canvas id="canvas2"></canvas>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <canvas id="canvas3"></canvas>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <canvas id="canvas4"></canvas>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <button className="btn" onClick={this.code.bind(this)} >Зашифрувати</button>
          </div>
          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
            <button className="btn" onClick={this.decode.bind(this)} >Розшифрувати</button>
          </div>
        </div>


      </div>

    );
  }

}

export default CanvasAdamar;



//    this.color = document.getElementById('color');
//    this.canvas.addEventListener('mousemove', this.pick.bind(this));
// pick (event) {
//   this.x = event.layerX;
//   this.y = event.layerY;
//   this.pixel = this.ctx.getImageData(this.x, this.y, 1, 1);
//   this.data = this.pixel.data;
//   this.rgba = 'rgba(' + this.data[0] + ', ' + this.data[1] +
//              ', ' + this.data[2] + ', ' + (this.data[3] / 255) + ')';
//   this.color.style.background =  this.rgba;
//   this.color.textContent = this.rgba;
// }
//        <div id="color"></div>
