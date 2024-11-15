import { getDynamicImageUrl } from "./image-utils"

describe("image-utils", () => {
    it("should get image url dynamically", () => {
        expect(getDynamicImageUrl({ id: 1, name: 'test', image: 'fakeImageUrl.png' })).toEqual("/static/fakeImageUrl.png")
    })
})