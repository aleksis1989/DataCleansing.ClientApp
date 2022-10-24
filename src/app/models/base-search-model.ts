export class BaseSearchModel {
    public pageNumber!: number;
    public size!: number;
    public totalElements!: number;
    public totalPages!: number;
    public sortColumn!: string;
    public sortOrder!: string;
    public searchText!: string;

    constructor() {
        this.pageNumber = 0;
        this.size = 10;
        this.totalElements = 0;
        this.totalPages = 0;
        this.sortColumn = '';
        this.sortOrder = 'asc';
        this.searchText = '';
    }
}
