export const chars = (count:number, character:string=' ') : string => {
  let ret = '';
  const len = character.length;
  for (let i=0; i<count; i++) {
    ret += character.charAt(i%len);
  }
  return ret;
};

export const padLeft = (str:string, size:number, character:string=' ') : string => {
  const padding = chars(size - str.length, character);
  return `${padding}${str}`;
};

export const padCenter = (str:string, size:number, character:string=' ') : string => {
  const padLeft = chars(Math.floor((size - str.length) / 2), character);
  const padRight = chars(Math.ceil((size - str.length) / 2), character);
  return `${padLeft}${str}${padRight}`;
};

export const padRight = (str:string, size:number, character:string=' ') : string => {
  const padding = chars(size - str.length, character);
  return `${str}${padding}`;
};
