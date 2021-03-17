module.exports = (sequelize, Sequelize)=>{
    const Student_data = sequelize.define("students_with_excellink",{
        // sno: {
        //     type: Sequelize.INTEGER
        // },
        roll_number:{
            type: Sequelize.STRING
        },
        name:{
            type: Sequelize.STRING
        },
        father_name:{
            type: Sequelize.STRING
        },
        image:{
            type: Sequelize.STRING
        },
        finger_print:{
            type: Sequelize.STRING
        },
        date_stamp:{
            type: Sequelize.STRING
        },
        fileName: {
            type: Sequelize.STRING
        }
    });

    return Student_data;
};

