import { History, createBrowserHistory } from 'history';
import isNullOrUndefined from 'util/isNullOrUndefined';

class HistorySingleton {
  private static instance: History;

  public static getInstance(): History {
    if (isNullOrUndefined(this.instance)) {
      this.instance = createBrowserHistory();
    }

    return this.instance;
  }
}

export const historySingleton: History = HistorySingleton.getInstance();
