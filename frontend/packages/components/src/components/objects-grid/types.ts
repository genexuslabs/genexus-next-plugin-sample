import { ObjectType } from "../../components";

export type ObjectDescription = ObjectType & {
    description: string;
}

export type LoadObjectsCallback = (type:string) => Promise<ObjectDescription[]>;

export type OpenObjectCallback = (id:string) => Promise<void>;