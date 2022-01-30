export function DateFromDDMMYYYY(strDate: any): Date {
  //strDate dans ce cas sera une sting lors du runtime, meme si compilation = Date
  if(!strDate) {
    return new Date();
  }
  let splitted = strDate.split('/');
  if(splitted.length != 3) {
    return new Date();
  }
  return new Date(Number(splitted[2]), Number(splitted[1]) - 1, Number(splitted[0]));
}
