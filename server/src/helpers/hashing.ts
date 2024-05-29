import bcrypt from 'bcryptjs';

// promise that return hashed string (for example password)
export const HashString = async (password : string) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt) 
}

// promise that check string and existing hash and return its the same or not
export const VerifHashedString = async (str: string ,hash : string) =>{
    return await bcrypt.compare(str,hash);
}