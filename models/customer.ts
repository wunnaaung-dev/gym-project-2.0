import {Schema, model, models} from 'mongoose'

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    expireDate: {
        type: Date,
        required: true
    },
    bodyMeasurements: [
        {
            month: {type: String},
            weight: {type: Number},
            neck: {type: Number},
            chest: {type: Number},
            waist: {type: Number},
            arms: {
                left: {type: Number},
                right: {type: Number}
            },
            thight: {
                left: {type: Number},
                right: {type: Number}
            },
            calf: {
                left: {type: Number},
                right: {type: Number}
            },
        }
    ]
}, {timestamps: true})

const Customer = models.Customer || model("Customer", CustomerSchema)
export default Customer