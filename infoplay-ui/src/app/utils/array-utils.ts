export function minimumArray<ArrayType>(array: ArrayType[], min: number): ArrayType[] {
    if (array.length >= min) {
        return array
    }
    else if (array.length == 0) {
        throw new Error("array size is 0")
    }
    const newArray = new Array<ArrayType>()
    let currentIndex = 0
    for (let i = 0; i < min; i++) {
        newArray.push(array[currentIndex])
        currentIndex++
        if (currentIndex > array.length - 1) {
            currentIndex = 0
        }
    }
    return newArray
}