export interface resetPassword{
    email: string
    seed: string
    password:string
    confirmPassword :string
}
export interface changePassword{
    newPassword: string
    oldPassword:string
    confirmPassword :string
}