import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { Bottls } from '../../providers/bottls';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
      public navCtrl: NavController,
      private geolocation: Geolocation, 
      private alertController: AlertController,
      private bottls:Bottls
    ) {
    
  }

  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    })
 
  }

  addMarker(bottl) {
    this.geolocation.getCurrentPosition().then((position) => {
      bottl.position = position;
      //todo: add push to bottls here
      this.bottls.sendBottl(bottl);
      this.addMarkerAtPosition(bottl);
    }, (err) => {
      console.log(err);
    })
  }

  addMarkerAtPosition(bottl) {
      let marker = new google.maps.Marker({
        map: this.map,
        icon: 'assets/img/Bottl.pdf',
        animation: google.maps.Animation.DROP,
        position: {
          lat: bottl.position.coords.latitude,
          lng: bottl.position.coords.longitude
        }
      });

      let infoWindow = new google.maps.InfoWindow({
        content: "<h4>" + bottl.message + "</h4>" + 
      "<i>-" + bottl.author + "</i>"
      });

      google.maps.event.addListener(marker,'click', () => {
        infoWindow.open(this.map,marker);
      })
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker,'click', () => {
      infoWindow.open(this.map,marker);
    })
  }

  showPrompt(){
      let prompt = this.alertController.create({
      title: 'Add Bott',
      message: "Message:", 
      inputs: [
        {
          name: 'message',
          placeholder: 'Type message ...'
        },{
          name: 'author',
          placeholder: 'your name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.addMarker(data);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
