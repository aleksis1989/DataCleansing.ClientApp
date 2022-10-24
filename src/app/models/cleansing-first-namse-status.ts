export enum CleansingFirstNamseStatus {
    // Не процесирани
    NonProcessed = 0,

    // Прифатено
    AcceptSuggestion = 1,

    // Прифатено Similarity
    AcceptSimilarity = 2,

    // Прифатено Permutation
    AcceptPermutation = 3,

    // Рачна корекција
    ManualCorrection = 4,

    // Одбиено прочистување
    Rejected = 5,

    // Процесирани
    Accepted = 6
}
