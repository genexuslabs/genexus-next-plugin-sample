type SVEntity = {
    id: string;
    name: string;
}

export type ObjectType = SVEntity & {    
    icon?: string;
  };

export type ObjectDescription = SVEntity & {
    description: string;
    typeId: string;
}

export type LoadObjectsCallback = (type:string) => Promise<ObjectDescription[]>;

export type OpenObjectCallback = (id:string) => Promise<void>;