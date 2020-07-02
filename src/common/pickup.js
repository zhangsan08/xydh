export const getUrl = function(url){
  let matcht = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i;
  let result = matcht.exec(url);
  if(result && result[1] && result[2]){
    return result[1] + result[2] + '/favicon.ico'
  }
  return null
}

