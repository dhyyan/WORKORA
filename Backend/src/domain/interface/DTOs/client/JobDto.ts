


export interface BaseJobOutPutDtos{
    clientId:string,
    title:string,
    summary:string,
    features?:string[],
    category?:string,
    duration:string,
    deadline:string,
    price?:number,
    status?:"open" | "assigned" | "closed",
    createAt?:Date
}


export interface JobCreateInputDtos{
    clientId:string,
    title:string,
    summary:string,
    features:string[],
    category:string,
    duration:string,
    deadline:string,
    price:number,
    status:"open" | "assigned" | "closed",
    createAt:Date
}

export interface JobCreateOutPutDtos{
    job:BaseJobOutPutDtos,
    success:Boolean
}

export interface JobListInputDtos{
    id:string
}

export interface JobListOutPutDtos{
   jobs:BaseJobOutPutDtos[]
}