import { Observable } from "rxjs";
import { WheelSelectorItem } from "../wheel-selector-item";

export interface DynamicQueryConfiguration {
    dynamicQueryCallback: (offset: number, length: number) => Observable<WheelSelectorItem[]>
}