
const { Sequelize,DataTypes } = require("sequelize")

const db=new Sequelize({
    dialect:'mysql',
    database:'socialmedia',
    username:'userhead',
    password:'userheadpassword',
} )
//  db.sync({ force: true });


const COL_ID_DEF={
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
}  
const COL_USERNAME_DEF={
    type: Sequelize.DataTypes.STRING(30),
    unique:true,
    allowNull:false
}
const COL_TITLE_DEF={
    type:Sequelize.DataTypes.STRING(120),
    allowNull:false
}
 
// console.log("DFDFDFD:",COL_USERNAME_DEF);

// const Users=db.define('user',{
//      id:COL_ID_DEF,
//      username: COL_USERNAME_DEF
// })
const Users = db.define('User', {
    // Model attributes are defined here
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    userName:{
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue:"guest"
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false
    },
    email:{
      type: DataTypes.STRING,
      allowNull:false
  
    },
    otp:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    isVerified:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    tokenCreated:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    socketId:{
      type: Sequelize.DataTypes.STRING,
      allowNull: true
    },
    birthday:{
      type: Sequelize.DataTypes.DATE,
      allowNull:true
    },
    bio:{
      type: Sequelize.DataTypes.STRING,
      allowNull:true
    },
    designation:{
      type: Sequelize.DataTypes.STRING,
      allowNull:true
    },
    location:{
      type: Sequelize.DataTypes.STRING,
      allowNull:true
    },
    gender:{
      type: Sequelize.DataTypes.STRING,
      allowNull:true
    },
    ig:{
      type: Sequelize.DataTypes.STRING,
      allowNull:true
    },
    twitter:{
      type: Sequelize.DataTypes.STRING,
      allowNull:true
    },
    linkedIn:{
      type: Sequelize.DataTypes.STRING,
      allowNull:true
    },
    fb:{
      type: Sequelize.DataTypes.STRING,
      allowNull:true
    },



  }, {
    // Other model options go here
  });



  

const Friends =db.define('Friend', {
  id:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  user_id:{
    type: DataTypes.UUID,
    defaultValue: null,
  },
  friendId:{
    type: DataTypes.UUID,
    defaultValue: null,
  },
  status:{
    type: DataTypes.STRING
  }
})
 // id user_id type item_id is_read created_at
const Notifications=db.define('Notification',{
  id:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  user_id:{
    type: DataTypes.UUID,
    allowNull:false,
  },
  type:{
    type: DataTypes.ENUM('like','comment','friend_request'),
    allowNull:false
  },
  item_id:{
    type: DataTypes.UUID,
    allowNull:false,
  },
  is_read:{
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    allowNull:false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  userWhoCreated:{
    type: DataTypes.UUID,
    allowNull:false,
  }

}, {
  // Define the index on the created_at column
  indexes: [{
    name: 'created_at_index',
    fields: ['created_at']
  }]})


const Posts=db.define('post',{
    id:COL_ID_DEF,
    body:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false
    },
    numLikes:{
        type:Sequelize.DataTypes.INTEGER,
        defaultValue:0
    },
    image:{
      type:Sequelize.DataTypes.STRING,
      defaultValue:0
  }
})

// const SocketUsers=db.define('socketUser',{
//    id: COL_ID_DEF,
//    socketId: {
//     allowNull: true,
//     type: Sequelize.DataTypes.STRING
//    },
//    UserId:{
//      allowNull: false,
//      type: Sequelize.DataTypes.STRING
//    }
// })


const Comments=db.define('comment',{
id:COL_ID_DEF,
body:{
    type:Sequelize.DataTypes.TEXT('tiny'),
}
})

const Likes=db.define('like',{
    id:COL_ID_DEF,
    // numLikes:{
    //     type:Sequelize.DataTypes.INTEGER,
    //     defaultValue:0
    // }
})


//CREATING THE RELATIONSHIP
//user realtion with post is one to many
Users.hasMany(Posts);
Posts.belongsTo(Users);   //this will create a foreign key of users in posts table
//similar users relation with comment is one to many
Users.hasMany(Comments);
Comments.belongsTo(Users);  //this will create a foreign key of users in comments table
//posts relation to Comments is one to many
Posts.hasMany(Comments,  { onDelete: 'CASCADE' });
Comments.belongsTo(Posts);
Users.hasMany(Friends);
Friends.belongsTo(Users);

Users.hasMany(Notifications);
Notifications.belongsTo(Users, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', // This will delete notifications if the corresponding user is deleted
});





// TableA.belongsTo(TableB, { onDelete: 'CASCADE' });

// Posts.belongsTo(Comments)

Users.hasMany(Likes)
Likes.belongsTo(Users)

Posts.hasMany(Likes)
Likes.belongsTo(Posts)


// console.log("users:",Users);
// console.log("Comments:",Comments);
// console.log("Posts",Posts);

module.exports={db,Users,Comments,Posts,Likes,Friends, Notifications};






  
  



