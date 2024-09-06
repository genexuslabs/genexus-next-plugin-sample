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

export type ContextMenuInfo = {
    id: string;
    clientX: number;
    clientY: number;
}

export type LoadObjectsCallback = (type:string) => Promise<ObjectDescription[]>;

export type OpenObjectCallback = (id:string) => Promise<void>;

export type ContextMenuCallback = (contextMenuInfo:ContextMenuInfo) => Promise<void>;