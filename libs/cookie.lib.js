import * as jose from 'jose';

export function setCookie(cookieName, cookieValue, hours) {
  let date = new Date();
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
  document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
}
  
export function getCookie(name) {
  let cookieName = name + "=";
  let cookieArray = document.cookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) == 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

export function removeCookie(cookieName) {
  let date = new Date(null)
  date.setTime(date.getTime())
  document.cookie = cookieName + " = " + "''" + "; expires = " + date.toGMTString();
}

export async function validateToken(token) {
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
  if(token){
    const {payload} = await jose.jwtVerify(token, secret);
    if (payload) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}