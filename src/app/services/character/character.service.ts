import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/settings/app.settings';
import { Character } from 'src/app/models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  findAllCharacters() {
    return this.http.get<Character>(AppSettings.APP_URL + "/characters/");
  }

  findAllUserCharacters(idUser: number) {
    return this.http.get<Character[]>(AppSettings.APP_URL + "/characters/all/" + idUser);
  }

  findCharacterBId(idCharacter: number) {
    return this.http.get<Character>(AppSettings.APP_URL + "/characters/" + idCharacter);
  }

  saveCharacter(character: Character) {
    return this.http.post<Character>(AppSettings.APP_URL + "/characters/", character);
  }

  deleteCharacter(idCharacter: number) {
    return this.http.delete<Character>(AppSettings.APP_URL + "characters/" + idCharacter);
  }

  shareCharacter(idCharacter: number, isShared: boolean) {
    return this.http.get<Character>(AppSettings.APP_URL + "/characters/share/" + idCharacter + "/" + isShared);
  }
}
