import { Component, OnInit } from '@angular/core';
import OpenAI from "openai";
import {images} from '../images';

@Component({
  selector: 'app-open-ai',
  templateUrl: './open-ai.component.html',
  styleUrls: ['./open-ai.component.css']
})


export class OpenAiComponent {
response: any | undefined;
images = images;
selectedImages: string  = ""
loading = false;

onButtonClick() {
  this.loading=true;


  async function main(keywords: string){
    let tags = (localStorage.getItem("tags") || "").toString();
    keywords = keywords.concat(", " + tags);
    console.log(keywords);
    localStorage.clear();
    const element = document.getElementById("output");
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an assistant designed to output a html formatted, numbered list of 25 songs based on user keywords with a short and creative playlist title.",
        },
        { role: "user", content: keywords },
      ],
      model: "gpt-3.5-turbo-0125",

    }).then((completion) => {
      if(element){
        element.innerHTML = completion.choices[0].message.content?? "";
      }

    }).catch(err => console.log(err));;

    
  }
  this.response =  main(this.selectedImages?? "");
  setTimeout(() => {
    this.loading = false;
  }, 6000);
}



storeResponse(response: string | null){
  this.response = response as String
}

onSelectCard(keywords: string, id: number){
  this.images[id-1].selected= !this.images[id-1].selected;

  if(this.selectedImages){
    this.selectedImages = this.selectedImages.concat(", ", keywords);
  }
  else{
    this.selectedImages = keywords;

  }


}
onReset(){
  this.selectedImages = "";
  const element = document.getElementById("output");

  this.images.forEach((image) => {
    image.selected = false;
  })

  if(element){
    element.innerHTML = "";
  }
}

}




const openai = new OpenAI({apiKey: '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', dangerouslyAllowBrowser: true});






