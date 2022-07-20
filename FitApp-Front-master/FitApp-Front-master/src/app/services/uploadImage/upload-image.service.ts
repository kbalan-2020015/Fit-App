import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor( private UserRestService: UserRestService) { }


  requestFiles(
    userId: string,
    files: Array<File>,
    name: string
  ){
    return new Promise((resolve, reject)=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseUrl + 'user/uploadImage/'+ userId;
      console.log(files)

      //for(var x = 0; x < files.length; x++){
        formData.append('image', files[0], files[0].name);
      //}
      console.log(files[0])


      xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){ 
          if(xhr.status == 200){
            resolve(xhr.response);
          }else{
            reject(xhr.response);
          }   
        }
      }

      xhr.open('POST', uri, true);
      xhr.setRequestHeader('Authorization', this.UserRestService.getToken());
      xhr.send(formData)
    })
  }

}