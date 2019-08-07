import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  getLanguages() {
    return [
      { lang: 'inglês', id: '1' },
      { lang: 'espanhol', id: '2' },
      { lang: 'português', id: '3' }
    ]
  }
  
  getInitialsById(id): string {
    switch (id) {
      case "1":
        return "en"

      case "2":
        return "es"

      case "3":
        return "pt"
    }
  }

  getLanguageById(id): string {
    switch (id) {
      case "1":
        return "en"

      case "2":
        return "es"

      case "3":
        return "pt"
    }
  }
}
