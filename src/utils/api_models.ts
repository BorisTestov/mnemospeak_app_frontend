interface Question {
    id: number
    text: string
    options: Array<{
        id: number
        text: string
        is_correct: boolean
    }>
    total: number
    answered: number
}

interface Word {
    id: number,
    word: string,
    image: string,
    part_of_speech: string,
    translation: string,
    category: string,
}