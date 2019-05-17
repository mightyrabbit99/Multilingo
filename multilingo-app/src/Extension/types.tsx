export type AnswerProps = {
    readonly info: {
        title: string;
        date: number;
        comment: Comment[];
        url: string;
    }
    stats: {
        correct: number;
        wrong: number;
        priority: number;
    }
    category: number;
    userCards: Card[];
    dictionaries: Dictionary[];
}

export type Answer = {
    props: AnswerProps;
    answer: string;
}

export type Card = {
    stats: {
        correct: number;
        wrong: number;
        priority: number;
    }
    content: string;
    answer: Answer;
}

export type Dictionary = {
    url: string;
    explanation: Object;
}