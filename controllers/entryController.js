const { Router } = require("express")
const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")
const { EntryModel } = require("../models")


/*
Create Entry
/create
*/

router.post("/create", validateJWT, async (req, res) => {
    const { type, program, platform, medium, date, details } = req.body.entry
    const { id } = req.user
    const artEntry = {
        type,
        program,
        platform,
        medium,
        date,
        details,
        owner: id
    }
    try {
        const newEntry = await EntryModel.create(artEntry)
        res.status(200).json(newEntry)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
View all Entries
/
*/

router.get("/", async (req, res)=> {
    try {
        const allEntries = await EntryModel.findAll()
        res.status(200).json(allEntries)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
View entries by user
/myentries
*/

router.get("/myentries", validateJWT, async (req, res)=> {
    const {
        id
    } = req.user
    try {
        const userEntries = await EntryModel.findAll({
            where: {
                owner: id
            }
        })
        res.status(200).json(userEntries)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
View entries by type
/type
*/

router.get("/:type", async (req, res)=> { const { type } = req.params
    try {
        const typeResults = await EntryModel.findAll({
            where: {
                type: type
            }
        })
        res.status(200).json(typeResults)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
Updating Entries
/update/:entryId
*/

router.put("/update/:entryId", validateJWT, async (req, res) => {
    const { type, program, platform, medium, date, details } = req.body
    const entryId = req.params.entryId
    const userId = req.user.id

    console.log({ type, program, platform, medium, date, details, entryId, userId });
    const query = {
        where: {
            id: entryId,
            owner: userId
        }
    }

    const updatedEntry = {
        type: type,
        program: program,
        platform: platform,
        medium: medium,
        date: date,
        details: details
    }

        const update = await EntryModel.update(updatedEntry, query)
        res.status(200).json(update)
    
})

/*
Deleting Entries
/delete/:entryId
*/

router.delete("/delete/:entryId", validateJWT, async (req, res) => {
    const ownerId = req.user.id
    const entryId = req.params.entryId

    try {
        const query = {
            where: {
                id: entryId,
                owner: ownerId
            }
        }
console.log("test");
        await EntryModel.destroy(query)
        res.status(200).json({ message: "Entry Removed" })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


module.exports = router