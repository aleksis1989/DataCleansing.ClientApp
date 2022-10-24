import { BaseSearchModel } from './base-search-model';

export class SearchResult<T> {
    public data: Array<T> | undefined;
    public page: BaseSearchModel | undefined;
}
