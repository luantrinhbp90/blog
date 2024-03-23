export interface BaseRepositoryInterface {

    getObjects(): Promise<Array<Object>>;

    createObject(payload: Object): Promise<Object>;

    getObject(id: number): Promise<Object | null>;

    editObject(id: number, payload: Object): Promise<Object | null>;

    deleteObject(id: number): Promise<boolean>;

}