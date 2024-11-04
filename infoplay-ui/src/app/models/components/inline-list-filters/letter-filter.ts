import { Observable } from "rxjs";
import { WheelSelectorItem } from "../wheel-selector-item";

export interface LetterFilter {
    letterSelectedCallback: (letter: string) => Observable<WheelSelectorItem[]>
}
