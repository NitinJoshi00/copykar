const shareModel = require('../models/share.model.js')
const { generateShareCode } = require('../utils/generateShareCode.utils.js')


async function send(req, res) {
    try {
        const text = req.body.text;
        if (!text) {
            return res.status(400).json({
                message: "Text field is empty"
            });
        }

        const code = generateShareCode();



        const s = await shareModel.create({
            code,
            text
        })


        return res.status(201).json({
            code: code,
            message: "Successfull"
        })



    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error
        });
    }


}



async function receive(req, res) {
    try {
        const code = req.params.code.toUpperCase();
        if (!code || code.length < 6) {
            return res.status(400).json({
                message: "Invalid code"
            });
        }


        const item = await shareModel.findOne({ code });


        if (!item) {
            return res.status(400).json({
                message: "Invalid code!"
            });
        }

        const text = item.text;

        await shareModel.findOneAndDelete({ code });

        return res.status(200).json({
            message: "Successful",
            text
        })





    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error
        });
    }
}


module.exports = { send, receive };
