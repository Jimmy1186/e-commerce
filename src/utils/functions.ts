import { pImgType } from "../types/editor";









// export const convertBase64 = (file: Array<pImgType>) => {
//     return new Promise((resolve, reject) => {
//       let plm: object[] = [];
  
//       file.map((v, i) => {
//         let fileReader = new FileReader();
//         fileReader.readAsDataURL(v.img_path);
//         fileReader.onload = () => {
//           plm[i] = { img_path: fileReader.result,index_of:v.index_of};
//         };
//       });
//       resolve(plm);
//     });
//   };
  

export function htmlToElement(html: string) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}



 export const imgPayloadConvert = (event: React.ChangeEvent<HTMLInputElement>) => {
    return Object.entries(event.target.files || {}).map(([s, f]) => {
      return { img_path: f, index_of: Number(s) };
    });
  };