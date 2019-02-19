import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character/character.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../resources/bootstrap/css/bootstrap.min.css','../../resources/fontawesome/css/all.min.css', './home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  animeCharacters: Character[];
  errorMessage: string;
  successMessage: string;

  constructor(private charachterService: CharacterService, private router: Router) {
    this.checkUser();
   }

  ngOnInit() {
    this.findAllCharacters();
  }
  
  findAllCharacters() {
    this.charachterService.findAllUserCharacters(this.user.idUser)
      .pipe()
      .subscribe(data => {
        console.log(data);
        this.animeCharacters = data;
      }, error => {
        console.log(error);
      });
  }

  shareCharacter(idCharacter: number, shared: boolean) {
    if (idCharacter === undefined) {
      this.displayMessage("An error has occured while sharing the character", 2);
    }
    this.charachterService.shareCharacter(idCharacter, shared)
      .pipe()
      .subscribe(data => {
        this.displayMessage("Character was succefully updated", 1);
        this.findAllCharacters();
      });
  }

  filter(keyWord: string) {
    if (keyWord === undefined || keyWord.length === 0) {
      this.findAllCharacters();
      return;
    }
    this.animeCharacters = this.animeCharacters.filter(character => 
      character.category.toLowerCase().includes(keyWord) || character.legend.toLowerCase().includes(keyWord) || 
      character.characterName.toLowerCase().includes(keyWord) 
    );
  }

  removeCharacter(idCharacter: number) {
    if(idCharacter === undefined) {
      this.displayMessage("An error has occured while removing the character", 2);
      return;
    }
    if (confirm("Do you really want to delete this character?")) {
      this.charachterService.deleteCharacter(idCharacter)
        .pipe()
        .subscribe(data => {
          this.findAllCharacters();
          this.displayMessage("Character succfully removed", 1);
        });
    }
  }

  displayMessage(msg: string, type: number) {
    if (type === 1) {
      this.successMessage = msg;
      setTimeout(()=> {this.successMessage = ""}, 5000);
    } else if (type === 2) {
      this.errorMessage = msg;
      setTimeout(()=> {this.errorMessage = ""}, 5000);
    }
  }

  checkUser() {
    if (localStorage.getItem('currentUser') === undefined || localStorage.getItem('currentUser') === null) {
      console.log("user is invalid, redirection");
      this.router.navigate(['/login']);
      return;
    }
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

}
