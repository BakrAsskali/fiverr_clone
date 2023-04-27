import gigModel from "../models/gigModel.js";
import Gig from "../models/gigModel.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) =>  {
    if(!res.isFreelancer) 
        return next(createError(403, "Only freelancers can create a gig!"));

    const newGig = new Gig({
            userId: req.userId,
            ...req.body,
    });

    try{
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    }catch(err){
        next(err)
    }
};
export const deleteGig = async (req, res, next) =>  {
    try{
        const gig = await Gig.findById(req.params.id);

        if(gig.userId !== req.userId) 
            return next(createError(403, "You can delete only your gig!"));

        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send("Gig has been deleted!");
    }catch(err){
        next(err);
    }
};
export const getGig = async (req, res, next) =>  {
    try{
        const Gig = await Gig.findById(req.params.id);
        if(!Gig) next(createError(404, "Gig not found:"))
        res.status(200).send(Gig);
    }catch(err){
        next(err);
    }
};
export const getGigs = async (req, res, next) =>  {
    try{
        const gigs = await Gig.find()
        res.status(200).send(gigs);
    }catch(err){
        next(err);
    }
};