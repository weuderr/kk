import { Injectable } from '@nestjs/common';

function renderStringToHtml(text: string) {
  return `<html>
    <head>
      <title>Kuantokusta</title>
    </head>
    <body>
      <h1>${text}</h1>
    </body>
    <style>
      body {
        background-color: #f5f5f5;
        color: #333;
        font-family: sans-serif;
        font-size: 16px;
        line-height: 1.5;
        margin: 0;
      }
      h1 {
        font-size: 48px;
        font-weight: 300;
        line-height: 1.1;
        margin-bottom: 0;
      }
    </style>
  </html>`;
}

@Injectable()
export class AppService {
  getHello(): string {
    return renderStringToHtml('Hello World! This is the Kuantokusta API.');
  }
}
