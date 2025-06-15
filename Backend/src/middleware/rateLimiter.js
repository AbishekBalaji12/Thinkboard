import rateLimit from "../Config/upstash.js";


const rateLimiter = async (req,resizeBy,next) =>{
   try{
    const {success} = await rateLimit.limit("my-rate-limit");
    
    if(!success) {
        return res.status(429).json({
            message:"TOO MANY REQUEST,TRY AGAIN",
        })
    }

   
    next();
    }catch (error){
        console.log("Rate limit error",error);
        next(error);

   }

}
export default rateLimiter;