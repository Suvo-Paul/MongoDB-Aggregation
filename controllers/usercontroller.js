"use strict"

const mongoose = require("mongoose")

const userCollection = require("../model/userModel")

const findActiveUser = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $match: {
                    isActive: true
                }
            },
            {
                $count: "Active User"
            }
        ])

        return res.status(200).send({
            success: true,
            message: "Get data successfully",
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

const avarageAge = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $group: {
                    _id: "$gender",
                    avarageAge: {
                        $avg: "$age"
                    }
                }
            }
        ])

        return res.status(200).send({
            success: true,
            message: "Get data successfully",
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


// Top 5 favourite fruit and count
const fruitCount = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $group: {
                    _id: "$favoriteFruit",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 2
            }
        ])

        return res.status(200).send({
            success: true,
            message: "Get data successfully",
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

const genderCount = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $group: {
                    _id: "$gender",
                    genderCount: {
                        $sum: 1
                    }
                }
            }
        ])

        return res.status(200).send({
            success: true,
            message: "Gender counted",
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

// Top country count 

const countryCountTop = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $group: {
                    _id: "$company.location.country",
                    countryCountTop: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    countryCountTop: -1
                }
            },
            {
                $limit: 1
            }
        ])

        return res.status(200).send({
            success: true,
            message: "Top country counted",
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

const eyeColor = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $group: {
                    _id: "$eyeColor",
                    eyeColorCount: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    eyeColorCount: -1
                }
            }
        ])

        return res.status(200).send({
            success: true,
            message: "Eye color count",
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

// what is the average number of tags per user solve = 1

const averageOfTagNumber = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $unwind: "$tags"
            },
            {
                $group: {
                    _id: "$_id",
                    numberOfTags: {
                        $sum: 1
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    averageNumberOfTags: {
                        $avg: "$numberOfTags"
                    }
                }
            }
        ])

        return res.status(200).send({
            success: true,
            message: "Average of tags",
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

// what is the average number of tags per user solve = 2

const averageOfTagNumber2 = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $addFields: {
                    numberOfTags: {
                        $size: {
                            $ifNull: ["$tags", []]
                        }
                    }
                }
            },
            {
                $group : {
                    _id: null,
                    averageNumberOfTags : {
                        $avg : "$numberOfTags"
                    }
                }
            }
        ])

        return res.status(200).send({
            success: true,
            message: "Average of tags",
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

module.exports = {
    findActiveUser, avarageAge, fruitCount, genderCount,
    countryCountTop, eyeColor, averageOfTagNumber, averageOfTagNumber2
}