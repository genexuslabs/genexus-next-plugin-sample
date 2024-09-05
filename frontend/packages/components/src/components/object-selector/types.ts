export type ObjectDescription = {
    id: string;
    name: string;
    description: string;
    typeId: string;
}

export type LoadObjectsCallback = (type:string) => Promise<ObjectDescription[]>;

export type OpenObjectCallback = (id:string) => Promise<void>;