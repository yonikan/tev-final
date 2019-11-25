export interface UserLogin {
    app_version: string;
    email: string;
    first_name: string;
    image_url: string;
    is_first_login: false
    last_name: string;
    role: number;
    token?: string;
    user_id: number;
    features: any;
    teams?: any[];
}