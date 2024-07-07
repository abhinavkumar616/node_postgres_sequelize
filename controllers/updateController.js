const userModel = require("../models/userModel")

const updateController = async (req, res) => {

    try {
        const { id } = req.params
        const { name, age } = req.body
        if (!name || !age) {
            return res.status(400).send({
                message: "Please provide the user necessary details"
            });
        }
        const existingCustomer = await userModel.findByPk(id)
        if (!existingCustomer) {
            return res.status(404).json({ message: "Id not found" });
        }
        console.log("existingCustomer", existingCustomer);

        let [rowsUpdated, updateUser] = await userModel.update(
            { name, age }, { where: { id } }
        )

        // Check if any rows were updated
        if (rowsUpdated === 0) {
            return res.status(404).json({ message: "User with provided ID not found or no updates were made." });
        }

        let findLatestData = await userModel.findByPk(id)

        return res.status(200).json({
            message: "User updated successfully.",
            data: findLatestData
        });
    }
    catch (error) {
        console.error("Error in updateController:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = updateController