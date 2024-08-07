import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {uploadString, ref, getStorage, getDownloadURL, listAll } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos:any[] = [];

  constructor(private storage:AngularFireStorage) {
    this.getImages()
   }

  public async addPhoto(){

    const photo = await Camera.getPhoto({
      resultType:CameraResultType.DataUrl,
      source:CameraSource.Camera,
      quality:100
    });

    let imagePath='unit-3-photo'+Date.now();

    let image=await this.uploadImage(imagePath,photo.dataUrl)

    this.photos.push(image);
  }

  async uploadImage(path:string, data_url:any){
    const storage = getStorage();
    const storageRef = ref(storage, path);

    return uploadString(storageRef, data_url, 'data_url')
    .then(() => {
      return getDownloadURL(storageRef)
    })
  }

  async getImages(){
    const storage = getStorage();
    const storageRef = ref(storage, "");
    let images = await listAll(storageRef)
    for (let item of images.items){
      this.photos.push(await getDownloadURL(item))
    }
  }
}
