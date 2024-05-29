import * as redis from 'redis'

const redisClient = redis.createClient({
    url : 
        process.env.NODE_ENV === 'production'
            ? 
                `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`
            :
                undefined
})

console.log({
    host : process.env.REDIS_HOST,
    port : process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined

})
redisClient.connect()
    .then(()=>console.log('redis is ready'))
    .catch(()=>console.log('connection to redis failed'))

// Handle errors
redisClient.on('error', err => {
    console.error('Redis error:', err);
});

const RedisSetItem = async(key:string, value : string, expire?: number) =>{
    return expire
        ?
        await redisClient.setEx(key,expire,value)
        :
        await redisClient.set(key,value)
}

const RedisGetItem = async(key : string)=>{
    const data = await redisClient.get(key)
        .then(res=>{
            return res
        })
        .catch(err=>{
            console.log(err)
            return null
        })
    return data
        
}

export {
    RedisGetItem,
    RedisSetItem,
    redisClient
}