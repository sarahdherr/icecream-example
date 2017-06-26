const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/tipsyscoopclub', { logging: false })

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
    getterMethods: {
      membershipDays: function () {
        let miliseconds = Date.now() - this.date
        let oneDay = 24 * 60 * 60 * 1000
        return Math.round(miliseconds / oneDay)
      }
    },
    // CHALLENGE SOLUTION: instance method returns the average scoops per day for an eater
    instanceMethods: {
      avgScoops: function () {
        return this.scoopTotal / this.membershipDays
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
    }
  })


module.exports = { db, Eater, IceCream } // destructured

Eater.belongsTo(IceCream, { as: 'favorite' })
