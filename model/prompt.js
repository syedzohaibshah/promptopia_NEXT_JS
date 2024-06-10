import { Schema, model, models } from "mongoose";

 const PromptSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref:'User',
    },
    prompt:{

        type:String,
        required:[true, 'Prompt is required'],
    },

    tag:{
        type:String,
        required:[true,'Tag is required'],
    },
 });
//  console.log(models); // Should not be undefined
//  console.log(models.Prompt); // Should not be undefined if the model is correctly defined
 
 const Prompt =models.Prompt || model('Prompt',PromptSchema);

 export default Prompt;