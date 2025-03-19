import { Schema,model } from "mongoose";
 
const groupSchema = new Schema({
    name:{type:String,required:true},
    
  });
export const Group=model("Group",groupSchema)