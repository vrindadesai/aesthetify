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
selectedImages: string | undefined
selected = false;

onButtonClick() {

  async function main(){
    const element = document.getElementById("output");
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an assistant designed to output a html formatted, numbered list of 25 songs based on user keywords with a short and creative playlist title.",
        },
        { role: "user", content: "summer, happy, beach, love, sad" },
      ],
      model: "gpt-3.5-turbo-0125",

    }).then((completion) => {
      if(element){
        element.innerHTML = completion.choices[0].message.content?? "";
      }

    }).catch(err => console.log(err));;

    
  }
  this.response =  main();
}



storeResponse(response: string | null){
  this.response = response as String
}

onSelectCard(keywords: string){
  this.selected = !this.selected;

  if(this.selectedImages){
    this.selectedImages.concat(", " + keywords);
  }
  else{
    this.selectedImages = keywords
  }


}
}




const openai = new OpenAI({apiKey: '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', dangerouslyAllowBrowser: true});






