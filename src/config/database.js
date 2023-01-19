import mongoose from 'mongoose';

mongoose.set("strictQuery", false);

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI,(props)=>{
        console.log(`Database has been connected!`);
    });
}

export default connectDatabase