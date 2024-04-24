//login interface data type
export interface LoginForm {
    username: string,
    password: string
}

// login interface return type

export interface LoginResponseData {
    code: number
    data: string
    message:string
    ok:boolean
}

interface UserInfo {
    userID: string,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string

}
interface user {
    checkUser: UserInfo

}
//定义服务器返回用户信息相关的数据类型
export interface UserResponseData {
    code: number
    data: user
}

