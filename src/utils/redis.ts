import redisClient from "@/config/connectRedis";

export class RedisServices {
    private client = redisClient;
    constructor() {
    }
    public setKeyValue = (key: string, value: string | string[], expiredTime: number) => {
        this.client.setEx(key, expiredTime, JSON.stringify(value))
    }
    public getKeyValue = async (key: string) => {
        const data = await this.client.get(`${key}`)
        return JSON.parse(`${data}`)
    }
    public isExistKey = async (key: string) => {
        return await this.client.exists(key)
    }
    public deleteKey = (key :any) => {
        let key_string = key.toString()
        return this.client.del(key)
    }
}