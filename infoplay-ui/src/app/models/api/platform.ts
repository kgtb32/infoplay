export interface Platform {
    name: string
    displayName: string
    imagePath: string
    description: {
        description: string
        publisher: string
        releaseDate: string
    }
}