import { BaseRepository } from "../BaseRepo/baseRepository";
import { jobModel } from "../../../frameWork/database/models/job.model";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { Job } from "../../../domain/entities/job.entity";
import { Types } from "mongoose";

export class JobRepository extends BaseRepository<Job> implements IJobRepository {
    constructor() {
        super(jobModel)
    }

    async findByIdAndUpdate(id: Types.ObjectId, job: Partial<Job>): Promise<Job | null> {
        return await jobModel.findByIdAndUpdate(id, job, { new: true })
    }

    async listJob(status: string, category: string[], skills: string[], priceRange: number[], page: number, limit: number, search?: string) {
        const query: any = {};

        if (status) {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { summary: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }

        
        if (category && category.length > 0) {
            query.category = { $in: category };
        }

        if (skills && skills.length > 0) {
            query.features = { $in: skills };
        }

        if (priceRange && priceRange.length === 2) {
            const minimumPrice = priceRange[0];
            const maximumPrice = priceRange[1];

            query.price = {};

            if (minimumPrice !== undefined && isNaN(minimumPrice) === false) {
                query.price.$gte = minimumPrice;
            }

            if (maximumPrice !== undefined && isNaN(maximumPrice) === false) {
                query.price.$lte = maximumPrice;
            }

            if (Object.keys(query.price).length === 0) {
                delete query.price;
            }
        }

        console.log("Here is the final query we are sending to the database:", JSON.stringify(query, null, 2));

        const skipAmount = (page - 1) * limit;

        console.log("Page Number:", page);
        console.log("Items per page (Limit):", limit);
        console.log("Skipping this many items:", skipAmount);

        const [jobs, totalJobs] = await Promise.all([
            jobModel.find(query).skip(skipAmount).limit(limit),
            jobModel.countDocuments(query)
        ]);

        return { jobs, totalJobs };
    }

        async findClientJobsPaginated(clientId: Types.ObjectId, page: number, limit: number): Promise<{ jobs: Job[], totalJobs: number }> {
            const query = { clientId };
            const skipAmount = (page - 1) * limit;

            const [jobs, totalJobs] = await Promise.all([
                jobModel.find(query).sort({ createdAt: -1 }).skip(skipAmount).limit(limit),
                jobModel.countDocuments(query)
            ]);

            return { jobs, totalJobs };
        }

}