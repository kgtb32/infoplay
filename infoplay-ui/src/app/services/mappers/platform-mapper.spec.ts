import { Platform } from "../../models/api/platform"
import { mapPlatformToWheelSelector } from "./platform-mapper"

describe("platform-mapper", () => {
    it("should map platform to wheel selector item", () => {
        const platform: Platform = {
            name: "atari2600",
            displayName: "Atari 2600",
            imagePath: "atari2600.svg",
            description: {
                description: "Atari 2600 is a home video game console released in 1977.",
                publisher: "atari",
                releaseDate: "1977"
            }
        }
        const result = mapPlatformToWheelSelector(platform, 42)
        expect(result.id).toBe(42)
        expect(result.name).toBe(platform.displayName)
        expect(result.description?.company).toEqual(platform.description.publisher)
        expect(result.description?.description).toEqual(platform.description.description)
        expect(result.description?.releaseDate).toEqual(platform.description.releaseDate)
    })
})