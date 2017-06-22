const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/tipsyscoopclub' //, {
 // logging: false // add this after they see how annoying logging is
//}
)

const Eater = db.define('eater', {
  name: {
    type: Sequelize.STRING,
      allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  scoopTotal: {
    type: Sequelize.INTEGER
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
}, {
  instanceMethods: {
    avg_scoops: function () {
      return this.scoop_total / this.membershipDays
    }
  },
  getterMethods: {
    membershipDays: function () {
      let miliseconds = Date.now() - this.date
      let oneDay = 24 * 60 * 60 * 1000
      return Math.round(miliseconds / oneDay)
    }
  }
})

const IceCream = db.define('ice cream', {
  flavor: {
    type: Sequelize.STRING
  },
  calories: {
    type: Sequelize.INTEGER,
    validate: {
      min: 50,
      max: 5000
    }
  },
  alcoholic: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  type: {
    type: Sequelize.ENUM('traditional', 'gelato', 'sorbet')
  }
}, {
  hooks: {
    beforeCreate: function (icecream) {
      if (icecream.alcoholic) {
        icecream.calories += 300
      }
    }
  },
  classMethods: {
    lightFlavors: function (calorieMax) {
      return this.findAll()
        .then(function (icecreams) {
          return icecreams.filter(function (icecream) {
            if (icecream.calories <= calorieMax) {
              return true
            }
            return false
          })
        })
        .catch(function (err) {
          console.error(err)
        })
    }
  }
})

Eater.belongsTo(IceCream, {as: 'favorite'})
// IceCream.hasMany(Eater)

module.exports = { db, Eater, IceCream }
