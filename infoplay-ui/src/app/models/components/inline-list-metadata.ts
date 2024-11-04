import { DisplayConfiguration } from "./inline-list-configuration/display-configuration";
import { DynamicQueryConfiguration } from "./inline-list-configuration/dynamic-query";
import { LetterFilter } from "./inline-list-filters/letter-filter";
import { WheelSelectorItem } from "./wheel-selector-item";

export interface InlineListMetadata {
    items: WheelSelectorItem[]
    letterFiltering?: LetterFilter
    dynamicQuery?: DynamicQueryConfiguration
    displayConfiguration?: DisplayConfiguration
}