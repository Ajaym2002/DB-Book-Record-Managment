const {BookModel, UserModel} = require("../modals");

exports.getAllUsers = async(req, res) => {
    const users = await UserModel.find();
    if(users.length === 0){
        return res.status(404).json({
            success: false,
            message: "No Users Found",
        })
    }
    return res.status(200).json({
        success: true,
        data: users
    })
}

exports.getSingleUserById = async(req, res) => {
    const {id} = req.params;
    const user = await UserModel.findById({_id: id});

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Does Not Exist"
        })
    }
    return res.status.json({
        success: true,
        data: user,
    })
}

exports.createNewUser = async(req, res) =>{
    const {name, surname, email, subscriptionDate, subscriptionType} = req.body;

    const newUser = await UserModel.create(
        {
            name,
            surname,
            email,
            subscriptionDate,
            subscriptionType,
        }
    )
    return res.status(201).json({
        success: true,
        data: newUser,
    })
}

exports.updateUserById = async(req, res) =>{
    const {id} = req.params;
    const {data} = req.body;

    const updatedUserData = await UserModel.findOneAndUpdate({
        _id: id,
    },
    {
        $set:
        {
            ...data,
        }
    },
    {
        new: true
    }
    )
    if(!updatedUserData){
        return res.status(404).json({
            success: false,
            message: "User Does Not Exist"
        })
    }
    return res.status(200).json({
        success: true,
        data: updatedUserData,
    })
}

exports.deleteUser = async(req, res) =>{
    const {id} = req.params;

    const user = await UserModel.deleteOne({_id: id});

    if(!user){
        return res.status(404).json({
        success: false,
        message: "User Does Not Found",
    })
    }
    return res.status(200).json({
        success: true,
        data: deleteUser,
    })
}


exports.getSubscriptionDetailsById = async(req, res)=>{
    const {id} = req.params;

    const user = await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User With The Given Id Does Not Exist"
        })
    }

    const getDateInDays = (data = " ")=>{
        let date;
        if(data == " "){
            date = new date;
        }else{
            date = new date(data);
        }
        const days = Math.floor( data / (1000 * 60 * 60 * 24));
        return days;
    }

    const subscriptionType = (date)=>{
        if(user.subscriptionType === "Basic"){
            date = date + 90;
        }else if(user.subscriptionType === "Standard"){
            date = date + 180;
        }else if(user.subscriptionType === "Premium"){
            date = date + 365;
        }
        return date;
    };

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0,
    }
    res.status(200).json({
        success: true,
        data,
    })
}