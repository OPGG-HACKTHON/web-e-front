import Cookie from 'lib/cookie';

class Token {
  private static FIRE_DAY = 9 * 60 * 60 * 60 * 1000;

  public static setToken(tokenKey: string, token: string): void {
    const date = new Date();
    date.setTime(date.getTime() + this.FIRE_DAY);
    Cookie.setCookie(tokenKey, token, date);
  }

  public static getToken(tokenKey: string): string {
    return Cookie.getCookie(tokenKey) as string;
  }

  public static removeToken(tokenKey: string) {
    return Cookie.removeCookie(tokenKey);
  }
}

export default Token;
