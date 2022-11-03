import  express  from 'express';
import { graphql } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql'

const app = express();


// schema model create

const schema=buildSchema(`

type User{
    name:String
    age:Int
    city:String
    salary:Int
}

    type Query{
        hello:String
        welmsg(name:String,age:Int):String
        getUser:User
        getUsers:[User]
    }

`)

//resolvers call type-query===>yh query likhi hai ==>isse graphql rootvalue call hogi

const root={
    hello:()=>{

        return "hello world"
    },
    welmsg:(args)=>{

        return `Name is ${args.name} & Age is ${args.age}`
    },
    getUser: () => {
        return {
          name: "markand",
          age: 24,
          city: "indore",
          salary: 25000,
        }
      },
    getUsers: () => {
        return [{
          name: "markand",
          age: 24,
          city: "indore",
          salary: 25000,
        },
        {
        name: "aman",
        age: 24,
        city: "indore",
        salary: 25000,
    }
]      
    },
}

// app.use("/hello",(req,res)=>{

//     res.send("hello world")
// })


//graphql platform open ke ley

app.use("/graphql",graphqlHTTP({

    graphiql:true,
    schema:schema,
    rootValue:root
}))

app.listen(4000)

console.log("server on");