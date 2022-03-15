import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { YoutubeResponse } from '../models/youtube.models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeurl = 'https://youtube.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyB8DS_FGmFnePUxuwppvDz1L82VjJM2YAI  ';
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';


  constructor( private http:HttpClient
  ) { }

  getVideos(){

    const url = `${this.youtubeurl}/playlistItems`
    const params = new HttpParams()
    .set('part','snippet')
    .set('maxResults','10')
    .set('playlistId', this.playlist)
    .set('key', this.apikey)
    .set('pageToken', this.nextPageToken)


   return this.http.get<YoutubeResponse>(url,{params})
   .pipe(
     map(resp=>{
       this.nextPageToken=resp.nextPageToken;
       return resp.items;
     }),
     map(
       items=> items.map(video=>video.snippet)
     )
   )
  }
}


//APIKEY
// AIzaSyCVfa_SwNromQYjtINtrckW__qCRmZNY-I

//UPLOADS
// UUuaPTYj15JSkETGnEseaFFg