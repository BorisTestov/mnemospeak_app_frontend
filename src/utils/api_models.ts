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