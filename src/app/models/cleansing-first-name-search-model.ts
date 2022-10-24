import { BaseSearchModel } from "./base-search-model";

export class CleansingFirstNameSearchModel extends BaseSearchModel {
    public firstName!: string;

    public similarityTypeId!: number;

    public cleansingFirstNameStatusId!: number;

    public cleansingFirstNameRowFilter!: number;
}
