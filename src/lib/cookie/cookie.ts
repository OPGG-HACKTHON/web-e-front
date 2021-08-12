import cookies from 'js-cookie';

class Cookie {
  public static getCookie(key: string): any {
    return cookies.get(key);
  }

  public static setCookie(
    key: string,
    value: any,
    expires: number | Date = 7
  ): void {
    cookies.set(key, value, { expires });
  }

  public static removeCookie(key: string): void {
    cookies.remove(key);
  }
}

export default Cookie;
