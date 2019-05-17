import { Answer } from "./types";

function generateAnswer(ans: string, title: string, url: string, category: number): Answer {
    let shit = {
        info: {
            title: title,
            date: Date.now(),
            comment: [],
            url: url
        },
        stats: {
            correct: 0,
            wrong: 0,
            priority: 1,
        },
        category: category,
        userCards: [],
        dictionaries: []
    }
    return {
        props: shit,
        answer: ans
    }
}