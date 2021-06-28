import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

export function queryDebugElem(debugElem: DebugElement, selector: string): DebugElement {
  return debugElem.query(By.css(selector));
}

export function queryAllDebugElem(debugElem: DebugElement, selector: string): DebugElement[] {
  return debugElem.queryAll(By.css(selector));
}
