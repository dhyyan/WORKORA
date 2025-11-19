export interface BaseClientOutputDtos {
    _id?: string,
    name: string,
    email: string,
    phone?: string,
    role: 'client'
    profileImage?: string,
    googleId?: string,
    isBlocked?: boolean,
    isSubscribed?: boolean,
    createdAt?: Date;
}

//login
export interface ClientLoginInputdDto {
    email: string
    password: string
}

export interface ClientLoginOutputdDto {
    createdUser: BaseClientOutputDtos,
    accessToken: string,
    refreshToken: string
}




//signUp

export interface ClientRegisterInputDto {
    email: string,
    name: string,
    password: string,
    phone: string
}

export interface ClientRegisteroutputDto extends BaseClientOutputDtos {
    _id: string
}


//ForgotPassword

export interface ForgotPasswordInputDto {
    email: string
}

export interface ForgotpasswordOutPutDto {
    success: boolean;
    message: string;
}