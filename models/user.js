const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const bcrypt = require("bcrypt");
const User = sequelize.define("user", {
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty : {
                msg : "ad soyad girmelisiniz."
            },
            isFullname(value){
                if(value.split(" ").length < 2)
                throw new Error("lütfen ad ve soyad bilginizi giriniz.")
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : {
            args : true,
            msg : "email daha önce alınmış."
        },
        validate : {
            notEmpty : {
                msg : "email olmalıdır."
            },
            isEmail : {
                msg : "email formatı olmalıdır"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty : {
                msg : "Parola boş geçilemez."
            },
            len : {
                args : [5-10],
                msg : "max 5-10 karakter"
            }
        }
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetTokenExpiration: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, { timestamps: true});

User.afterValidate(async(user) => {
    user.password = await bcrypt.hash(user.password, 10);
})

module.exports = User;