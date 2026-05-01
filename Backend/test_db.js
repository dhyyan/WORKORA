const mongoose = require('mongoose');
const { Types } = mongoose;

mongoose.connect('mongodb://localhost:27017/workora')
.then(async () => {
    const jobSchema = new mongoose.Schema({}, { strict: false, collection: 'jobs' });
    const Job = mongoose.model('Job', jobSchema);
    
    const contractSchema = new mongoose.Schema({}, { strict: false, collection: 'contracts' });
    const Contract = mongoose.model('Contract', contractSchema);

    const job = await Job.findById('69eb1a8b75c58ab69ce66d9d');
    console.log("JOB:", job);

    const contract = await Contract.findOne({ jobId: new Types.ObjectId('69eb1a8b75c58ab69ce66d9d') });
    console.log("CONTRACT:", contract);
    
    process.exit(0);
}).catch(console.error);
