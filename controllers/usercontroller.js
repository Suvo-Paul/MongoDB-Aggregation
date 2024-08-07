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

// How many user have "enim", as one of their tags

const countEnimTagUsers = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $match: {
                    tags: "enim"
                }
            },
            {
                $count: "userWithEnim"
            }
        ])

        return res.status(200).send({
            success: true,
            message: "Enim tag user counted",
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

// What are the names and age of users who have inactive and have "velit" as a tag

const findInactiveUser = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $match: {
                    isActive: false,
                    tags: "velit"
                }
            },
            {
                $project: {
                    name: 1,
                    age: 1
                }
            }
        ])

        return res.status(200).send({
            success: true,
            message: "Successfull",
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

// How many users have a phone number starting with "+1 (940)"

const specialPhoneNumber = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $match: {
                    "company.phone": /^\+1 \(940\)/
                }
            },
            {
                $count: "specialPhoneNumber"
            }
        ])

        return res.status(200).send({
            success: true,
            message: "Special phone number counted",
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

// Who has registered most recently 

const recentRegistered = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $sort: {
                    registered: -1
                }
            },
            {
                $limit: 1
            },
            {
                $project: {
                    name: 1,
                    registered: 1
                }
            }
        ])

        return res.status(200).send({
            success: true,
            message: `Registered recently`,
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

// categorize user by their favourite fruit

const categorizeUser = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $group: {
                    _id: "$favoriteFruit",
                    users: {
                        $push: "$name"
                    }
                }
            }
        ])

        return res.status(200).send({
            success: true,
            message: `Registered recently`,
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

// How many user have 'ad' as the second tag in their list of tags

const secondTagAd = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $match: {
                    "tags.1": "ad"
                }
            },
            {
                $count: "secondTagAd"
            }
        ])

        return res.status(200).send({
            success: true,
            message: `Find successfully`,
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

// Find users who have both 'enim' and 'id' as their tags.

const findUserWithEnimId = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $match: {
                    tags: {
                        $all: [
                            "enim",
                            "id"
                        ]
                    }
                }
            }
        ])

        return res.status(200).send({
            success: true,
            message: `Find successfully`,
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

// List all companies located in the USA with their corresponding user count.

const usaLocatedCompany = async (req, res) => {
    try {
        const response = await userCollection.aggregate([
            {
                $match: {
                    "company.location.country": "USA"
                }
            },
            {
                $group: {
                    _id: "$company.title",
                    userCount: {
                        $sum: 1
                    }
                }
            }
        ])

        return res.status(200).send({
            success: true,
            message: `Find successfully`,
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
    countryCountTop, eyeColor, averageOfTagNumber, averageOfTagNumber2,
    countEnimTagUsers, findInactiveUser, specialPhoneNumber,
    recentRegistered, categorizeUser, secondTagAd, findUserWithEnimId,
    usaLocatedCompany
}