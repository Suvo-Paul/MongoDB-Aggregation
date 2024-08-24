"use strict"

const bookCollection = require("../model/bookModel")

const authorDetails = async (req, res) => {
    try {
        const response = await bookCollection.aggregate([
            {
                $lookup: {
                    from: "authors",
                    localField: "author_id",
                    foreignField: "_id",
                    as: "author_details"
                }
            },
            {
                $addFields: {
                    authorDetails: {
                        $arrayElemAt: ["$author_details", 0]
                    }
                }
            }
        ])

        return res.status(200).send({
            success: true,
            data: response
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            data: error.message
        })
    }
}

module.exports = {authorDetails}