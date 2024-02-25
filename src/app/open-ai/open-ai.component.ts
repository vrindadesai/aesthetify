import { Component } from '@angular/core';
import OpenAI from "openai";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-open-ai',
  templateUrl: './open-ai.component.html',
  styleUrls: ['./open-ai.component.css']
})
export class OpenAiComponent {

}

const openai = new OpenAI({apiKey: environment.OPENAI_API_KEY, dangerouslyAllowBrowser: true});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [

      { role: "user", content: "Who won the world series in 2020?" }
    ],
    model: "gpt-4",
    stream: true

  });
  for await (const chunk of completion) {
    console.log(chunk.choices[0]?.delta?.content || "");
}

}

main();



