const mongoose = require("mongoose");
const Account = require("./userAccount");

const userSchema = new mongoose.Schema(
	{
		confirmed: Boolean,
		email: String,
		password: String,
		firstName: String,
		lastName: String,
		userName: String,
		role: String,
		picture: String,
		account: [Account.schema],
	},
	{
		timestamps: true,
		toObject: {
			transform: (doc, ret, options) => {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
				return ret;
			},
		},
	}
);


module.exports = mongoose.model("User", userSchema);
