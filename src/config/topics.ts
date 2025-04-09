// src/config/topics.ts
export default {
    // Grammar topics
    grammar: {
        heading: 'Темы по грамматике',
        buttons: [
            {
                id: 'nouns',
                label: 'Существительные',
                type: 'navigation',
                target: 'nouns'
            },
            {
                id: 'verbs',
                label: 'Глаголы',
                type: 'navigation',
                target: 'verbs'
            }
            // Add more grammar topics as needed
        ]
    },

    // Nouns topic
    nouns: {
        heading: 'Существительные',
        buttons: [
            {
                id: 'cases',
                label: 'Падежи',
                type: 'lesson',
                lessonId: 100,
                hasTests: true
            },
            // {
            //     id: 'declensions',
            //     label: 'Склонения',
            //     type: 'lesson',
            //     lessonId: 101,
            //     hasTests: false
            // }
            // Add more buttons as needed
        ]
    },

    // Verbs topic
    verbs: {
        heading: 'Глаголы',
        buttons: [
            {
                id: 'aspects',
                label: 'Виды глагола',
                type: 'lesson',
                lessonId: 200,
                hasTests: true
            }
            // Add more buttons as needed
        ]
    }

    // Add more topic configurations as needed
}