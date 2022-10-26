export class CleansingFirstNameViewModel {
    public id!: number;

    public personId!: number;

    public firstName!: string;

    public levenshtein!: number;

    public levenshteinFirstName!: string;

    public jaccard!: number;

    public jaccardFirstName!: string;

    public jaroWinkler!: number;

    public jaroWinklerFirstName!: string;

    public longestCommonSubsequence!: number;

    public longestCommonSubsequenceFirstName!: string;

    public similarityTypeId?: number;

    public similarityTypeName!: string;

    public similarityFirstNameId?: number;

    public similarityFirstName!: string;

    public similarityFirstNameCleansingResult!: string;

    public cleansingFirstNameStatusId?: number;

    public manualFirstName!: string;

    public manualFirstNameId?: number;
}
