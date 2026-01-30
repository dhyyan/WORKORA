


export interface BaseJobOutPutDtos{
    _id?:string,
    clientId?:string,
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

export interface JobViewInputDtos{
    id:string
}

export interface JobViewOutputDtos{
    job:BaseJobOutPutDtos
}

export interface JobUpdateInputDtos{
  
    _id:string,
    clientId:string,
    title:string,
    summary:string,
    features:string[],
    category:string,
    duration:string,
    deadline:string,
    price:number,
    status:"open" 
}

export interface JobUpdateOutputDtos{
     jobs:BaseJobOutPutDtos
}

export interface JobDeleteInputDtos{
    id:string
}

export interface JobDeleteOutputDtos{
    success:boolean
}